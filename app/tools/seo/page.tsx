"use client";

import React, { useState } from "react";
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
  Sparkles,
  Target,
  ListChecks
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import FAQSection from "@/components/tools/FAQSection";

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
  {
    name: "Keyword Intent Analyzer",
    description: "Instantly uncover the search intent (Informational, Transactional etc.) of any keyword.",
    icon: Target,
    href: "/tools/seo/keyword-intent-analyzer",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500",
  },
  {
    name: "SEO Checklist Generator",
    description: "An interactive, client-side SEO completion tracker to ensure proper optimization.",
    icon: ListChecks,
    href: "/tools/seo/seo-checklist-generator",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-500",
  },
];

const SEO_INDEX_FAQS = [
  {
    question: "What SEO tools do you offer?",
    answer: "We offer a comprehensive suite of 18+ free SEO tools including Schema Generators, Authority Checkers, Keyword Volume Estimators, AI Content Detectors, and Technical SEO Analyzers."
  },
  {
    question: "Are these tools really free?",
    answer: "Yes, all our utilities on this platform are 100% free with no hidden paywalls. We believe in providing open-access resources for developers and marketers."
  },
  {
    question: "Do I need to create an account?",
    answer: "No login or account creation is required to use any of our SEO or Trading tools. You can start optimizing your website immediately."
  },
  {
    question: "How accurate is the data?",
    answer: "We use live API integrations, heuristic models, and industry-standard algorithms to ensure that the data and validation matches current search engine standards."
  }
];

export default function SEOToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = SEO_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          
          <div className="max-w-xl mx-auto pt-8">
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tools (e.g., Schema, Keyword, Meta)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xl shadow-slate-200/20 dark:shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Web Tools", href: "/#web-tools" }, { label: "SEO Tools" }]} />
        </div>
      </div>

      {/* Tools Grid Area */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {searchQuery ? (
          <section className="space-y-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Search Results</h2>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 font-medium">No tools found matching "{searchQuery}"</p>
            )}
          </section>
        ) : (
          <>
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
                  "Link Profile",
                  "Keyword Intent Analyzer"
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
                  "Link Profile",
                  "Keyword Intent Analyzer"
                ].includes(t.name)).map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </section>
          </>
        )}


        {/* From Our Blog — reduces orphaned pages, increases text/HTML ratio */}
        <section className="space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">From Our <span className="text-blue-600">Blog</span></h2>
              <p className="text-sm text-slate-500 font-medium">In-depth guides to help you master SEO and grow organic traffic.</p>
            </div>
            <Link href="/resources/blogs" className="text-sm font-black text-blue-600 hover:text-blue-700 flex items-center gap-1">
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "What Is Schema Markup? Complete Structured Data Guide", href: "/resources/blogs/what-is-schema-markup-structured-data-guide", tag: "Schema" },
              { title: "How to Write the Perfect Meta Title & Meta Description", href: "/resources/blogs/how-to-write-perfect-meta-title-meta-description", tag: "Meta Tags" },
              { title: "On-Page SEO Checklist: 23 Things to Audit Before Publishing", href: "/resources/blogs/on-page-seo-checklist-23-things-audit-before-publish", tag: "On-Page SEO" },
              { title: "Keyword Intent Analysis: Complete Guide to Search Intent", href: "/resources/blogs/keyword-intent-analysis-complete-guide", tag: "Keywords" },
              { title: "How to Create an XML Sitemap: SEO Guide", href: "/resources/blogs/how-to-create-xml-sitemap-seo-guide", tag: "Sitemap" },
              { title: "How to Use Free SEO Tools to Rank Higher in Google", href: "/resources/blogs/how-to-use-free-seo-tools-rank-higher", tag: "SEO Tools" },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col gap-3 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md w-fit">{post.tag}</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-blue-600 transition-colors flex items-start justify-between gap-2">
                  {post.title}
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 mt-0.5" />
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={SEO_INDEX_FAQS} />

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
        {highlighted && <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md">Popular</span>}
      </div>
    </Link>
  );
}
