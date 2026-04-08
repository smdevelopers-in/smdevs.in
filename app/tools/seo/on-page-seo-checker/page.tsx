"use client";

import React, { useState } from "react";
import { Search, AlertCircle, CheckCircle2, Loader2, Gauge, Layout, Type, Image as ImageIcon, Link2, Info } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";

interface AnalysisData {
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  imagesTotal: number;
  imagesWithoutAlt: number;
  linksTotal: number;
  score: number;
}

export default function OnPageSEOPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeSEO = async () => {
    if (!url) return;
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");

      setResults(data);
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="On-Page SEO Checker"
      description="Quickly analyze any webpage's on-page SEO factors like titles, meta descriptions, and heading structure."
      toolType="SEO"
      howToUse={[
        "Enter the URL of the page you want to analyze.",
        "Click 'Analyze' to start the scan.",
        "Review the SEO score and detailed metrics.",
        "Follow the recommendations in the explanation boxes to improve your score."
      ]}
      tips={[
        "Aim for an SEO score of 85+ for your most important landing pages.",
        "Ensure you have exactly one H1 tag per page. Using multiple H1s can confuse search engines.",
        "Optimize image Alt text for both SEO and accessibility. Don't just stuff keywords.",
        "A healthy balance of H2 and H3 tags creates a clear hierarchy for both readers and crawlers."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            On-page SEO refers to the practice of optimizing individual web pages to rank higher and earn more relevant traffic in search engines. Unlike off-page SEO (backlinks), on-page SEO is <strong>entirely within your control</strong>.
          </p>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 mt-6">
             <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Why it matters</h4>
             <p className="text-xs text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
               Even the best content won't rank if search engines can't understand its structure. By optimizing your tags, headings, and images, you provide a clear roadmap for Google to index and rank your content accurately.
             </p>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <InputField
                label="Page URL"
                value={url}
                onChange={setUrl}
                placeholder="https://example.com"
                description="The full URL to analyze"
              />
            </div>
            <button
              onClick={analyzeSEO}
              disabled={loading || !url}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 h-[56px] min-w-[140px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-bold">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score and Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                   <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={364} strokeDashoffset={364 - (364 * results.score) / 100} className="text-blue-600 transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-4xl font-black text-slate-900 dark:text-white">{results.score}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">SEO Score</h3>
                <p className="text-sm text-slate-500 font-medium">Overall On-Page Health</p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "H1 Tags", value: results.h1Count, icon: Layout, color: "text-blue-500" },
                  { label: "H2 Tags", value: results.h2Count, icon: Type, color: "text-indigo-500" },
                  { label: "Total Images", value: results.imagesTotal, icon: ImageIcon, color: "text-emerald-500" },
                  { label: "Missing Alt", value: results.imagesWithoutAlt, icon: AlertCircle, color: "text-rose-500" },
                  { label: "Total Links", value: results.linksTotal, icon: Link2, color: "text-purple-500" },
                  { label: "Title Chars", value: results.titleLength, icon: Gauge, color: "text-amber-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title Tag */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl ${results.title ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                    {results.title ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Title Tag</h3>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 italic">
                  {results.title || "No Title Tag Found"}
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                    {results.titleLength === 0 
                      ? "Missing title tag is a critical SEO error." 
                      : results.titleLength > 60 
                      ? "Your title is too long (over 60 chars) and may be truncated in search results."
                      : "Your title length is optimal (30-60 characters)."}
                  </p>
                </div>
              </div>

              {/* Meta Description */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl ${results.metaDescription ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                    {results.metaDescription ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Meta Description</h3>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 italic">
                  {results.metaDescription || "No Meta Description Found"}
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                    {results.metaDescriptionLength === 0
                      ? "Missing meta description can reduce your click-through rate (CTR)."
                      : results.metaDescriptionLength > 160
                      ? "Your description is too long (over 160 chars) and will likely be cut off."
                      : "Meta description length is good (120-160 characters)."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
