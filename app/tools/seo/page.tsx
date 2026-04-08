"use client";

import React from "react";
import Link from "next/link";
import { 
  FileSearch, 
  Code2, 
  Search, 
  FileText, 
  Map, 
  FileOutput, 
  Eye,
  ArrowRight,
  Link2,
  Layout,
  BarChart3,
  Share2,
  LayoutDashboard,
  ShieldCheck,
  Brain,
  Sparkles
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";

const SEO_TOOLS = [
  {
    name: "Schema Validator",
    description: "Validate and identify your structured data schema easily.",
    icon: FileSearch,
    href: "/tools/seo/schema-validator",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
  },
  {
    name: "Schema Generator",
    description: "Generate JSON-LD markup for Articles, FAQs, Products and more.",
    icon: Code2,
    href: "/tools/seo/schema-generator",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-500",
  },
  {
    name: "Meta Tag Generator",
    description: "Create and optimize meta tags for better search engine visibility.",
    icon: Search,
    href: "/tools/seo/meta-tag-generator",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500",
  },
  {
    name: "Robots.txt Generator",
    description: "Guide search engines on how to crawl your website correctly.",
    icon: FileText,
    href: "/tools/seo/robots-txt-generator",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500",
  },
  {
    name: "Sitemap Generator",
    description: "Generate a clean XML sitemap for search engine indexing.",
    icon: Map,
    href: "/tools/seo/sitemap-generator",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-500",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate raw JSON data for better readability.",
    icon: FileOutput,
    href: "/tools/seo/json-formatter",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500",
  },
  {
    name: "SERP Preview",
    description: "Preview how your website appears in Google search results.",
    icon: Eye,
    href: "/tools/seo/serp-preview",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  {
    name: "SEO Structure Analyzer",
    description: "Detailed analysis of webpage architecture, head tags, and content hierarchy.",
    icon: LayoutDashboard,
    href: "/tools/seo/seo-structure-analyzer",
    color: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white",
  },
  {
    name: "On-Page SEO Checker",
    description: "Scan any URL for meta tags, heading structure, and SEO score.",
    icon: Layout,
    href: "/tools/seo/on-page-seo-checker",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500",
  },
  {
    name: "Keyword Density",
    description: "Find the most frequent words and their density in your content.",
    icon: BarChart3,
    href: "/tools/seo/keyword-density-checker",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-500",
  },
  {
    name: "Open Graph Generator",
    description: "Create and preview social media meta tags for better sharing.",
    icon: Share2,
    href: "/tools/seo/open-graph-generator",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
  },
  {
    name: "Broken Link Checker",
    description: "Scan your webpage for dead links to improve SEO and user experience.",
    icon: Link2,
    href: "/tools/seo/broken-link-checker",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500",
  },
  {
    name: "Keyword Suggestion",
    description: "Generate hundreds of long-tail, question-based, and comparison keywords.",
    icon: Search,
    href: "/tools/seo/keyword-suggestion",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
  },
  {
    name: "Keyword Volume",
    description: "Heuristic volume and difficulty estimation for any search term.",
    icon: BarChart3,
    href: "/tools/seo/keyword-volume-estimator",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500",
  },
  {
    name: "Authority Score",
    description: "Estimate site authority based on content depth and technical signals.",
    icon: ShieldCheck,
    href: "/tools/seo/authority-score",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-500",
  },
  {
    name: "Link Profile",
    description: "Extract and analyze link distribution and anchor text profiles.",
    icon: Link2,
    href: "/tools/seo/link-profile-analyzer",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500",
  },
  {
    name: "AI Content Detector",
    description: "Detect machine-generated text using linguistic pattern analysis.",
    icon: Brain,
    href: "/tools/seo/ai-content-detector",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-500",
  },
  {
    name: "Content Humanizer",
    description: "Transform robotic phrasing into engaging, human-like content.",
    icon: Sparkles,
    href: "/tools/seo/content-humanizer",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
  },
];

export default function SEOToolsDirectory() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Directory Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Powerful <span className="gradient-text">SEO Tools</span> for Everyone
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Boost your website's visibility with our suite of free, production-ready SEO utilities. No login, no tracking, just tools.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Web Tools", href: "/#web-tools" }, { label: "SEO Tools" }]} />
        </div>
      </div>

      {/* Tools Grid Area */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Advanced & Unique Tools Section */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 underline decoration-blue-600/30 underline-offset-8">Advanced <span className="gradient-text">Utilities</span></h2>
              <p className="text-sm text-slate-500 font-medium">Heuristic engines for deep SEO analysis and content intelligence.</p>
            </div>
            <div className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
              AI Powered • High Accuracy
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEO_TOOLS.filter(t => [
              "SEO Structure Analyzer", 
              "AI Content Detector", 
              "Content Humanizer", 
              "Authority Score", 
              "Keyword Volume", 
              "Link Profile"
            ].includes(t.name)).map((tool) => (
              <ToolCard key={tool.name} tool={tool} highlighted />
            ))}
          </div>
        </section>

        {/* Essential Content Tools Section */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Essential <span className="text-slate-500 dark:text-slate-400">SEO</span></h2>
              <p className="text-sm text-slate-500 font-medium">Standard utilities for daily optimization and tags generation.</p>
            </div>
            <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest">
              Core SEO
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEO_TOOLS.filter(t => ![
              "SEO Structure Analyzer", 
              "AI Content Detector", 
              "Content Humanizer", 
              "Authority Score", 
              "Keyword Volume", 
              "Link Profile"
            ].includes(t.name)).map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ToolCard({ tool, highlighted = false }: { tool: any, highlighted?: boolean }) {
  return (
    <Link
      href={tool.href}
      className={`group bg-white dark:bg-slate-900 p-8 rounded-[2rem] border transition-all ${
        highlighted 
          ? "border-blue-200 dark:border-blue-900 shadow-xl shadow-blue-500/5 hover:-translate-y-2 ring-1 ring-blue-50 dark:ring-blue-900/50" 
          : "border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
        <tool.icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
        {tool.name}
        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
        {tool.description}
      </p>
      
      <div className={`mt-8 pt-6 border-t font-bold text-sm flex items-center justify-between ${
        highlighted ? "border-blue-100 dark:border-blue-900/50 text-blue-600" : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600"
      }`}>
        <span>Open Tool</span>
        {highlighted && <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md">Pro</span>}
      </div>
    </Link>
  );
}
