"use client";

import React, { useState, useEffect } from "react";
import { Search, Monitor, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";
import ResultBox from "@/components/tools/ResultBox";


const METATAGGENERATOR_FAQS = [
  {
    question: "What is the free Meta Tag Generator used for?",
    answer: "Our Meta Tag Generator helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Meta Tag Generator?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Meta Tag Generator match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Meta Tag Generator?",
    answer: "No installation is required! The Meta Tag Generator is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Meta Tag Generator?",
    answer: "For best results, we recommend using the Meta Tag Generator whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("My Awesome Website");
  const [description, setDescription] = useState("This is a comprehensive description of my website for search engines.");
  const [url, setUrl] = useState("https://example.com");
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const [metaTags, setMetaTags] = useState("");

  useEffect(() => {
    const tags = `
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
    `.trim();
    setMetaTags(tags);
  }, [title, description, url]);

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Create SEO-optimized meta tags for your website. Preview how your site will look on Google and ensure your titles and descriptions are the perfect length."
      toolType="SEO"
      howToUse={[
        "Enter your website title, description, and canonical URL.",
        "Check the SERP preview to see how your site appears on desktop and mobile.",
        "Monitor the character counts to stay within recommended SEO limits.",
        "Copy the generated HTML meta tags and paste them into your <head> section."
      ]}
      tips={[
        "Your Title Tag is the single most important on-page SEO element—keep it under 60 characters.",
        "Meta descriptions don't directly impact rankings, but they greatly influence Click-Through Rate (CTR).",
        "Always include a 'Canonical' URL to prevent duplicate content issues if your site is accessible via multiple URLs.",
        "Include your primary keyword near the beginning of the Title Tag for maximum impact."
      ]}
      faqs={METATAGGENERATOR_FAQS}
      explanation={
        <div className="space-y-4">
          <p>
            Meta tags are snippets of text that describe a page's content; the tags don't appear on the page itself, but only in the page's source code. They are essentially <strong>content descriptors</strong> that help tell search engines what a web page is about.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Title Tags</h4>
                <p className="text-xs text-slate-500 font-medium">The clickable headline in search results. Crucial for both SEO and user intent.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-2">Descriptions</h4>
                <p className="text-xs text-slate-500 font-medium">The short summary that appears below the title. Think of it as your page's 'Ad Copy'.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inputs & Validation */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">SEO Settings</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <InputField
                label="Page Title"
                value={title}
                onChange={setTitle}
                placeholder="Enter page title"
              />
              <div className="flex items-center justify-between px-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${titleLength > 60 ? "text-rose-500" : "text-emerald-500"}`}>
                  {titleLength} / 60 Characters
                </span>
                {titleLength <= 60 ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                    <CheckCircle2 className="w-3 h-3" /> Perfect
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase">
                    <AlertCircle className="w-3 h-3" /> Too Long
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <InputField
                label="Meta Description"
                type="textarea"
                value={description}
                onChange={setDescription}
                placeholder="Enter meta description"
              />
              <div className="flex items-center justify-between px-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${descLength > 160 ? "text-rose-500" : "text-emerald-500"}`}>
                  {descLength} / 160 Characters
                </span>
                {descLength <= 160 ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                    <CheckCircle2 className="w-3 h-3" /> Recommended
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase">
                    <AlertCircle className="w-3 h-3" /> Too Long
                  </span>
                )}
              </div>
            </div>

            <InputField
              label="Canonical URL"
              value={url}
              onChange={setUrl}
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Previews */}
        <div className="space-y-8">
          {/* SERP Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Google SERP Preview
              </h3>
              <div className="flex bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setView("desktop")}
                  className={`p-2 rounded-lg transition-all ${view === "desktop" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-600"}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("mobile")}
                  className={`p-2 rounded-lg transition-all ${view === "mobile" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-600"}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-8 flex items-center justify-center min-h-[200px] bg-slate-50/30 dark:bg-slate-950/20">
              <div className={`bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200/60 dark:border-slate-800 p-6 transition-all duration-500 ${view === "mobile" ? "max-w-[360px]" : "w-full max-w-[600px]"}`}>
                <div className="space-y-1.5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">G</div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">{url}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">https://example.com <span className="rotate-90">›</span> article</span>
                    </div>
                  </div>
                  <h4 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium line-clamp-1">
                    {title || "Enter a title..."}
                  </h4>
                  <p className="text-sm text-[#4d5156] dark:text-[#bebebe] line-clamp-2 leading-relaxed">
                    {description || "Enter a description to see how it looks in search results."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ResultBox
            title="Generated Meta Tags"
            content={metaTags}
            label="HTML"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
