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
    `- Reserve: ${SITE_URL}/#reserve`,
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
    `- Email: ${CONTACT.emailMarave} · ${CONTACT.emailCrlre}`,
    `- Phone: ${CONTACT.phoneCr} (CR) · ${CONTACT.phoneUs} (US)`,
    "",
    "Pre-construction pricing and availability are subject to change. Listings on crlre.com are updated independently.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
