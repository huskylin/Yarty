/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['i.ytimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  env: {
    YT_KEY: process.env.YT_KEY,
    API_PATH: process.env.API_PATH,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
