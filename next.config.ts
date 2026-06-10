import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'framer.com' },
    ],
  },
  experimental: {
    urlImports: ['https://framer.com/', 'https://framerusercontent.com/'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      framer: path.resolve(__dirname, 'src/framer-stub.ts'),
      'framer/motion': path.resolve(__dirname, 'src/framer-stub.ts'),
    };
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        encoding: false,
      };
    }
    return config;
  },
};

export default nextConfig;