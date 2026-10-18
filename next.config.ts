import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "https://app.indexla.tech",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "https://app.indexla.tech",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/og.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
