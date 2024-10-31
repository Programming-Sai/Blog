/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  basePath: "/Blog", // Set this to your repository name
  assetPrefix: "/Blog/", // Same as basePath, but with a trailing slash
};

module.exports = nextConfig;
