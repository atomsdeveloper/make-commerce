import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? ["https://d568-2804-14d-783a-8678-a42f-61e2-594b-2573.ngrok-free.app"]
      : [],
  images: {
    remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }],
  },
};

export default nextConfig;
