import { formatBlogDate } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog/types";
import Link from "next/link";

export function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <article className="blog-post">
      <header className="blog-post__header">
        <Link href="/blog" className="blog-post__back">
          Back to blog
        </Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="blog-post__meta">
          {formatBlogDate(post.publishedAt)} · {post.readingTimeMinutes} min read · {post.author}
        </p>
        <p className="blog-post__dek">{post.description}</p>
        {post.coverImage ? (
          <img
            className="blog-post__cover"
            src={post.coverImage}
            alt=""
            loading="eager"
          />
        ) : null}
      </header>

      <div className="blog-post__body">
        {post.sections.map((section) => (
          <section key={(section.heading ?? section.paragraphs[0]).slice(0, 48)}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      {post.faq && post.faq.length > 0 && (
        <div className="blog-post__faq">
          <h2>Quick answers</h2>
          {post.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      )}

      <aside className="blog-post__cta">
        <p className="eyebrow">Maravé · Manuel Antonio</p>
        <h2>Ready to explore ownership?</h2>
        <p>
          Request the full Maravé package, pricing, and floor plans, or start your $10,000
          reservation on the main site.
        </p>
        <div className="blog-post__cta-links">
          <Link href="/#reserve" className="blog-post__btn">
            Start reservation
          </Link>
          <Link href="/#contact" className="blog-post__btn blog-post__btn--ghost">
            Contact Mark
          </Link>
        </div>
      </aside>
    </article>
  );
}
