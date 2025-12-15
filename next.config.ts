import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? ["https://fc0a9cbfde9e.ngrok-free.app"]
      : ["route-production.vercel.app"],
  images: {
    remotePatterns: [{ hostname: "i.postimg.cc" }],
  },
};

export default nextConfig;
