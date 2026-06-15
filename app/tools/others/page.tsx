"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowRight, Search, Lock, Zap, Star } from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import FAQSection from "@/components/tools/FAQSection";

const OTHER_TOOLS = [
  {
    name: "Resume Analyzer & ATS Optimizer",
    description: "Analyze ATS compatibility, keyword match, readability, recruiter visibility, and get a full improvement roadmap. Free, private, no signup.",
    icon: FileText,
    href: "/tools/others/resume-analyzer-and-ats-optimizer",
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    tag: "New",
    features: ["ATS Score", "JD Match", "Achievement Detector", "Improvement Roadmap"],
  },
];

const OTHER_TOOLS_FAQS = [
  {
    question: "What category of tools are included here?",
    answer: "The 'Other Tools' category includes specialized utilities that don't fall under SEO or Trading — such as Resume Analyzers, PDF tools, productivity utilities, and career tools. We're constantly adding new tools based on user demand.",
  },
  {
    question: "Are all tools in this section free?",
    answer: "Yes, every tool on SM Developers — including all tools in this section — is completely free to use with no registration, subscriptions, or hidden costs.",
  },
  {
    question: "Is my data safe when using these tools?",
    answer: "Absolutely. All our tools process data client-side in your browser. We never upload, store, or share your input data. Privacy-first architecture is a core principle across the entire SM Developers platform.",
  },
  {
    question: "How often are new tools added?",
    answer: "We ship new tools regularly based on community feedback and user requests. Follow us or check back often — new utilities are added across all categories as we grow.",
  },
];

export default function OtherToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = OTHER_TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Directory Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-full text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5" />
            New Category
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Other <span className="gradient-text">Productivity Tools</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Specialized utilities for career, productivity, and beyond. All free, all private — built for modern professionals.
          </p>

          {/* Privacy Badge */}
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <Lock className="w-4 h-4" />
            All tools are 100% client-side — your data never leaves your browser
          </div>

          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-xl shadow-slate-200/20 dark:shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Web Tools", href: "/#web-tools" },
              { label: "Other Tools" },
            ]}
          />
        </div>
      </div>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <section className="space-y-10">
          {searchQuery ? (
            <>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Search Results
              </h2>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 font-medium">
                  No tools found matching &quot;{searchQuery}&quot;
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 underline decoration-violet-600/30 underline-offset-8">
                    Featured <span className="gradient-text">Utilities</span>
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Specialized tools for career and productivity.
                  </p>
                </div>
                <div className="text-[10px] font-black text-violet-600 bg-violet-50 dark:bg-violet-900/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Privacy-First • No Signup
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {OTHER_TOOLS.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>

              {/* Coming Soon placeholder */}
              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {[
                  { name: "Cover Letter Generator", desc: "Generate tailored cover letters matched to job descriptions." },
                  { name: "LinkedIn Profile Optimizer", desc: "Audit your LinkedIn profile for visibility and completeness." },
                  { name: "Salary Estimator", desc: "Estimate market salary for any role, location, and experience level." },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 opacity-60"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                      <Zap className="w-7 h-7 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">{item.name}</h3>
                    <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Coming Soon
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <FAQSection faqs={OTHER_TOOLS_FAQS} />
      </main>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof OTHER_TOOLS)[0] }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-violet-200 dark:border-violet-900 shadow-xl shadow-violet-500/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 transition-all ring-1 ring-violet-50 dark:ring-violet-900/50"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight pr-4">
          {tool.name}
        </h3>
        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-violet-600 shrink-0 mt-1" />
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-6">
        {tool.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tool.features.map((f) => (
          <span
            key={f}
            className="text-[10px] font-black px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-lg border border-violet-100 dark:border-violet-800 uppercase tracking-wide"
          >
            {f}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-violet-100 dark:border-violet-900/50 font-bold text-sm flex items-center justify-between text-violet-600">
        <span>Open Tool</span>
        {tool.tag && (
          <span className="text-[10px] px-2 py-0.5 bg-violet-600 text-white rounded-md uppercase tracking-widest">
            {tool.tag}
          </span>
        )}
      </div>
    </Link>
  );
}
