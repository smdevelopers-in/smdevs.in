"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Download, X, ChevronLeft, ChevronRight,
  Copy, Check, ExternalLink, ImageIcon, ZoomIn,
  Code2, TrendingUp, Layers, Globe, Cpu, PenTool,
  BarChart2, Users, Filter
} from "lucide-react";
import { INFOGRAPHICS, CATEGORIES, type Infographic } from "@/data/infographics";

const CATEGORY_ICONS: Record<string, any> = {
  "SEO": TrendingUp,
  "Technical SEO": Layers,
  "Local SEO": Globe,
  "AI SEO": Cpu,
  "Content Marketing": PenTool,
  "Lead Generation": Users,
  "Business Growth": BarChart2,
};

// ─── Card ────────────────────────────────────────────────────────────────────
function InfographicCard({ item, onOpen }: { item: Infographic; onOpen: () => void }) {
  const CatIcon = CATEGORY_ICONS[item.category] || TrendingUp;
  const isComingSoon = !item.image;

  return (
    <div className="break-inside-avoid mb-6">
      <div
        className={`group relative bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900 hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-900/50 ${!isComingSoon ? "cursor-pointer" : ""}`}
        onClick={() => !isComingSoon && onOpen()}
      >
        {/* Image area */}
        <div className={`relative ${item.aspectClass} overflow-hidden bg-slate-50 dark:bg-slate-800`}>
          {isComingSoon ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coming Soon</span>
            </div>
          ) : (
            <>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Watermark */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/80 dark:bg-slate-950/80 backdrop-blur rounded-md">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">smdevs.in</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <div className="w-10 h-10 bg-white/20 backdrop-blur border border-white/30 rounded-xl flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur border border-white/30 rounded-xl flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300 delay-75">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
            </>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600 border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <CatIcon className="w-2.5 h-2.5" /> {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-bold border border-slate-100 dark:border-slate-700">
                {tag}
              </span>
            ))}
          </div>
          {!isComingSoon && (
            <div className="flex gap-2 pt-1">
              <button
                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
              >
                <ZoomIn className="w-3 h-3" /> View
              </button>
              <Link
                href={`/resources/infographics/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-slate-700"
              >
                <ExternalLink className="w-3 h-3" /> Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  items, index, onClose, onPrev, onNext,
}: {
  items: Infographic[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const item = items[index];
  const [tab, setTab] = useState<"view" | "share" | "embed">("view");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const pageUrl = `https://smdevs.in/resources/infographics/${item.slug}`;
  const embedCode = `<a href="${pageUrl}" title="${item.title} by SM Developers">
  <img src="${item.image}" alt="${item.alt}" style="max-width:100%;height:auto;" />
</a>
<p>Source: <a href="https://smdevs.in/resources/infographics">SM Developers Infographics Hub</a></p>`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const copyLink = () => { navigator.clipboard.writeText(pageUrl); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); };
  const copyEmbed = () => { navigator.clipboard.writeText(embedCode); setCopiedEmbed(true); setTimeout(() => setCopiedEmbed(false), 2000); };

  const handleDownload = async () => {
    try {
      const res = await fetch(item.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${item.downloadName}.jpg`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch { window.open(item.image, "_blank"); }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">

        {/* Image */}
        <div
          className={`relative flex-1 bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[280px] overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={() => setZoomed(!zoomed)}
        >
          <img src={item.image} alt={item.alt} className={`max-h-[80vh] object-contain transition-transform duration-500 select-none ${zoomed ? "scale-150" : "scale-100"}`} />
          {/* Watermark */}
          <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-lg border border-slate-200/50 dark:border-slate-700">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">smdevs.in</span>
          </div>
          {/* Nav */}
          {["prev", "next"].map((dir) => (
            <button key={dir}
              onClick={(e) => { e.stopPropagation(); dir === "prev" ? onPrev() : onNext(); }}
              className={`absolute ${dir === "prev" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-slate-900/80 hover:bg-blue-600 hover:text-white backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all`}
            >
              {dir === "prev" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-400">
            {index + 1} / {items.length}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{item.category}</span>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 flex items-center justify-center text-slate-500 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab pills */}
          <div className="flex gap-1 p-3 border-b border-slate-100 dark:border-slate-800">
            {(["view", "share", "embed"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${tab === t ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="space-y-2">
              <h2 className="font-black text-slate-900 dark:text-white text-base leading-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
            </div>

            {/* View tab */}
            {tab === "view" && (
              <div className="space-y-3">
                <button onClick={handleDownload}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Download className="w-4 h-4" /> Download Now
                </button>
                <button onClick={copyLink}
                  className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all border border-slate-200 dark:border-slate-700">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? "Copied!" : "Copy Link"}
                </button>
                <Link href={`/resources/infographics/${item.slug}`}
                  className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all border border-slate-200 dark:border-slate-700">
                  <ExternalLink className="w-4 h-4" /> View Full Page
                </Link>
              </div>
            )}

            {/* Share tab */}
            {tab === "share" && (
              <div className="space-y-2">
                {[
                  { name: "LinkedIn", color: "bg-[#0077B5]", href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
                  { name: "Twitter / X", color: "bg-slate-900", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(item.title)}` },
                  { name: "Facebook", color: "bg-[#1877F2]", href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
                  { name: "Pinterest", color: "bg-[#E60023]", href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(item.image)}&description=${encodeURIComponent(item.title)}` },
                ].map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`${s.color} text-white rounded-2xl py-3 text-sm font-black flex items-center justify-center gap-2 transition-opacity hover:opacity-90`}>
                    <ExternalLink className="w-3.5 h-3.5" /> Share on {s.name}
                  </a>
                ))}
              </div>
            )}

            {/* Embed tab */}
            {tab === "embed" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Copy and paste this HTML into your blog or website to embed this infographic. Attribution is included automatically.
                </p>
                <div className="relative bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                  <pre className="text-[10px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed overflow-x-auto">{embedCode}</pre>
                  <button onClick={copyEmbed}
                    className="mt-3 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl flex items-center justify-center gap-2 text-xs transition-all">
                    {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedEmbed ? "Copied!" : "Copy Embed Code"}
                  </button>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-xl p-3">
                  <p className="text-[10px] text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                    ✓ Free to embed with attribution link intact.
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-bold border border-slate-100 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Hub Page ────────────────────────────────────────────────────────────
export default function InfographicsHubPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const published = INFOGRAPHICS.filter((i) => i.image);
  const comingSoon = INFOGRAPHICS.filter((i) => !i.image);

  const filtered = published.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = !q || item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free SEO Infographics Hub | SM Developers",
        "description": "Free downloadable SEO and digital marketing infographics for professionals, bloggers, and business owners.",
        "url": "https://smdevs.in/resources/infographics",
        "publisher": { "@type": "Organization", "name": "SM Developers", "url": "https://smdevs.in" },
        "hasPart": published.map(i => ({
          "@type": "ImageObject",
          "name": i.title,
          "description": i.description,
          "contentUrl": i.image,
          "url": `https://smdevs.in/resources/infographics/${i.slug}`,
          "keywords": i.tags.join(", "),
        }))
      })}} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

        {/* Hero */}
        <section className="bg-slate-950 text-white pt-32 pb-16 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-8 uppercase tracking-widest">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources/blogs" className="hover:text-blue-400 transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">Infographics</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  <ImageIcon className="w-3 h-3" /> Free Infographics Hub
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
                  Visual SEO <span className="text-blue-500">Guides</span>
                </h1>
                <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl">
                  Free, downloadable infographics covering SEO, digital marketing, and web development. Embed on your site or share on social — with attribution included automatically.
                </p>
                <div className="flex flex-wrap gap-8 pt-2">
                  {[{ n: `${published.length}+`, l: "Live Downloads" }, { n: "Free", l: "Always" }, { n: "Embed", l: "Ready" }].map((s) => (
                    <div key={s.l} className="flex items-center gap-2">
                      <span className="text-2xl font-black text-blue-400">{s.n}</span>
                      <span className="text-sm text-slate-500 font-medium">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-80 space-y-3">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input type="text" placeholder="Search infographics..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 focus:border-blue-600/50 focus:ring-4 focus:ring-blue-600/10 rounded-2xl text-white font-medium text-sm placeholder:text-slate-600 outline-none transition-all" />
                </div>
                <button onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-300 text-sm font-bold flex items-center justify-center gap-2 transition-all lg:hidden">
                  <Filter className="w-4 h-4" /> {showFilters ? "Hide" : "Show"} Filters
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">

          {/* Category Pills */}
          <div className={`${showFilters ? "flex" : "hidden lg:flex"} flex-wrap gap-2`}>
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? published.length : published.filter(i => i.category === cat).length;
              if (count === 0 && cat !== "All") return null;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800"
                  }`}>
                  {cat}
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
            {(activeCategory !== "All" || search) && (
              <button onClick={() => { setActiveCategory("All"); setSearch(""); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-500 dark:text-slate-400">
              {filtered.length} infographic{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && <> in <span className="font-bold text-blue-600">{activeCategory}</span></>}
            </span>
          </div>

          {/* Masonry Grid */}
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
              {filtered.map((item, i) => (
                <InfographicCard key={item.id} item={item} onOpen={() => setLightboxIndex(i)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No matches found</h3>
              <p className="text-sm text-slate-400 font-medium">Try adjusting your search or filter.</p>
            </div>
          )}

          {/* Coming Soon */}
          {comingSoon.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coming Soon</span>
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {comingSoon.map((item) => (
                  <InfographicCard key={item.id} item={item} onOpen={() => {}} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <section className="relative bg-slate-950 rounded-[2.5rem] p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white">Need Help Growing Your Website?</h2>
              <p className="text-slate-400 font-medium max-w-md mx-auto">
                Use our free SEO tools to audit, optimize, and grow your organic traffic — no signup required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/tools/seo" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                  Free SEO Audit
                </Link>
                <Link href="/resources/blogs" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/10 transition-all">
                  Read Our Blog
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-bold rounded-2xl border border-slate-700 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((i) => (i! + 1) % filtered.length)}
        />
      )}
    </>
  );
}
