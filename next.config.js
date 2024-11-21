/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "scontent.facc6-1.fna.fbcdn.net",
      "media.licdn.com",
    ],
  },
  // output: "export",
  // basePath: "/Blog",
  // assetPrefix: "/Blog/",
};

module.exports = nextConfig;
