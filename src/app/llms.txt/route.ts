import { getAllBlogPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export async function GET() {
  const posts = await getAllBlogPosts();

  const lines = [
    `# ${SITE.productName}`,
    "",
    `Site: ${SITE.url}`,
    "",
    "## Primary pages",
    `- Home / rental guide: ${SITE_URL}/`,
    `- Net proceeds calculator: ${SITE_URL}/#calculator`,
    `- FAQ: ${SITE_URL}/#faq`,
    `- Disclosures: ${SITE_URL}/#disclosures`,
    `- Blog index: ${SITE_URL}/blog`,
    "",
    "## Blog articles",
    ...posts.map(
      (post) =>
        `- ${post.title}: ${SITE_URL}/blog/${post.slug} (${post.description})`
    ),
    "",
    "## Contact",
    `- Broker: Property Pro Partners`,
    `- Email: Brandon@propertypropartners.com`,
    `- Phone: (786) 859-2628`,
    "",
    "All rental income figures on this site are illustrative estimates, not guarantees.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
