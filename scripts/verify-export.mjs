/**
 * Post-build check on the exported static site.
 *
 * `next build` exiting 0 does not mean the exported site works. The failure
 * mode that matters here is a URL that is correct in dev and 404s once
 * deployed under a base path, and the only way to catch that is to inspect
 * what was actually written to out/.
 *
 * Checks performed:
 *   1. The basePath in next.config.mjs and in src/lib/assets.ts agree.
 *   2. Every local asset referenced by index.html exists in out/.
 *   3. No absolute URL points outside the basePath (the classic silent 404).
 *   4. The Open Graph image resolves on disk.
 */
import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');

const failures = [];
const notes = [];

const fail = (msg) => failures.push(msg);

/* ---------------------------------------------------- 1. basePath sync -- */

const configSrc = await readFile(join(root, 'next.config.mjs'), 'utf8');
const assetsSrc = await readFile(join(root, 'src/lib/assets.ts'), 'utf8');

const configBase = configSrc.match(/export const basePath\s*=\s*'([^']+)'/)?.[1];
const assetsBase = assetsSrc.match(/export const BASE_PATH\s*=\s*'([^']+)'/)?.[1];

if (!configBase) fail('next.config.mjs: could not read `export const basePath`');
if (!assetsBase) fail('src/lib/assets.ts: could not read `export const BASE_PATH`');
if (configBase && assetsBase && configBase !== assetsBase) {
  fail(`basePath drift: next.config.mjs has "${configBase}" but src/lib/assets.ts has "${assetsBase}"`);
}

const BASE = configBase ?? '';
notes.push(`basePath = ${BASE || '(none)'}`);

/* ------------------------------------------------- 2/3. URL resolution -- */

const html = await readFile(join(out, 'index.html'), 'utf8');

// Anything that looks like a root-relative URL, plus srcset candidates.
const refs = new Set(
  [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1]),
);
for (const m of html.matchAll(/srcset="([^"]*)"/g)) {
  for (const part of m[1].split(',')) {
    const url = part.trim().split(/\s+/)[0];
    if (url?.startsWith('/')) refs.add(url);
  }
}

for (const ref of [...refs].sort()) {
  // Ignore protocol-relative and absolute URLs; they are not ours to check.
  if (ref.startsWith('//')) continue;

  if (BASE && !ref.startsWith(`${BASE}/`)) {
    fail(`escapes the basePath (would 404 in production): ${ref}`);
    continue;
  }

  // Strip the basePath and the query/hash, then resolve inside out/.
  let rel = BASE ? ref.slice(BASE.length) : ref;
  rel = rel.split('?')[0].split('#')[0];
  if (rel === '' || rel === '/') continue;

  const candidates = [join(out, rel)];
  // Static export writes directory routes as <route>/index.html.
  if (!rel.includes('.')) candidates.push(join(out, rel, 'index.html'));

  let found = false;
  for (const c of candidates) {
    try {
      await access(c, constants.R_OK);
      found = true;
      break;
    } catch {
      /* try the next candidate */
    }
  }
  if (!found) {
    fail(`referenced but not present in out/: ${ref}  (looked for ${relative(root, candidates[0])})`);
  }
}

notes.push(`${refs.size} local URL(s) checked`);

/* --------------------------------------------------- 4. social image -- */

const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
if (!ogMatch) {
  fail('no og:image meta tag found in index.html');
} else {
  const og = ogMatch[1];
  // Social crawlers need an absolute URL, so metadata legitimately carries a
  // full origin here. Reduce it to a path before checking the filesystem.
  let pathname;
  try {
    pathname = new URL(og).pathname;
  } catch {
    fail(`og:image is not a valid absolute URL: ${og}`);
    pathname = null;
  }
  if (pathname) {
    if (BASE && !pathname.startsWith(`${BASE}/`)) {
      fail(`og:image escapes the basePath: ${og}`);
    } else {
      const rel = BASE ? pathname.slice(BASE.length) : pathname;
      try {
        await access(join(out, rel), constants.R_OK);
        notes.push(`og:image resolves -> ${og}`);
      } catch {
        fail(`og:image points at a file that is not in out/: ${og}`);
      }
    }
  }
}

/* ------------------------------------------------------------ report -- */

for (const n of notes) console.log(`  ok  ${n}`);

if (failures.length) {
  console.error(`\nExport verification FAILED (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('\nExport verification passed.');
