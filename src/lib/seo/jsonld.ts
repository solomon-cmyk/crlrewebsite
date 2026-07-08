import { SITE_URL } from "@/lib/assets";
import { CONTACT } from "@/lib/contact";
import { SITE } from "@/lib/site";
import type { BlogPost } from "@/lib/blog/types";

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.publisher,
      url: CONTACT.websiteHref,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogPostUrl(post.slug),
    },
    keywords: post.tags.join(", "),
  };
}

export function faqJsonLd(post: BlogPost) {
  if (!post.faq?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: blogPostUrl(post.slug),
      },
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.publisher,
    url: SITE_URL,
    telephone: [CONTACT.phoneCr, CONTACT.phoneUs],
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manuel Antonio",
      addressRegion: "Puntarenas",
      addressCountry: "CR",
    },
    areaServed: ["Manuel Antonio, Costa Rica", "Quepos, Costa Rica", "United States"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.productName,
    url: SITE_URL,
    description:
      "Costa Rica Luxury Real Estate is the developer and exclusive representative of Maravé LXR-branded residences in Manuel Antonio, plus exclusive Pacific coast listings.",
    publisher: {
      "@type": "Organization",
      name: SITE.publisher,
    },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data),
  };
}
