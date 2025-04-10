/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/next-portfolio' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;