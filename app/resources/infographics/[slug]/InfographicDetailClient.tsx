"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download, Copy, Check, Share2, Code2, ExternalLink,
  ChevronRight, ArrowLeft, Tag, ZoomIn, ZoomOut, X
} from "lucide-react";
import { Infographic } from "@/data/infographics";

export default function InfographicDetailClient({
  item,
  related,
  embedCode,
}: {
  item: Infographic;
  related: Infographic[];
  embedCode: string;
}) {
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"view" | "embed">("view");
  const [zoomed, setZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://smdevs.in/resources/infographics/${item.slug}`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.downloadName}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(item.image, "_blank");
    }
  };

  const shareLinks = [
    {
      name: "LinkedIn",
      color: "bg-[#0077B5] hover:bg-[#006399]",
      href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "Twitter/X",
      color: "bg-slate-900 hover:bg-slate-700",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(item.title + " — Free infographic by @smdevs_in")}`,
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#1467d2]",
      href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "Pinterest",
      color: "bg-[#E60023] hover:bg-[#c5001e]",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(item.image)}&description=${encodeURIComponent(item.title)}`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">

      {/* ── Hero Bar ── */}
      <div className="bg-slate-950 border-b border-slate-800 pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/resources/infographics" className="hover:text-blue-400 transition-colors">Infographics</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate max-w-[200px]">{item.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
              {item.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white">{item.title}</h1>
          </div>
          <p className="text-slate-400 font-medium max-w-2xl">{item.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Left: Image + Tabs ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Tab switcher */}
            <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit shadow-sm">
              {[
                { key: "view" as const, label: "View Full Size", icon: ZoomIn },
                { key: "embed" as const, label: "Embed Code", icon: Code2 },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${
                    activeTab === key
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            {/* View tab */}
            {activeTab === "view" && (
              <div
                className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="relative">
                  {/* Watermark overlay */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">smdevs.in</span>
                  </div>
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-all duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <ZoomIn className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full object-contain max-h-[700px]"
                  />
                </div>
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 font-medium italic flex items-center gap-2">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Click to open full-screen view · Free to share with attribution
                  </p>
                </div>
              </div>
            )}

            {/* Embed tab */}
            {activeTab === "embed" && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-0">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 space-y-4">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    Embed This Infographic
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Copy this HTML code and paste it into your blog post, article, or website. The embed automatically credits SM Developers and drives referral traffic — boosting both your and our SEO.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative">
                    <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {embedCode}
                    </pre>
                    <button
                      onClick={copyEmbed}
                      className="absolute top-4 right-4 p-2.5 bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400"
                    >
                      {copiedEmbed ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      {copiedEmbed ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="font-black text-slate-900 dark:text-white text-base">Preview</h3>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="max-w-sm w-full rounded-xl shadow-md"
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-medium text-center">
                    This is how the infographic will appear on your website when embedded.
                  </p>
                </div>

                <div className="px-8 pb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-5 space-y-2">
                    <p className="text-sm font-black text-blue-900 dark:text-blue-300">✓ Free to embed</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                      This infographic is free to embed on your website, blog, or social media. We only ask that you keep the source attribution link intact. The embed code above includes the required attribution automatically.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">About This Infographic</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.longDescription}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                    <Tag className="w-3 h-3 text-blue-500" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Actions Sidebar ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Primary Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 space-y-4 sticky top-28">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 border-l-4 border-blue-600 pl-4">Actions</h3>

              <button
                onClick={handleDownload}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>

              <button
                onClick={() => setActiveTab("embed")}
                className="w-full py-3.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-black rounded-2xl flex items-center justify-center gap-2 transition-all border border-indigo-100 dark:border-indigo-900/50"
              >
                <Code2 className="w-4 h-4" />
                Get Embed Code
              </button>

              <button
                onClick={copyLink}
                className="w-full py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-slate-700"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copiedLink ? "Link Copied!" : "Copy Link"}
              </button>

              {/* Share */}
              <div className="pt-2 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share</p>
                <div className="grid grid-cols-2 gap-2">
                  {shareLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${s.color} text-white rounded-xl py-2.5 text-[11px] font-black text-center flex items-center justify-center gap-1.5 transition-all`}
                    >
                      <ExternalLink className="w-3 h-3" /> {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to Hub */}
            <Link
              href="/resources/infographics"
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Infographics Hub
            </Link>
          </div>
        </div>

        {/* ── Related Infographics ── */}
        {related.length > 0 && (
          <div className="mt-20 space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Related Infographics</h2>
              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/resources/infographics/${rel.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                    <img src={rel.image} alt={rel.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all duration-300" />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{rel.category}</span>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{rel.title}</h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2">{rel.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-20 relative bg-slate-950 rounded-[2.5rem] p-12 text-center overflow-hidden">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-600/15 blur-[100px] rounded-full" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">Need Help Growing Your Website?</h2>
            <p className="text-slate-400 font-medium max-w-lg mx-auto">
              Use our free SEO tools to audit and optimize your site — no signup required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/tools/seo" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105">
                Free SEO Tools
              </Link>
              <Link href="/resources/infographics" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/10 transition-all">
                More Infographics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-Screen Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={item.image}
            alt={item.alt}
            className={`max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl transition-transform duration-300 ${zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
          />
          {/* Watermark in lightbox */}
          <div className="absolute bottom-8 right-8 px-3 py-1.5 bg-white/10 backdrop-blur rounded-lg">
            <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">smdevs.in</span>
          </div>
        </div>
      )}
    </div>
  );
}
