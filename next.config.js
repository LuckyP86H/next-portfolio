const path = require('path');

/**
 * JS version of Next config for runtime compatibility.
 * Static export for GitHub Pages; basePath applied only in production builds.
 */
/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? '/next-portfolio' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Pin the workspace root so a stray parent-directory lockfile doesn't get mis-detected.
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // The repo's flat `eslint.config.ts` is incompatible with the deprecated `next lint`
    // runner (removed in Next 16). Lint runs via the ESLint CLI, not the build.
    ignoreDuringBuilds: true,
  },
};
