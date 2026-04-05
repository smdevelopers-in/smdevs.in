import { BlogPost } from "@/types/blog";

export const MOCK_BLOGS: BlogPost[] = [
  {
    title: "Mastering On-Page SEO in 2026",
    slug: "mastering-on-page-seo-2026",
    content: `
      <h2>Why On-Page SEO Still Matters</h2>
      <p>In 2026, search engines have become incredibly sophisticated, but the fundamentals of on-page optimization remain the cornerstone of any successful SEO strategy.</p>
      <h3>The Core Pillars</h3>
      <ul>
        <li><strong>Content Quality:</strong> Solve the user's problem immediately.</li>
        <li><strong>Technical Structure:</strong> Proper H1-H3 hierarchy.</li>
        <li><strong>User Experience:</strong> Fast load times and zero cumulative layout shift.</li>
      </ul>
      <blockquote>"SEO is not about gaming the system; it's about being the most helpful result on the internet."</blockquote>
    `,
    excerpt: "Discover the latest strategies for optimizing your webpage structure and content to rank higher in 2026.",
    category: "SEO",
    author: "SM Dev Team",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    createdAt: "2026-03-25T10:00:00Z",
    publishDate: "2026-03-25T10:00:00Z",
    status: "published",
  },
  {
    title: "The Ultimate Guide to Pivot Points",
    slug: "ultimate-guide-pivot-points",
    content: `
      <h2>The Math Behind the Market</h2>
      <p>Pivot points are predictive indicators that help traders identify potential support and resistance levels. Unlike moving averages, which are lagging, pivots are based on previous price action to project future zones.</p>
      <h3>Types of Pivots</h3>
      <ul>
        <li>Standard (Classic)</li>
        <li>Woodie's</li>
        <li>Camarilla</li>
      </ul>
    `,
    excerpt: "Learn how to use pivot points to identify key support and resistance levels for any market.",
    category: "Trading",
    author: "Finance Expert",
    featuredImage: "https://images.unsplash.com/photo-1611974717483-500693a2688f?auto=format&fit=crop&q=80&w=800",
    createdAt: "2026-03-27T14:30:00Z",
    publishDate: "2026-03-27T14:30:00Z",
    status: "published",
  },
  {
    title: "Building Scalable Next.js 16 Applications",
    slug: "scalable-nextjs-16-apps",
    content: `
      <h2>Next.js 16: What's New?</h2>
      <p>Next.js continues to evolve with even better server component performance and refined routing patterns. Building for scale requires a deep understanding of standard conventions.</p>
    `,
    excerpt: "Explore the best practices for architecting large-scale applications with the latest Next.js 16 features.",
    category: "Development",
    author: "Lead Architect",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    createdAt: "2026-03-28T09:00:00Z",
    publishDate: "2026-03-28T09:00:00Z",
    status: "published",
  }
];

export function getBlogs() {
  return MOCK_BLOGS;
}

export function getBlogBySlug(slug: string) {
  return MOCK_BLOGS.find((blog) => blog.slug === slug);
}

export function getCategories() {
  return ["All", "SEO", "Trading", "Development", "General"];
}
