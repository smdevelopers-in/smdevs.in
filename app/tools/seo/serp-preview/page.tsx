"use client";

import React, { useState } from "react";
import { Eye, Monitor, Smartphone, Search, Info } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";


const SERPPREVIEW_FAQS = [
  {
    question: "What is the free Serp Preview used for?",
    answer: "Our Serp Preview helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Serp Preview?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Serp Preview match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Serp Preview?",
    answer: "No installation is required! The Serp Preview is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Serp Preview?",
    answer: "For best results, we recommend using the Serp Preview whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function SerpPreviewPage() {
  const [title, setTitle] = useState("SM Developers - Advanced Engineering Solutions");
  const [description, setDescription] = useState("Empowering developers with production-ready tools, high-performance web applications, and state-of-the-art engineering resources.");
  const [url, setUrl] = useState("https://smdevelopers.io/tools/seo");
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const titlePixels = title.length * 8.5; // Rough approximation
  const descPixels = description.length * 7; // Rough approximation

  const handleInteraction = () => {
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  return (
    <ToolLayout
      title="SERP Preview"
      description="See exactly how your website will appear in Google search results. Optimize your titles and snippets to increase your click-through rate (CTR)."
      toolType="SEO"
      howToUse={[
        "Enter your page title, meta description, and URL to generate a live preview.",
        "Toggle between desktop and mobile views to see how the layout changes.",
        "Keep your title under 580px (roughly 60 chars) to avoid truncation.",
        "Ensure your description is under 920px (roughly 160 chars) for maximum impact."
      ]}
      tips={[
        "Google often truncates titles at 60 characters and descriptions at 160 characters. Stay within these limits.",
        "Use 'Action Words' (e.g., Learn, Discover, Get) in your meta description to encourage user interaction.",
        "A/B test different titles using this previewer to find the most compelling 'Hook' for your audience.",
        "Mobile search results use slightly different spacing—always check both views."
      ]}
      faqs={SERPPREVIEW_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            SERP (Search Engine Results Page) Preview tools simulate how your website's <strong>Title Tag</strong> and <strong>Meta Description</strong> will appear to potential visitors on Google.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">First Impressions</h4>
                <p className="text-xs text-slate-500 font-medium">The SERP entry is the very first time a user interacts with your brand. Make it count.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">CTR Optimization</h4>
                <p className="text-xs text-slate-500 font-medium">A higher Click-Through Rate signals to Google that your page is relevant to the search query.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
              <Search className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Preview Content</h2>
          </div>

          <div className="space-y-6">
            <InputField
              label="Page Title"
              value={title}
              onChange={(val) => { setTitle(val); handleInteraction(); }}
              placeholder="TitleTag | Brand Name"
            />
            
            <InputField
              label="Meta Description"
              type="textarea"
              value={description}
              onChange={(val) => { setDescription(val); handleInteraction(); }}
              placeholder="Describe your page content..."
            />

            <InputField
              label="Page URL"
              value={url}
              onChange={setUrl}
              placeholder="https://example.com/page"
            />
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Google Search Preview</span>
            </div>
            <div className="flex bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setView("desktop")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "desktop" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-600"}`}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "mobile" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-600"}`}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>
          </div>

          <div className="p-10 bg-slate-100 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[350px]">
             <div className={`bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200/60 dark:border-slate-800 p-8 transition-all duration-500 transform ${view === "mobile" ? "max-w-[360px] scale-100" : "w-full max-w-[650px]"}`}>
                <div className="space-y-2 overflow-hidden">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] border border-slate-200 dark:border-slate-700">Logo</div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#202124] dark:text-[#ebedef] font-normal truncate max-w-[200px]">{url}</span>
                      <span className="text-[10px] text-[#70757a] flex items-center gap-1 font-medium">https://smdevelopers.io <span className="rotate-90">›</span> tools</span>
                    </div>
                  </div>
                  <h4 className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-normal leading-tight decoration-1 underline-offset-2">
                    {title || "Enter a title tag..."}
                  </h4>
                  <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-relaxed font-normal">
                    {description || "Add a meta description to see how Google might show your page in search rankings."}
                  </p>
                </div>
              </div>
          </div>

          {/* Visibility Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${titlePixels > 580 ? "bg-rose-500" : "bg-emerald-500"}`} />
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Title Width</span>
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white">~{Math.round(titlePixels)}px</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Limit: 580px</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${descPixels > 920 ? "bg-rose-500" : "bg-emerald-500"}`} />
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Snippet Width</span>
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white">~{Math.round(descPixels)}px</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Limit: 920px</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
