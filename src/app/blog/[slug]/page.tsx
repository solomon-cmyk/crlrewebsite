import { BlogPostView } from "@/components/blog/BlogPostView";
import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { SiteNav } from "@/components/broker/SiteNav";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog/queries";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/assets";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: {
      absolute: `${post.title} · Costa Rica Luxury Real Estate`,
    },
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const structuredData = [
    articleJsonLd(post),
    breadcrumbJsonLd(post),
    ...(faqJsonLd(post) ? [faqJsonLd(post)!] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(structuredData)}
      />
      <SiteNav />
      <div className="blog-post-page">
        <div className="wrap">
          <BlogPostView post={post} />
        </div>
        <BrokerFooter />
      </div>
    </>
  );
}
