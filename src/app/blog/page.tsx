import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/Footer";
import { getAllBlogPosts } from "@/lib/blog/queries";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "Blog · Maravé LXR Residences & Rental Program Insights",
  },
  description:
    "Owner guides, rental program explainers, and Costa Rica branded residence insights for Maravé LXR buyers.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Maravé LXR Blog",
    description:
      "Practical articles on the Maravé rental program, owner economics, and buying in Manuel Antonio.",
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
      <div className="blog-index">
        <header className="blog-index__hero">
          <div className="wrap">
            <Link href="/" className="blog-index__home">
              Back to rental guide
            </Link>
            <p className="eyebrow">Insights</p>
            <h1>Maravé owner guides & rental program notes</h1>
            <p className="blog-index__intro">
              Practical articles for buyers researching Maravé LXR Residences in Manuel Antonio. Every
              article links back to the main program guide and estimator on {SITE.domain}.
            </p>
          </div>
        </header>
        <div className="wrap blog-index__grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
