/**
 * JS version of Next config for runtime compatibility.
 */
module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? '/next-portfolio' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
