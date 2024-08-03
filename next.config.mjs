/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "source.unsplash.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    logging: { level: "verbose" },
  },
};

export default config;
