"use client";

import React, { useState } from "react";
import { 
  Search, 
  Code2, 
  Layout, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  FileCode, 
  Globe, 
  Type, 
  ImageIcon, 
  Link2, 
  ArrowRight,
  ShieldAlert,
  Loader2,
  ChevronDown,
  ChevronUp,
  Share2,
  FileText,
  Scan,
  Zap,
  CheckCircle,
  HelpCircle,
  Target
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

interface AnalysisResult {
  summary: {
    title: string;
    description: string;
    robots: string;
    canonical: string;
    ogImage: string;
  };
  stats: {
    wordCount: number;
    headingStats: { h1: number; h2: number; h3: number };
    linkStats: { total: number; internal: number; external: number };
    imageStats: { total: number; missingAlt: number; poorAltCount: number };
  };
  headings: {
    h1: string[];
    h2: string[];
  };
  readability: {
    complexity: string;
    avgWordLength: string;
  };
  issues: Array<{
    title: string;
    severity: "High" | "Medium" | "Low";
    explanation: string;
    fix: string;
  }>;
  keywordAnalysis: {
    keyword: string;
    foundInTitle: boolean;
    foundInH1: boolean;
    foundInFirst100: boolean;
    foundInAlts: boolean;
  } | null;
  score: number;
}


const SEOSTRUCTUREANALYZER_FAQS = [
  {
    question: "What is the free Seo Structure Analyzer used for?",
    answer: "Our Seo Structure Analyzer helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Seo Structure Analyzer?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Seo Structure Analyzer match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Seo Structure Analyzer?",
    answer: "No installation is required! The Seo Structure Analyzer is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Seo Structure Analyzer?",
    answer: "For best results, we recommend using the Seo Structure Analyzer whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function SEOStructureAnalyzerPage() {
  const [activeTab, setActiveTab] = useState<"url" | "html">("url");
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: activeTab === "url" ? url : null,
          html: activeTab === "html" ? html : null,
          keyword: keyword || null
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");
      setResult(data);
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const severityColor = (sev: string) => {
    switch (sev) {
      case "High": return "bg-rose-500";
      case "Medium": return "bg-amber-500";
      default: return "bg-blue-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <ToolLayout
      title="Advanced SEO Audit"
      description="Professional-grade SEO structure analysis with weighted scoring, keyword correlation, and actionable fix suggestions."
      toolType="SEO"
      howToUse={[
        "Enter a URL or paste raw HTML code to begin the audit.",
        "Optional: Enter a target keyword to check for on-page optimization.",
        "Click 'Analyze' to generate a weighted SEO score out of 100.",
        "Review the 'Detected Issues' for specific fix suggestions to rank higher."
      ]}
      tips={[
        "Aim for a Title Tag length between 50-60 characters to avoid truncation in SERPs.",
        "Ensure every page has exactly one H1 tag containing your primary keyword.",
        "Internal links help distribute 'link juice'; aim for at least 3-5 relevant internal links per page.",
        "Images without Alt text are invisible to search engines and screen readers; always provide descriptive alts."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            An SEO Structure Audit examines the technical and content elements of a webpage to determine how well it communicates its purpose to search engine crawlers (like Googlebot). 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Technical SEO</h4>
                <p className="text-xs text-slate-500 font-medium">Focuses on meta tags, canonicals, robots instructions, and page hierarchy.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Content Analysis</h4>
                <p className="text-xs text-slate-500 font-medium">Analyzes keyword density, readability, word count, and heading distribution.</p>
             </div>
          </div>
          <p className="mt-4">
            Our weighted scoring algorithm prioritizes <strong>High-Impact</strong> issues like missing H1s or duplicate titles over <strong>Low-Impact</strong> issues like minor image alt omissions. Fix the 'High Priority' issues first for the best ranking results.
          </p>
        </div>
      }
      faqs={SEOSTRUCTUREANALYZER_FAQS}
    >
      <div className="space-y-12">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto w-full">
          {/* Tabs */}
          <div className="flex p-1.5 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-8 w-fit mx-auto">
            <button
              onClick={() => setActiveTab("url")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "url" 
                  ? "bg-white dark:bg-slate-900 shadow-lg text-blue-600" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Globe className="w-4 h-4" /> Scan URL
            </button>
            <button
              onClick={() => setActiveTab("html")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "html" 
                  ? "bg-white dark:bg-slate-900 shadow-lg text-blue-600" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <FileCode className="w-4 h-4" /> Audit HTML
            </button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                   {activeTab === "url" ? "Target URL" : "Source Code"}
                 </label>
                 {activeTab === "url" ? (
                   <input
                     type="url"
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     placeholder="https://example.com"
                     className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white"
                   />
                 ) : (
                   <textarea
                     value={html}
                     onChange={(e) => setHtml(e.target.value)}
                     placeholder="<!DOCTYPE html><html>..."
                     className="w-full h-14 px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-mono text-xs transition-all resize-none text-slate-900 dark:text-white"
                   />
                 )}
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Target className="w-3 h-3 text-blue-600" /> Target Keyword (Optional)
                 </label>
                 <input
                   type="text"
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
                   placeholder="e.g. Best Pizza"
                   className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white"
                 />
               </div>
            </div>

            {activeTab === "html" && html.length > 50 && (
               <textarea
                 value={html}
                 readOnly
                 className="w-full h-40 px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-mono text-[10px] text-slate-500 dark:text-slate-400 transition-all opacity-50"
               />
            )}

            <button
              onClick={analyze}
              disabled={loading || (activeTab === "url" ? !url : !html)}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scan className="w-5 h-5" />}
              Run Premium Audit
            </button>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-bold">
              <ShieldAlert className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Top Score Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <Zap className="absolute -top-6 -left-6 w-24 h-24 text-blue-500/5 group-hover:rotate-12 transition-transform duration-700" />
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={377} strokeDashoffset={377 - (377 * result.score) / 100} className={`transition-all duration-1000 ${getScoreColor(result.score)}`} strokeLinecap="round" />
                  </svg>
                  <span className={`absolute text-4xl font-black ${getScoreColor(result.score)}`}>{result.score}</span>
                </div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">SEO Health Score</h4>
              </div>

              <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Word Count", value: result.stats.wordCount, icon: FileText, color: "text-blue-500", sub: result.stats.wordCount > 1000 ? "Excellent" : result.stats.wordCount > 300 ? "Good" : "Low" },
                  { label: "Images", value: result.stats.imageStats.total, icon: ImageIcon, color: "text-indigo-500", sub: `${result.stats.imageStats.missingAlt} Missing Alt` },
                  { label: "Headings", value: result.stats.headingStats.h1 + result.stats.headingStats.h2, icon: Type, color: "text-purple-500", sub: `Hierarchy: ${result.issues.some(i => i.title.includes("Hierarchy")) ? "Poor" : "Perfect"}` },
                  { label: "Readability", value: result.readability.complexity, icon: Zap, color: "text-emerald-500", sub: `Avg Word: ${result.readability.avgWordLength}` },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-all">
                    <stat.icon className={`w-6 h-6 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-[10px] font-bold text-slate-500 italic">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword correlation */}
            {result.keywordAnalysis && (
              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-500/30">
                <div className="flex items-center gap-3 mb-8">
                  <Target className="w-6 h-6" />
                  <h3 className="text-xl font-bold italic">Keyword Correlation: "{result.keywordAnalysis.keyword}"</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[
                     { label: "Title Tag", found: result.keywordAnalysis.foundInTitle },
                     { label: "H1 Heading", found: result.keywordAnalysis.foundInH1 },
                     { label: "Intro Paragraph", found: result.keywordAnalysis.foundInFirst100 },
                     { label: "Image Alts", found: result.keywordAnalysis.foundInAlts },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center gap-3 text-center">
                        {item.found ? <CheckCircle className="w-8 h-8 text-emerald-300" /> : <AlertCircle className="w-8 h-8 text-blue-300 opacity-50" />}
                        <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                        <span className={`text-[10px] font-bold ${item.found ? 'text-emerald-300' : 'text-blue-200'}`}>
                          {item.found ? 'OPTIMIZED' : 'MISSING'}
                        </span>
                     </div>
                   ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Column: Actionable Issues */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  Actionable Insights
                </h3>
                {result.issues.length === 0 ? (
                  <div className="p-10 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-[2.5rem] text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <p className="font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-xs">A Perfect Score!</p>
                  </div>
                ) : (
                  result.issues.map((issue, i) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md transition-all border-l-4"
                      style={{ borderLeftColor: severityColor(issue.severity).replace('bg-', '') }}
                    >
                      <button 
                        onClick={() => setExpandedSection(expandedSection === `issue-${i}` ? null : `issue-${i}`)}
                        className="w-full p-6 text-left flex items-center justify-between"
                      >
                        <div className="flex flex-col gap-1">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full w-fit text-white ${severityColor(issue.severity)}`}>
                            {issue.severity} Priority
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{issue.title}</span>
                        </div>
                        {expandedSection === `issue-${i}` ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                      </button>
                      {expandedSection === `issue-${i}` && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300 space-y-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-2 mb-2">
                               <HelpCircle className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Why fix this?</span>
                             </div>
                             <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                               {issue.explanation}
                             </p>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                             <div className="flex items-center gap-2 mb-2">
                               <Zap className="w-3 h-3 text-blue-600" />
                               <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Suggested Fix</span>
                             </div>
                             <p className="text-xs text-blue-900 dark:text-blue-300 leading-relaxed font-bold">
                               {issue.fix}
                             </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: In-Depth Breakdown */}
              <div className="lg:col-span-2 space-y-8">
                 {/* Metadata Details */}
                 <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                         <Layout className="w-5 h-5 text-blue-600" /> On-Page Metadata
                       </h3>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="space-y-2">
                         <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Title Tag</span>
                           <span className={`text-[10px] font-bold ${result.summary.title.length > 30 && result.summary.title.length < 65 ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {result.summary.title.length} chars
                           </span>
                         </div>
                         <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
                           {result.summary.title || "---"}
                         </div>
                       </div>

                       <div className="space-y-2">
                         <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Meta Description</span>
                           <span className={`text-[10px] font-bold ${result.summary.description.length > 140 && result.summary.description.length < 170 ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {result.summary.description.length} chars
                           </span>
                         </div>
                         <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed border border-slate-100 dark:border-slate-700">
                           {result.summary.description || "---"}
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">Index Robots</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{result.summary.robots || "Not Set"}</span>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">Canonical URL</span>
                            <span className="text-[10px] font-mono text-blue-600 truncate block">{result.summary.canonical || "Not Set"}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Content distribution */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                       <Type className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/5 group-hover:scale-110 transition-transform duration-700" />
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                         Headings List
                       </h3>
                       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {result.headings.h1.map((h, i) => (
                            <div key={`h1-${i}`} className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                              <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-sm mr-2">H1</span>
                              <span className="text-xs font-bold text-blue-900 dark:text-blue-300">{h}</span>
                            </div>
                          ))}
                          {result.headings.h2.map((h, i) => (
                            <div key={`h2-${i}`} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl ml-4">
                              <span className="text-[8px] font-black bg-slate-400 text-white px-1.5 py-0.5 rounded-sm mr-2">H2</span>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{h}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                       <Link2 className="absolute -bottom-10 -right-10 w-40 h-40 text-purple-500/5 group-hover:scale-110 transition-transform duration-700" />
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                         Link Statistics
                       </h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[9px]">Internal Ratio</span>
                              <span className="text-slate-900 dark:text-white">{Math.round((result.stats.linkStats.internal / Math.max(result.stats.linkStats.total, 1)) * 100)}%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                              <div className="h-full bg-blue-600" style={{ width: `${(result.stats.linkStats.internal / Math.max(result.stats.linkStats.total, 1)) * 100}%` }} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <div className="text-xl font-black text-slate-900 dark:text-white">{result.stats.linkStats.internal}</div>
                                <div className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Internal</div>
                             </div>
                             <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <div className="text-xl font-black text-slate-900 dark:text-white">{result.stats.linkStats.external}</div>
                                <div className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">External</div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Social Preview Asset */}
                 <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                       <Share2 className="w-8 h-8 text-blue-500/20" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-8 italic tracking-tighter">Social Card Asset</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                       <div className="aspect-video bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-inner group-hover:border-blue-500 transition-colors duration-500">
                          {result.summary.ogImage ? (
                            <img src={result.summary.ogImage} alt="Social Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                              <ImageIcon className="w-10 h-10 opacity-20" />
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">No OG Asset Found</span>
                            </div>
                          )}
                       </div>
                       <div className="space-y-6">
                          <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">OG Title</span>
                            <p className="text-sm font-bold text-white leading-relaxed line-clamp-3 italic opacity-80 decoration-blue-500/50 underline-offset-4 decoration-2">
                              {result.summary.title}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 rounded-full border border-blue-600/20">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Website Graph</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
