export type BlogCategory = "SEO" | "Trading" | "Development" | "General";

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tldr?: string;
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  category: BlogCategory;
  author: string;
  featuredImage: string;
  createdAt: string;
  publishDate: string;
  status: "published" | "draft" | "scheduled";
}
