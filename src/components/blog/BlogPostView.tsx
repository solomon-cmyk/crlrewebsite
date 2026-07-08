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
        <p className="eyebrow">Maravé Rental Program Guide</p>
        <h2>Model the numbers on your terms</h2>
        <p>
          Use the net proceeds estimator and owner FAQ on the main guide. Every figure is an
          illustration, not a guarantee.
        </p>
        <div className="blog-post__cta-links">
          <Link href="/#calculator" className="blog-post__btn">
            Open calculator
          </Link>
          <Link href="/" className="blog-post__btn blog-post__btn--ghost">
            Full program guide
          </Link>
        </div>
      </aside>
    </article>
  );
}
