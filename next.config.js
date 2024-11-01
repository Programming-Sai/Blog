// Import the base path from the basePath.js file
const BASE_PATH = require("./basePath");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: "export",
  basePath: BASE_PATH, // Use the imported base path
  assetPrefix: `${BASE_PATH}/`,
};

export default nextConfig;
