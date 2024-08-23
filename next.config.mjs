/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
