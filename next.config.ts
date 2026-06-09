import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Allow images and scripts from Framer domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'framer.com' },
    ],
  },
  experimental: {
    // This is required for the URL imports to be processed
    urlImports: ['https://framer.com/', 'https://framerusercontent.com/'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      framer: path.resolve(__dirname, 'src/framer-stub.ts'),
    };
    
    // Ensure we handle external URLs correctly in Webpack
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