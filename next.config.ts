import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {}, // silences turbopack/webpack warning

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'framer.com' },
    ],
  },

  experimental: {
    // urlImports is incompatible with --webpack flag, so removed.
    // If you need Framer URL imports, drop --webpack and use turbopack instead.
  },

  webpack: (config, { isServer }) => {
    // Alias framer to your stub — this overrides the installed package
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