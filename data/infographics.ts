// Shared infographic data — single source of truth
// Add new infographics here. Individual pages and the hub grid update automatically.

export interface Infographic {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;       // Cloudinary URL (empty string = coming soon)
  alt: string;
  downloadName: string;
  aspectClass: string;
  relatedSlugs?: string[];
}

export const INFOGRAPHICS: Infographic[] = [
  {
    id: 1,
    slug: "seo-audit-checklist",
    title: "SEO Audit Checklist",
    category: "Technical SEO",
    description: "8 essential checkpoints every website needs before launching an SEO campaign.",
    longDescription: "A systematic SEO audit is the foundation of any successful organic growth strategy. This infographic walks you through the 8 most critical audit checkpoints — from crawlability and indexation to schema markup and page speed — giving you a clear starting point for any site. Use it before launching a campaign, after a site migration, or as a monthly maintenance checklist.",
    tags: ["SEO audit", "technical SEO", "crawlability", "indexation", "site audit"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1780486003/smdevs/infographics/seo-audit-checklist.jpg",
    alt: "SEO Audit Checklist infographic showing 8 key checkpoints: crawlability, indexation, page speed, mobile friendliness, HTTPS, XML sitemap, meta tags, and schema markup",
    downloadName: "smdevs-seo-audit-checklist",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: ["core-web-vitals-guide", "keyword-research-process"],
  },
  {
    id: 2,
    slug: "core-web-vitals-guide",
    title: "Core Web Vitals Guide",
    category: "Technical SEO",
    description: "LCP, INP, and CLS explained — with exact Google benchmarks for each metric.",
    longDescription: "Core Web Vitals are Google's user experience metrics that directly influence search rankings. This infographic breaks down all three metrics — Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) — with the exact thresholds you need to hit for a 'Good' score. Essential reference for developers, SEOs, and site owners optimizing page experience.",
    tags: ["Core Web Vitals", "LCP", "INP", "CLS", "page speed", "page experience"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/v1780486004/smdevs/infographics/core-web-vitals-guide.jpg",
    alt: "Core Web Vitals guide infographic showing LCP under 2.5s, INP under 200ms, and CLS under 0.1 with Good, Needs Improvement, and Poor thresholds",
    downloadName: "smdevs-core-web-vitals-guide",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: ["seo-audit-checklist"],
  },
  // ── Coming Soon ───────────────────────────────────────────────────────────
  {
    id: 3,
    slug: "keyword-research-process",
    title: "Keyword Research Process",
    category: "SEO",
    description: "A 5-step repeatable process for finding and prioritizing keywords that drive qualified traffic.",
    longDescription: "Keyword research is the foundation of every content and SEO strategy. This infographic provides a 5-step framework — from defining your topic to mapping keywords to pages — that any SEO, blogger, or content team can follow consistently.",
    tags: ["keyword research", "search intent", "keyword analysis", "SEO strategy"],
    image: "",
    alt: "Keyword research process infographic showing 5 steps from topic definition to keyword prioritization",
    downloadName: "smdevs-keyword-research-process",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: ["seo-audit-checklist"],
  },
  {
    id: 4,
    slug: "on-page-seo-elements",
    title: "On-Page SEO Elements",
    category: "SEO",
    description: "Every on-page SEO element mapped to a visual webpage — title, headings, content, and links.",
    longDescription: "On-page SEO is about optimizing what's visible on your page and in its source code. This visual guide maps every key on-page element to where it appears on a page, making it easy to spot what you're missing.",
    tags: ["on-page SEO", "meta title", "headings", "internal links", "content optimization"],
    image: "",
    alt: "On-page SEO elements infographic",
    downloadName: "smdevs-on-page-seo-elements",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 5,
    slug: "content-marketing-funnel",
    title: "Content Marketing Funnel",
    category: "Content Marketing",
    description: "Map every piece of content to a stage of the buyer's journey — from awareness to conversion.",
    longDescription: "Effective content strategy requires producing different content types for each stage of the buyer journey. This funnel infographic shows what content works at each stage and why.",
    tags: ["content marketing", "marketing funnel", "awareness", "consideration", "conversion"],
    image: "",
    alt: "Content marketing funnel infographic",
    downloadName: "smdevs-content-marketing-funnel",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 6,
    slug: "local-seo-framework",
    title: "Local SEO Framework",
    category: "Local SEO",
    description: "The 6 pillars of local SEO — from Google Business Profile to reviews and local content.",
    longDescription: "Local SEO requires a different strategy than standard organic SEO. This framework outlines the 6 core pillars that drive local rankings and helps businesses dominate their service area.",
    tags: ["local SEO", "Google Business Profile", "NAP", "local citations", "reviews"],
    image: "",
    alt: "Local SEO framework infographic",
    downloadName: "smdevs-local-seo-framework",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 7,
    slug: "backlink-building-strategy",
    title: "Backlink Building Strategy",
    category: "SEO",
    description: "8 proven link acquisition tactics ranked by effort and impact for sustainable growth.",
    longDescription: "Backlinks remain one of Google's strongest ranking signals. This strategy map ranks 8 proven link acquisition methods by effort and impact, helping you choose the right tactics for your resources and goals.",
    tags: ["backlinks", "link building", "guest posting", "digital PR", "HARO", "outreach"],
    image: "",
    alt: "Backlink building strategy infographic",
    downloadName: "smdevs-backlink-building-strategy",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 8,
    slug: "ai-seo-workflow",
    title: "AI SEO Workflow",
    category: "AI SEO",
    description: "How to integrate AI tools into your SEO process without losing quality or expertise signals.",
    longDescription: "AI tools can accelerate every stage of the SEO content workflow — but only when used correctly. This workflow shows exactly where AI helps, where human expertise must remain, and how to produce content that ranks.",
    tags: ["AI SEO", "AI content", "SEO automation", "content workflow"],
    image: "",
    alt: "AI SEO workflow infographic",
    downloadName: "smdevs-ai-seo-workflow",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 9,
    slug: "google-ranking-signals",
    title: "Google Ranking Signals",
    category: "SEO",
    description: "The key signals Google uses to rank pages — content, authority, experience, and trust.",
    longDescription: "Understanding what actually moves rankings in 2026 helps you prioritize your SEO budget correctly. This infographic visualizes the most impactful ranking signals and how they relate to each other.",
    tags: ["ranking factors", "Google algorithm", "E-E-A-T", "authority", "content quality"],
    image: "",
    alt: "Google ranking signals infographic",
    downloadName: "smdevs-google-ranking-signals",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
  {
    id: 10,
    slug: "lead-generation-funnel",
    title: "Lead Generation Funnel",
    category: "Lead Generation",
    description: "Turn organic traffic into qualified leads with this conversion-focused funnel framework.",
    longDescription: "Most websites generate traffic but fail to convert visitors into leads. This infographic maps the complete lead generation funnel — from initial traffic source through conversion — with stage-by-stage optimization tips.",
    tags: ["lead generation", "conversion funnel", "traffic", "lead magnet", "email capture"],
    image: "",
    alt: "Lead generation funnel infographic",
    downloadName: "smdevs-lead-generation-funnel",
    aspectClass: "aspect-[3/4]",
    relatedSlugs: [],
  },
];

export const CATEGORIES = [
  "All", "SEO", "Technical SEO", "Local SEO", "AI SEO",
  "Content Marketing", "Lead Generation",
];

export function getInfographicBySlug(slug: string): Infographic | undefined {
  return INFOGRAPHICS.find((i) => i.slug === slug);
}

export function getRelatedInfographics(current: Infographic): Infographic[] {
  if (!current.relatedSlugs?.length) {
    return INFOGRAPHICS.filter(
      (i) => i.slug !== current.slug && i.image && i.category === current.category
    ).slice(0, 3);
  }
  return current.relatedSlugs
    .map((s) => INFOGRAPHICS.find((i) => i.slug === s))
    .filter((i): i is Infographic => !!i && !!i.image);
}
