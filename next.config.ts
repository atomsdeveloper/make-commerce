import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? ["https://4d37-2804-14c-213-468f-ed90-226e-a637-8615.ngrok-free.app"]
      : [],
  images: {
    remotePatterns: [{ hostname: "i.postimg.cc" }],
  },
};

export default nextConfig;
