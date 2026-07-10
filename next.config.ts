import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "www.maraveresidences.com", pathname: "/**" },
      { protocol: "https", hostname: "crlre.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/listings/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/how-marave-rental-program-split-works",
        destination: "/blog/how-marave-pre-construction-reservations-work",
        permanent: true,
      },
      {
        source: "/blog/voluntary-rental-program-worth-it",
        destination: "/blog/why-early-buyers-are-looking-at-marave",
        permanent: true,
      },
      {
        source: "/blog/marave-owner-carrying-costs-explained",
        destination: "/blog/manuel-antonio-luxury-homes-how-to-compare",
        permanent: true,
      },
      {
        source: "/blog/lxr-residences-personal-use-rules",
        destination: "/blog/what-the-lxr-flag-brings-to-marave-owners",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
