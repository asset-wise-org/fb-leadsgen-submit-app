import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://aswinno.assetwise.co.th/CISUAT/api/:path*',
      },
    ];
  },
};

export default nextConfig;
