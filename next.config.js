/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Generates static HTML export
  basePath: process.env.NODE_ENV === 'production' ? '/next-portfolio' : '',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  // For trailing slashes
  trailingSlash: true,
}

module.exports = nextConfig