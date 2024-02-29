/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
    APP_WEBSITE: process.env.APP_WEBSITE,
  },
};

export default nextConfig;
