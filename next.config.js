const path = require('path');

/**
 * Where the site is served from:
 *  - GitHub Pages serves it under /next-portfolio, so production builds use that prefix.
 *  - Cloudflare Workers Builds (which sets WORKERS_CI=1) serves it from the root, so no prefix.
 *  - NEXT_PUBLIC_BASE_PATH overrides both (set it to an empty string for a root deploy).
 * The value is exposed to client code as NEXT_PUBLIC_BASE_PATH; see src/content/site.ts.
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.WORKERS_CI === '1' || process.env.NODE_ENV !== 'production' ? '' : '/next-portfolio');

/** Static export, hosted on GitHub Pages and Cloudflare Workers (static assets). */
/** @type {import('next').NextConfig} */
module.exports = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Pin the workspace root so a stray parent-directory lockfile doesn't get mis-detected.
  outputFileTracingRoot: path.join(__dirname),
};
