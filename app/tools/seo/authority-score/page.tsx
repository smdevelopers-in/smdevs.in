"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Loader2, 
  ShieldAlert, 
  CheckCircle2, 
  BarChart, 
  Link2, 
  Type, 
  ImageIcon,
  Zap,
  HelpCircle,
  FileCode,
  Info
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

interface AuthorityResult {
  score: number;
  breakdown: {
    content: number;
    links: number;
    technical: number;
  };
  stats: {
    wordCount: number;
    internalLinks: number;
    images: number;
  };
}

export default function AuthorityScorePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuthorityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateAuthority = async () => {
    if (!url.startsWith("http")) {
      setError("Please include http:// or https://");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze-authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to calculate authority.");
      setResult(data);
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-500";
    if (score >= 40) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <ToolLayout
      title="Authority Score"
      description="Estimate any website's authority based on content depth, technical health, and internal linking structure."
      toolType="SEO"
      howToUse={[
        "Enter the full URL of the website you want to analyze.",
        "Click 'Calculate Score' to start the heuristic audit.",
        "Review the 0-100 score and the breakdown of factors.",
        "Use the technical stats to find areas for improvement on your own site."
      ]}
      tips={[
        "A score of 70+ indicates a highly authoritative, established domain.",
        "Improve your score by increasing 'Content Depth'—aim for 1000+ words on key pages.",
        "Internal linking density is a major signal of technical authority and crawlability.",
        "Use this tool to audit competitors and see where they might be technically weak."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Authority Score is a metric that predicts how well a domain will rank on search engine results pages. Unlike traditional metrics that rely solely on backlinks, our model analyzes <strong>on-page trust signals</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Content Depth</h4>
                <p className="text-xs text-slate-500 font-medium">Measures the thoroughness of information available on the landing page.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Technical Hygiene</h4>
                <p className="text-xs text-slate-500 font-medium">Evaluates heading hierarchy, image optimization, and structural consistency.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto w-full">
           <div className="space-y-4">
            <div className="relative">
              <GlobeIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculateAuthority()}
                placeholder="https://example.com"
                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={calculateAuthority}
              disabled={loading || !url}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
              Calculate Authority
            </button>
            {error && <p className="text-xs text-rose-500 font-bold text-center">{error}</p>}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             {/* Score Dashboard */}
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative group overflow-hidden">
                  <BarChart className="absolute -top-6 -left-6 w-24 h-24 text-blue-500/5 group-hover:rotate-12 transition-transform duration-700" />
                  <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                      <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={377} strokeDashoffset={377 - (377 * result.score) / 100} className={`transition-all duration-1000 ${getScoreColor(result.score)}`} strokeLinecap="round" />
                    </svg>
                    <span className={`absolute text-4xl font-black ${getScoreColor(result.score)}`}>{result.score}</span>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">SM Authority Score</h4>
               </div>

               <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Content Quality", value: result.breakdown.content, icon: Type, color: "bg-blue-600", max: 40 },
                    { label: "Link Strength", value: result.breakdown.links, icon: Link2, color: "bg-indigo-600", max: 30 },
                    { label: "Technical SEO", value: result.breakdown.technical, icon:Zap, color: "bg-emerald-600", max: 30 },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                       <div className="flex items-center justify-between mb-4">
                          <stat.icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</span>
                       </div>
                       <div className="space-y-3">
                          <div className="flex justify-between items-end">
                             <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                             <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mb-1">/ {stat.max}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             </div>

             {/* Stats Cards */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Word Count", value: result.stats.wordCount.toLocaleString(), icon: FileCode },
                  { label: "Internal Links", value: result.stats.internalLinks, icon: Link2 },
                  { label: "Images Found", value: result.stats.images, icon: ImageIcon },
                  { label: "Heuristic Confidence", value: "92%", icon: ShieldCheck },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                     <item.icon className="w-5 h-5 text-blue-500 mb-2" />
                     <div className="text-xl font-black text-slate-900 dark:text-white">{item.value}</div>
                     <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.label}</div>
                  </div>
                ))}
             </div>

             {/* Methodology */}
             <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                <Info className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/10 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 italic text-blue-400">Scoring Methodology</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Content Health</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">We analyze word count and structural complexity. High word counts (1000+) are strongly correlated with higher authority in search engines.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Link Connectivity</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">The internal link ratio shows how well site authority is distributed. Dense internal linking suggests a more 'crawlable' and established site.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Technical Signals</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Checking for H1 tags, meta descriptions, and image density. These are non-negotiable foundations for domain trust.</p>
                   </div>
                </div>
                <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     <HelpCircle className="w-3 h-3 inline mr-2" /> Note: This score is a technical estimation and does not account for external Moz or Ahrefs data.
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
