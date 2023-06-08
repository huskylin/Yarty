/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  env: {
    YT_KEY: process.env.YT_KEY,
    API_PATH: process.env.API_PATH,
  },
};

module.exports = nextConfig;
