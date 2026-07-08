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
          <h2>Guides for buyers researching Maravé</h2>
          <p>
            Short, practical articles on the rental program, owner economics, and buying in Manuel
            Antonio. Each post links back to the main guide and calculator.
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
