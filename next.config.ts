import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 88, 90],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "gsap"],
  },
};

export default config;
