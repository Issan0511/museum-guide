import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'kmtc.jp',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
    // ローカル画像は最適化、Supabase画像は無効化
    unoptimized: false,
  },
};

export default nextConfig;
