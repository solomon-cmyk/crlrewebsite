import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/assets";

const LEGAL_PATHS = ["/", "/privacy", "/terms", "/cookie-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-07");

  return LEGAL_PATHS.map((path, index) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: index === 0 ? 1 : 0.5,
  }));
}
