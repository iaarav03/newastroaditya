import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off", // Disable globally
    
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Matches any domain
      },
    ],
  },
  // You can add other Next.js configuration options here as needed
};

export default nextConfig;
