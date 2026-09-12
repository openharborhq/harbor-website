import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Let other machines on the LAN load dev assets (Next blocks cross-origin dev resources by default).
  allowedDevOrigins: ["192.168.2.*", "*.local"],
  // In dev, serve the pre-sized 2x mocks as-is instead of pushing each one through the optimizer
  // on first request per width; production keeps optimization.
  images: { unoptimized: dev },
};

export default nextConfig;
