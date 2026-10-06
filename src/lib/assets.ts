/**
 * Base-path-safe access to files in /public.
 *
 * This site is exported with `output: 'export'` and deployed to GitHub Pages
 * under a sub-path, so every public asset has to be requested as
 * `/CatKod/...`. A literal "/Picture/foo.png" in a component works in `next
 * dev` and 404s in production, which is exactly the kind of bug that only
 * shows up after deploying.
 *
 * `next/image` does not help here: with `images.unoptimized` set (required
 * for static export) it emits the src verbatim, without the basePath. So the
 * prefix is applied once, here, and every call site stays honest.
 */

/**
 * Kept in sync with `basePath` in next.config.mjs.
 *
 * It is written out rather than imported because that config file is `.mjs`
 * and TypeScript cannot import it without a hand-written declaration. Two
 * places is a small enough duplication to be safe, and `verify-deploy` in
 * package.json fails the build if the two ever disagree.
 */
export const BASE_PATH = '/CatKod';

/** Every asset this site serves from /public. */
export type PublicPath = `/Picture/${string}`;

/**
 * Resolve a /public asset to a URL that is correct under the deploy sub-path.
 *
 * Applies to <img src> in rendered output and to nothing else. Do NOT use it
 * for `openGraph`/`twitter` metadata: Next already prefixes those and
 * resolves them against metadataBase, so prefixing by hand produces a doubled
 * path like /CatKod/CatKod/og-image.png.
 */
export function asset(path: PublicPath): string {
  return `${BASE_PATH}${path}`;
}
