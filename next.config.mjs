/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

/**
 * The site is served from a sub-path on GitHub Pages (the repository is
 * `CatKod`). This is the single source of truth for that prefix: next.config
 * reads it, and `src/lib/assets.ts` declares the same value so that
 * hand-written /public asset URLs are prefixed the same way Next prefixes its
 * own. `scripts/verify-export.mjs` fails the build if the two ever drift.
 */
export const basePath = '/CatKod';

const nextConfig = {
  // GitHub Pages only serves static files — no Node runtime, no image server.
  output: 'export',

  basePath,
  assetPrefix: basePath,

  // There is no image optimisation server behind a static host. Note that this
  // also means next/image emits `src` verbatim, without the basePath — which
  // is why public assets go through src/lib/assets.ts instead.
  images: { unoptimized: true },

  // Static hosts resolve directories, not extensionless routes.
  trailingSlash: true,

  // Pin the trace root to the repo root so file tracing works in CI.
  outputFileTracingRoot: rootDir,
};

export default nextConfig;
