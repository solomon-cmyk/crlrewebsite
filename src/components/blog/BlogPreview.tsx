import { BlogCard } from "@/components/blog/BlogCard";
import { staticBlogPosts } from "@/lib/blog/posts";
import Link from "next/link";

export function BlogPreview() {
  const featured = staticBlogPosts.slice(0, 3);

  return (
    <section className="blog-preview" id="insights">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Owner Insights</div>
          <h2>Guides for buyers exploring Maravé and CRLRE listings</h2>
          <p>
            Short, practical articles on branded residences, Manuel Antonio, and luxury buying on
            Costa Rica&apos;s Pacific coast. Each post links back to reservations and contact on
            the main site.
          </p>
        </div>
        <div className="blog-preview__grid">
          {featured.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="blog-preview__footer">
          <Link href="/blog" className="blog-preview__all">
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
