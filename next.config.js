const path = require('path');

/**
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
};
