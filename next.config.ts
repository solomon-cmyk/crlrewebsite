import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.maraveresidences.com", pathname: "/**" },
      { protocol: "https", hostname: "crlre.com", pathname: "/**" },
    ],
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
