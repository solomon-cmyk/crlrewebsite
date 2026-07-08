import { BlogCard } from "@/components/blog/BlogCard";
import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { SiteNav } from "@/components/broker/SiteNav";
import { getAllBlogPosts } from "@/lib/blog/queries";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "Blog · Maravé LXR Residences & Costa Rica Luxury Real Estate",
  },
  description:
    "Owner guides, Manuel Antonio market insights, and Maravé LXR branded residence articles from Costa Rica Luxury Real Estate.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "CRLRE Blog",
    description:
      "Practical articles on Maravé LXR Residences, Costa Rica luxury real estate, and buying in Manuel Antonio.",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([organizationJsonLd(), websiteJsonLd()])}
      />
      <SiteNav />
      <div className="blog-index">
        <header className="blog-index__hero">
          <div className="wrap">
            <Link href="/" className="blog-index__home">
              Back to home
            </Link>
            <p className="eyebrow">Insights</p>
            <h1>Maravé guides and Costa Rica luxury real estate notes</h1>
            <p className="blog-index__intro">
              Practical articles for buyers exploring Maravé LXR Residences and exclusive Pacific
              coast listings. Every article links back to reservations and contact on {SITE.domain}.
            </p>
          </div>
        </header>
        <div className="wrap blog-index__grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <BrokerFooter />
      </div>
    </>
  );
}
