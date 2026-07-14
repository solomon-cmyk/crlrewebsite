import type { BlogPost, BlogSection } from "./types";

export type ParsedRssItem = {
  title: string;
  link: string;
  guid: string;
  description: string;
  contentHtml: string;
  publishedAt: string;
  author?: string;
  categories: string[];
  imageUrl?: string;
};

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function tagContent(block: string, tag: string): string {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i")
  );
  if (cdata?.[1] != null) return cdata[1].trim();

  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain?.[1] ? decodeEntities(plain[1]) : "";
}

function attr(block: string, tag: string, name: string): string | undefined {
  const match = block.match(new RegExp(`<${tag}[^>]*\\s${name}=["']([^"']+)["'][^>]*/?>`, "i"));
  return match?.[1] ? decodeEntities(match[1]) : undefined;
}

function slugFromUrlOrTitle(link: string, title: string, guid: string): string {
  try {
    const pathname = new URL(link).pathname.replace(/\/+$/, "");
    const last = pathname.split("/").filter(Boolean).pop();
    if (last && last !== "blog" && last !== "posts") {
      return last.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    }
  } catch {
    // ignore bad URLs
  }

  const fromGuid = guid
    .split(/[/#]/)
    .filter(Boolean)
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-");
  if (fromGuid && /[a-z0-9]/.test(fromGuid)) return fromGuid;

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function htmlToSections(html: string): BlogSection[] {
  const text = html
    .replace(/<\/(h[1-6]|p|div|li|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paragraphs.length ? [{ paragraphs }] : [{ paragraphs: ["Content pending."] }];
}

function toIsoDate(value: string): string {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function extractImage(itemXml: string, contentHtml: string): string | undefined {
  const media =
    attr(itemXml, "media:content", "url") ||
    attr(itemXml, "media:thumbnail", "url") ||
    attr(itemXml, "enclosure", "url");
  if (media && /\.(jpe?g|png|webp|gif)(\?|$)/i.test(media)) return media;

  const fromHtml = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  return fromHtml ? decodeEntities(fromHtml) : undefined;
}

export function parseRssFeed(xml: string): ParsedRssItem[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];

  if (items.length) {
    return items
      .map((item) => {
        const title = tagContent(item, "title");
        const link =
          item.match(/<link>([^<]+)<\/link>/i)?.[1]?.trim() ||
          attr(item, "link", "href") ||
          "";
        const guid = tagContent(item, "guid") || link || title;
        const description = tagContent(item, "description");
        const contentHtml =
          tagContent(item, "content:encoded") ||
          tagContent(item, "content") ||
          description;
        const publishedAt = toIsoDate(
          tagContent(item, "pubDate") || tagContent(item, "dc:date") || tagContent(item, "published")
        );
        const author =
          tagContent(item, "dc:creator") ||
          tagContent(item, "author") ||
          tagContent(item, "creator") ||
          undefined;
        const categories = Array.from(item.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/gi)).map(
          (m) => decodeEntities(m[1]).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim()
        ).filter(Boolean);

        if (!title) return null;

        return {
          title,
          link,
          guid,
          description: description.replace(/<[^>]+>/g, "").slice(0, 320) || title,
          contentHtml,
          publishedAt,
          author,
          categories,
          imageUrl: extractImage(item, contentHtml),
        } satisfies ParsedRssItem;
      })
      .filter((item): item is ParsedRssItem => Boolean(item));
  }

  return entries
    .map((entry) => {
      const title = tagContent(entry, "title");
      const link = attr(entry, "link", "href") || tagContent(entry, "link");
      const guid = tagContent(entry, "id") || link || title;
      const contentHtml = tagContent(entry, "content") || tagContent(entry, "summary");
      const description = tagContent(entry, "summary") || contentHtml.replace(/<[^>]+>/g, "").slice(0, 320);
      const publishedAt = toIsoDate(tagContent(entry, "published") || tagContent(entry, "updated"));
      if (!title) return null;
      return {
        title,
        link,
        guid,
        description: description.replace(/<[^>]+>/g, "").slice(0, 320) || title,
        contentHtml,
        publishedAt,
        categories: [],
        imageUrl: extractImage(entry, contentHtml),
      } satisfies ParsedRssItem;
    })
    .filter((item): item is ParsedRssItem => Boolean(item));
}

export function rssItemToBlogPost(item: ParsedRssItem): BlogPost {
  const sections = htmlToSections(item.contentHtml || item.description);
  const words = sections.reduce(
    (total, section) => total + section.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
    0
  );

  return {
    slug: slugFromUrlOrTitle(item.link, item.title, item.guid),
    title: item.title,
    description: item.description || item.title,
    publishedAt: item.publishedAt,
    author: item.author || "Costa Rica Luxury Real Estate",
    category: item.categories[0] || "Insights",
    tags: item.categories.length ? item.categories.slice(0, 8) : ["Maravé", "LXR Residences"],
    readingTimeMinutes: Math.max(3, Math.ceil(words / 220)),
    sections,
    coverImage: item.imageUrl,
    html: item.contentHtml || undefined,
    source: "soro",
  };
}
