import type { BlogPost } from "@/lib/blog/types";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <p className="blog-card__meta">
        <span>{post.category}</span>
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min read</span>
      </p>
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="blog-card__link">
        Read article
      </Link>
    </article>
  );
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
