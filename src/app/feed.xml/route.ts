import { getAllBlogPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const revalidate = 300;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sectionsToHtml(post: Awaited<ReturnType<typeof getAllBlogPosts>>[number]): string {
  if (post.html) return post.html;

  return post.sections
    .map((section) => {
      const heading = section.heading ? `<h2>${escapeXml(section.heading)}</h2>` : "";
      const paragraphs = section.paragraphs.map((p) => `<p>${escapeXml(p)}</p>`).join("");
      return `${heading}${paragraphs}`;
    })
    .join("");
}

export async function GET() {
  const posts = await getAllBlogPosts();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const html = sectionsToHtml(post);
      const image = post.coverImage
        ? `
  <media:content url="${escapeXml(post.coverImage)}" medium="image" />
  <enclosure url="${escapeXml(post.coverImage)}" type="image/jpeg" />`
        : "";
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  <dc:creator>${escapeXml(post.author)}</dc:creator>
  <description><![CDATA[${post.description}]]></description>
  <content:encoded><![CDATA[${html}]]></content:encoded>
  ${categories}${image}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE.productName)} Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml("Maravé LXR Residences and Costa Rica luxury real estate insights from CRLRE.")}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
