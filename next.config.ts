import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_SOCKET_PATH: process.env.NEXT_PUBLIC_SOCKET_PATH,
    MONGODB_URI: process.env.MONGODB_URI,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    MONGO_URI: process.env.MONGO_URI,
  },
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
