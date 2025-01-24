import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.assetwise.co.th/cis/api/:path*',
      },
    ];
  },
};

export default nextConfig;
