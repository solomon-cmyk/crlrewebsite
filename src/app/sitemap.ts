import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/assets";

const STATIC_PATHS = ["/", "/blog", "/privacy", "/terms", "/cookie-policy"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const lastModified = new Date("2026-07-07");

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : path === "/blog" ? 0.9 : 0.5,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
