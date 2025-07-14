import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? ["https://39c3397c212d.ngrok-free.app"]
      : ["route-production.vercel.app"],
  images: {
    remotePatterns: [{ hostname: "i.postimg.cc" }],
  },
};

export default nextConfig;
