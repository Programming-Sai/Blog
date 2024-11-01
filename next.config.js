// Import the base path from the basePath.js file
import BASE_PATH from "./basePath"; // Adjust the path if necessary

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: "export",
  basePath: BASE_PATH, // Use the imported base path
  // assetPrefix: `${BASE_PATH}/`,
};

export default nextConfig;
