import { list, put } from "@vercel/blob";
import { staticBlogPosts, BLOG_BLOB_PREFIX } from "./posts";
import type { BlogPost, BlogSection, SoroPublishPayload } from "./types";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadingTime(sections: BlogSection[]): number {
  const words = sections.reduce(
    (total, section) =>
      total + section.paragraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0),
    0
  );
  return Math.max(3, Math.ceil(words / 220));
}

function htmlToSections(html: string): BlogSection[] {
  const text = html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.length ? [{ paragraphs }] : [{ paragraphs: [html] }];
}

function bodyToSections(payload: SoroPublishPayload): BlogSection[] {
  if (payload.sections?.length) return payload.sections;
  if (payload.html) return htmlToSections(payload.html);
  const body = payload.body ?? payload.content ?? "";
  if (!body) return [{ paragraphs: ["Content pending."] }];

  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return [{ paragraphs }];
}

export function normalizeSoroPayload(payload: SoroPublishPayload): BlogPost {
  const sections = bodyToSections(payload);
  const slug = payload.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

  return {
    slug,
    title: payload.title.trim(),
    description: (payload.description || payload.metaDescription || payload.title).trim(),
    publishedAt: payload.publishedAt ?? new Date().toISOString().slice(0, 10),
    updatedAt: payload.updatedAt,
    author: payload.author ?? "Property Pro Partners",
    category: payload.category ?? "Insights",
    tags: payload.tags ?? ["Maravé", "LXR Residences"],
    readingTimeMinutes: estimateReadingTime(sections),
    sections,
    source: "soro",
  };
}

async function getSoroPosts(): Promise<BlogPost[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];

  try {
    const { blobs } = await list({ prefix: BLOG_BLOB_PREFIX });
    const posts = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url, { next: { revalidate: 300 } });
        if (!response.ok) return null;
        return (await response.json()) as BlogPost;
      })
    );

    return posts.filter((post): post is BlogPost => Boolean(post?.slug));
  } catch {
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const soroPosts = await getSoroPosts();
  const bySlug = new Map<string, BlogPost>();

  for (const post of staticBlogPosts) {
    bySlug.set(post.slug, post);
  }

  for (const post of soroPosts) {
    bySlug.set(post.slug, post);
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function saveSoroBlogPost(post: BlogPost): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(`${BLOG_BLOB_PREFIX}${post.slug}.json`, JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function getStaticBlogSlugs(): string[] {
  return staticBlogPosts.map((post) => post.slug);
}
