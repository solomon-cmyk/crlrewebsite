import { getAllBlogPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/assets";
import { CONTACT } from "@/lib/contact";
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
    `- Home: ${SITE_URL}/`,
    `- Maravé overview: ${SITE_URL}/#marave`,
    `- Collections: ${SITE_URL}/#collections`,
    `- Gallery: ${SITE_URL}/#gallery`,
    `- Reserve: ${SITE_URL}/#reserve`,
    `- Exclusive listings: ${SITE_URL}/listings`,
    `- Featured listing · Mercadito Gastronómico: ${SITE_URL}/listings/mercadito-gastronomico-manuel-antonio`,
    `- Contact: ${SITE_URL}/#contact`,
    `- Blog index: ${SITE_URL}/blog`,
    "",
    "## Blog articles",
    ...posts.map(
      (post) =>
        `- ${post.title}: ${SITE_URL}/blog/${post.slug} (${post.description})`
    ),
    "",
    "## Contact",
    `- ${CONTACT.name} · ${CONTACT.company}`,
    `- Email: ${CONTACT.email}`,
    "",
    "Pre-construction pricing and availability are subject to change. Property listings are updated on this site.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
