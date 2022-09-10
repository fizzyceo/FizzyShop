/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  env: {
    STRIPE_PUBLISHABALE_KEY: process.env.STRIPE_PUBLISHABALE_KEY,
  },
};

module.exports = nextConfig;
