export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  sections: BlogSection[];
  faq?: BlogFaq[];
  source?: "static" | "soro";
};

export type SoroPublishPayload = {
  title: string;
  slug: string;
  description: string;
  body?: string;
  content?: string;
  html?: string;
  sections?: BlogSection[];
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  metaDescription?: string;
  secret?: string;
};
