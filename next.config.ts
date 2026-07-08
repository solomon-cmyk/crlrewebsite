import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.maraveresidences.com", pathname: "/**" },
      { protocol: "https", hostname: "crlre.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
