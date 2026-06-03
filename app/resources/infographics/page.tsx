"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search, Download, Share2, X, ChevronLeft, ChevronRight,
  Copy, Check, ExternalLink, ImageIcon, Filter, Layers,
  ZoomIn, BookOpen, TrendingUp, Globe, Cpu, PenTool,
  ShoppingBag, BarChart2, Users, Megaphone
} from "lucide-react";
import Link from "next/link";

// ─── DATA ───────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All", "SEO", "Technical SEO", "Local SEO", "AI SEO",
  "Content Marketing", "Digital Marketing", "Lead Generation",
  "Business Growth", "Website Development"
];

const CATEGORY_ICONS: Record<string, any> = {
  "SEO": TrendingUp,
  "Technical SEO": Layers,
  "Local SEO": Globe,
  "AI SEO": Cpu,
  "Content Marketing": PenTool,
  "Digital Marketing": Megaphone,
  "Lead Generation": Users,
  "Business Growth": BarChart2,
  "Website Development": BookOpen,
  "E-Commerce": ShoppingBag,
};

export interface Infographic {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  downloadName: string;
  aspectClass: string; // for masonry variety
}

const INFOGRAPHICS: Infographic[] = [
  {
    id: 1,
    title: "Complete SEO Process Flowchart",
    category: "SEO",
    description: "A step-by-step visual guide showing the complete SEO workflow from keyword research through monitoring and reporting.",
    tags: ["SEO workflow", "ranking process", "SEO checklist", "SEO strategy"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/seo_process_flowchart.jpg",
    alt: "Complete SEO Process Flowchart showing keyword research, on-page optimization, technical SEO, link building, and monitoring workflow",
    downloadName: "smdevs-seo-process-flowchart",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Technical SEO Audit Checklist",
    category: "Technical SEO",
    description: "A comprehensive checklist covering crawlability, indexing, speed, mobile, HTTPS, structured data, and Core Web Vitals.",
    tags: ["crawlability", "indexing", "technical SEO", "site audit", "Core Web Vitals"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/technical_seo_audit.jpg",
    alt: "Technical SEO audit checklist infographic covering crawlability, indexation, page speed, Core Web Vitals, and structured data",
    downloadName: "smdevs-technical-seo-audit-checklist",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 3,
    title: "Google Ranking Factors Explained",
    category: "SEO",
    description: "Visualize exactly what matters most to Google — from content quality and backlinks to page experience and E-E-A-T.",
    tags: ["ranking factors", "authority", "content quality", "E-E-A-T", "backlinks"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/google_ranking_factors.jpg",
    alt: "Google ranking factors infographic showing content quality, E-E-A-T, backlinks, technical SEO, and user signals by importance",
    downloadName: "smdevs-google-ranking-factors",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "On-Page SEO Checklist",
    category: "SEO",
    description: "Every on-page SEO element you need to optimize before hitting publish — from title tags to internal links.",
    tags: ["meta title", "headings", "internal links", "on-page SEO", "content optimization"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/onpage_seo_checklist.jpg",
    alt: "On-page SEO checklist infographic covering title tags, meta descriptions, headings, image alt text, internal links, and schema markup",
    downloadName: "smdevs-onpage-seo-checklist",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 5,
    title: "Content Marketing Funnel",
    category: "Content Marketing",
    description: "Map your content strategy to every stage of the buyer journey — from awareness through conversion.",
    tags: ["awareness", "consideration", "conversion", "content strategy", "buyer journey"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/content_marketing_funnel.jpg",
    alt: "Content marketing funnel infographic showing top, middle, and bottom of funnel content types and strategies",
    downloadName: "smdevs-content-marketing-funnel",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 6,
    title: "AI SEO Workflow 2026",
    category: "AI SEO",
    description: "How to integrate AI tools into your SEO process without sacrificing quality, expertise, or Google compliance.",
    tags: ["AI content", "automation", "SEO process", "AI workflow", "content AI"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/ai_seo_workflow.jpg",
    alt: "AI SEO workflow 2026 infographic showing AI keyword research, content creation, optimization, and performance analysis process",
    downloadName: "smdevs-ai-seo-workflow-2026",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 7,
    title: "Core Web Vitals Explained",
    category: "Technical SEO",
    description: "LCP, INP, and CLS explained visually — with benchmarks, thresholds, and what each metric actually means for rankings.",
    tags: ["Core Web Vitals", "PageSpeed", "LCP", "INP", "CLS", "page experience"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/core_web_vitals.jpg",
    alt: "Core Web Vitals infographic explaining LCP, INP, and CLS metrics with good, needs improvement, and poor thresholds",
    downloadName: "smdevs-core-web-vitals-explained",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 8,
    title: "Local SEO Optimization Framework",
    category: "Local SEO",
    description: "The complete local SEO framework: Google Business Profile, citations, reviews, local content, and schema markup.",
    tags: ["Google Business Profile", "local rankings", "local SEO", "NAP", "citations"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/local_seo_framework.jpg",
    alt: "Local SEO optimization framework infographic covering Google Business Profile, NAP consistency, citations, reviews, and local content",
    downloadName: "smdevs-local-seo-framework",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 9,
    title: "Backlink Building Blueprint",
    category: "SEO",
    description: "Eight proven link acquisition strategies ranked by effort and impact — a tactical map for sustainable link building.",
    tags: ["backlinks", "link building", "guest posting", "digital PR", "outreach"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/backlink_blueprint.jpg",
    alt: "Backlink building blueprint infographic showing guest posting, broken link building, HARO, digital PR, and outreach strategies with difficulty ratings",
    downloadName: "smdevs-backlink-building-blueprint",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 10,
    title: "Lead Generation Funnel",
    category: "Lead Generation",
    description: "Turn organic traffic into qualified leads with this step-by-step lead generation funnel framework and conversion benchmarks.",
    tags: ["traffic", "leads", "conversion", "lead magnet", "email capture", "sales funnel"],
    image: "https://res.cloudinary.com/dkfj0zehx/image/upload/smdevs/infographics/lead_gen_funnel.jpg",
    alt: "Lead generation funnel infographic showing traffic sources, landing page, lead magnet, email capture, nurture sequence, and conversion stages",
    downloadName: "smdevs-lead-generation-funnel",
    aspectClass: "aspect-[3/4]",
  },
  // ── Coming Soon Placeholders ──────────────────────────────────────────────
  {
    id: 11,
    title: "Keyword Research Framework",
    category: "SEO",
    description: "A systematic approach to finding, validating, and prioritizing keywords that drive qualified organic traffic.",
    tags: ["keyword research", "search volume", "keyword intent", "competition analysis"],
    image: "",
    alt: "Keyword research framework infographic",
    downloadName: "smdevs-keyword-research-framework",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 12,
    title: "E-Commerce SEO Checklist",
    category: "SEO",
    description: "The complete SEO checklist for online stores — product pages, category pages, site structure, and schema.",
    tags: ["e-commerce SEO", "product SEO", "category pages", "shopping schema"],
    image: "",
    alt: "E-commerce SEO checklist infographic",
    downloadName: "smdevs-ecommerce-seo-checklist",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 13,
    title: "Schema Markup Guide",
    category: "Technical SEO",
    description: "Which schema types matter most, where to implement them, and how structured data drives rich results.",
    tags: ["schema markup", "structured data", "JSON-LD", "rich results"],
    image: "",
    alt: "Schema markup guide infographic",
    downloadName: "smdevs-schema-markup-guide",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 14,
    title: "Digital Marketing Ecosystem",
    category: "Digital Marketing",
    description: "How SEO, PPC, social media, email, and content marketing work together as one integrated growth system.",
    tags: ["digital marketing", "marketing channels", "integrated strategy", "growth"],
    image: "",
    alt: "Digital marketing ecosystem infographic",
    downloadName: "smdevs-digital-marketing-ecosystem",
    aspectClass: "aspect-[3/4]",
  },
];

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────
function InfographicCard({
  item,
  index,
  onClick,
}: {
  item: Infographic;
  index: number;
  onClick: (index: number) => void;
}) {
  const isComingSoon = !item.image;
  const CatIcon = CATEGORY_ICONS[item.category] || TrendingUp;

  return (
    <div
      className="group relative bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-500/30"
      onClick={() => !isComingSoon && onClick(index)}
    >
      {/* Image */}
      <div className={`relative ${item.aspectClass} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
        {isComingSoon ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">Coming Soon</span>
          </div>
        ) : (
          <>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center text-white">
                <ZoomIn className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center text-white">
                <Download className="w-5 h-5" />
              </div>
            </div>
          </>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 backdrop-blur border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
            <CatIcon className="w-3 h-3" />
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-black text-slate-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
          {item.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        {/* View button */}
        {!isComingSoon && (
          <button className="w-full mt-2 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2">
            <ZoomIn className="w-3.5 h-3.5" />
            View Full Size
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: Infographic[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[activeIndex];
  const [copied, setCopied] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.downloadName}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(item.image, "_blank");
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row gap-0 bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Image Panel */}
        <div className="relative flex-1 flex items-center justify-center bg-slate-900 min-h-[300px] lg:min-h-0 overflow-hidden cursor-zoom-in" onClick={() => setImgZoomed(!imgZoomed)}>
          <img
            src={item.image}
            alt={item.alt}
            className={`max-h-[80vh] object-contain transition-transform duration-500 ${imgZoomed ? "scale-150" : "scale-100"}`}
          />
          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-blue-600 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full text-white text-xs font-bold">
            {activeIndex + 1} / {items.length}
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-80 flex flex-col bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">{item.category}</span>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="space-y-3">
              <h2 className="text-xl font-black text-white leading-tight">{item.title}</h2>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-blue-900/30 border border-blue-800/50 rounded-full text-[10px] font-bold text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</p>
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Download PNG
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Share */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Share</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "LinkedIn", color: "bg-[#0077B5]", href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
                  { name: "Twitter/X", color: "bg-slate-800", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}` },
                  { name: "Facebook", color: "bg-[#1877F2]", href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.color} text-white rounded-xl py-2 text-[10px] font-black text-center flex items-center justify-center gap-1 transition-opacity hover:opacity-80`}
                  >
                    <ExternalLink className="w-3 h-3" /> {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function InfographicsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const publishedItems = INFOGRAPHICS.filter((i) => i.image);
  const comingSoonItems = INFOGRAPHICS.filter((i) => !i.image);

  const filtered = INFOGRAPHICS.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q);
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCat && item.image;
  });

  const lightboxItems = filtered.length > 0 ? filtered : publishedItems;

  const openLightbox = (indexInFiltered: number) => setLightboxIndex(indexInFiltered);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + lightboxItems.length) % lightboxItems.length : 0));
  const nextLightbox = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % lightboxItems.length : 0));

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "SEO & Digital Marketing Infographics Hub | SM Developers",
            "description": "Free downloadable SEO infographics, digital marketing flowcharts, and visual guides for SEO professionals, marketers, and business owners.",
            "url": "https://smdevs.in/resources/infographics",
            "publisher": { "@type": "Organization", "name": "SM Developers", "url": "https://smdevs.in" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smdevs.in" },
                { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://smdevs.in/resources/blogs" },
                { "@type": "ListItem", "position": 3, "name": "Infographics", "item": "https://smdevs.in/resources/infographics" },
              ]
            },
            "hasPart": INFOGRAPHICS.filter(i => i.image).map(i => ({
              "@type": "ImageObject",
              "name": i.title,
              "description": i.description,
              "contentUrl": i.image,
              "keywords": i.tags.join(", "),
              "author": { "@type": "Organization", "name": "SM Developers" },
            }))
          })
        }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

        {/* ── Hero Banner ── */}
        <section className="bg-slate-950 dark:bg-[#040B16] text-white pt-32 pb-20 border-b border-slate-800 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 mb-8">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources/blogs" className="hover:text-blue-400 transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">Infographics</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Free SEO Infographics Hub
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
                  Visual SEO{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Intelligence
                  </span>
                </h1>
                <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                  Free, downloadable infographics covering SEO, digital marketing, trading, and web development. Share, embed, and use them in your own content.
                </p>
                <div className="flex flex-wrap gap-6 pt-2">
                  {[
                    { n: `${publishedItems.length}+`, l: "Free Downloads" },
                    { n: "10+", l: "Categories" },
                    { n: "Always", l: "Free to Use" },
                  ].map((s) => (
                    <div key={s.l} className="flex items-center gap-3">
                      <span className="text-3xl font-black text-blue-400">{s.n}</span>
                      <span className="text-sm text-slate-400 font-medium">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full lg:w-96 space-y-4">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search infographics..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-14 pr-5 py-5 bg-slate-900 border border-slate-800 focus:border-blue-600/50 focus:ring-4 focus:ring-blue-600/10 rounded-2xl text-white font-bold text-sm placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 text-sm font-bold flex items-center justify-center gap-2 transition-all lg:hidden"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16">

          {/* ── Category Filter Pills ── */}
          <div className={`${showFilters || "lg:flex"} ${showFilters ? "flex" : "hidden"} flex-wrap gap-3`}>
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || TrendingUp;
              const count = cat === "All"
                ? publishedItems.length
                : publishedItems.filter((i) => i.category === cat).length;
              if (count === 0 && cat !== "All") return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:text-blue-600"
                  }`}
                >
                  {cat !== "All" && <Icon className="w-3.5 h-3.5" />}
                  {cat}
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Results Summary ── */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Showing <span className="text-slate-900 dark:text-white">{filtered.length}</span> infographics
              {activeCategory !== "All" && <> in <span className="text-blue-600">{activeCategory}</span></>}
              {search && <> matching "<span className="text-blue-600">{search}</span>"</>}
            </p>
            {(activeCategory !== "All" || search) && (
              <button
                onClick={() => { setActiveCategory("All"); setSearch(""); }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear filters
              </button>
            )}
          </div>

          {/* ── Masonry Grid ── */}
          {filtered.length > 0 ? (
            <div
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              style={{ columnFill: "balance" }}
            >
              {filtered.map((item, i) => (
                <div key={item.id} className="break-inside-avoid mb-6">
                  <InfographicCard
                    item={item}
                    index={i}
                    onClick={openLightbox}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No infographics found</h3>
              <p className="text-slate-400 font-medium text-sm">Try adjusting your search or category filter.</p>
            </div>
          )}

          {/* ── Coming Soon Grid ── */}
          {comingSoonItems.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">Coming Soon</span>
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {comingSoonItems.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <InfographicCard item={item} index={0} onClick={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQ Section ── */}
          <section className="space-y-6 pt-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "Can I use SM Developers infographics on my website?",
                  a: "Yes — all infographics are free to use and share. We ask that you credit SM Developers with a link to smdevs.in when embedding them on your site or sharing them on social media."
                },
                {
                  q: "What formats are the infographics available in?",
                  a: "All infographics are available as high-resolution JPG files, optimized for both web display and social media sharing. Click any infographic and use the Download button to save the full-resolution version."
                },
                {
                  q: "How often are new infographics added?",
                  a: "We add new infographics regularly as part of our content calendar. The Coming Soon section shows topics actively in production. Check back weekly or subscribe to stay updated."
                },
                {
                  q: "Can I embed infographics from this page?",
                  a: "Absolutely. Use the Copy Link button inside any infographic's lightbox to get the direct image URL, then use it in an img tag on your website. This drives referral traffic and helps both sites."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 p-6 space-y-3">
                  <h3 className="font-black text-slate-900 dark:text-white text-base">{faq.q}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA Section ── */}
          <section className="relative bg-slate-950 rounded-[2.5rem] p-12 md:p-16 overflow-hidden text-center space-y-8">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-600/15 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                Work With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Need Help Growing Your Website?
              </h2>
              <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg leading-relaxed">
                From technical SEO audits to full-scale website development — SM Developers helps businesses rank higher and grow faster.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools/seo"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Get Free SEO Audit
              </Link>
              <Link
                href="/resources/blogs"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Read Our Blog
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-black rounded-2xl border border-slate-700 transition-all"
              >
                Contact SM Developers
              </Link>
            </div>
          </section>

        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </>
  );
}
