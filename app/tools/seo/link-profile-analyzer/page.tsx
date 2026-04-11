"use client";

import React, { useState } from "react";
import { 
  Link2, 
  Search, 
  Loader2, 
  ShieldAlert, 
  ExternalLink, 
  FolderTree, 
  ArrowRight,
  Target,
  FileText,
  Table,
  CheckCircle2,
  Info
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

interface LinkItem {
  href: string;
  text: string;
  type: "internal" | "external";
}

interface LinkResult {
  total: number;
  internal: number;
  external: number;
  links: LinkItem[];
}


const LINKPROFILEANALYZER_FAQS = [
  {
    question: "What is the free Link Profile Analyzer used for?",
    answer: "Our Link Profile Analyzer helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Link Profile Analyzer?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Link Profile Analyzer match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Link Profile Analyzer?",
    answer: "No installation is required! The Link Profile Analyzer is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Link Profile Analyzer?",
    answer: "For best results, we recommend using the Link Profile Analyzer whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function LinkProfileAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LinkResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeLinks = async () => {
    if (!url.startsWith("http")) {
      setError("Please include http:// or https://");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to analyze links.");
      setResult(data);
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Link Profile Analyzer"
      description="Deconstruct any webpage's link profile. Map internal architecture and discover outgoing external connections."
      toolType="SEO"
      howToUse={[
        "Enter the URL you wish to analyze in the search bar.",
        "Click 'Analyze Links' to perform a real-time extraction.",
        "View the distribution of internal vs external links.",
        "Examine the anchor text table for keyword optimization signals."
      ]}
      tips={[
        "Ensure your most important pages have the most internal links pointing to them.",
        "Avoid using 'naked URLs' or generic phrases like 'Click Here' as anchor text.",
        "Internal links should ideally represent 70-80% of your total link profile for better crawl efficiency.",
        "External links to high-authority, relevant sites act as 'citations' and improve your trustworthiness."
      ]}
      faqs={LINKPROFILEANALYZER_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            Links are the 'highways' of the internet. A Link Profile Audit reveals how a page distributes its authority (Link Juice) internally and where it references external knowledge.
          </p>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-200 dark:border-slate-700 mt-6">
             <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 italic">Why Analyze Links?</h4>
             <ul className="list-disc ml-4 space-y-2 text-xs text-slate-500 font-medium">
                <li>Identify 'Dead Ends' where authority stops flowing.</li>
                <li>Audit competitor's external resources and partners.</li>
                <li>Verify anchor text optimization for target keywords.</li>
             </ul>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto w-full">
           <div className="space-y-4">
            <div className="relative">
              <Link2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyzeLinks()}
                placeholder="https://example.com"
                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={analyzeLinks}
              disabled={loading || !url}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FolderTree className="w-5 h-5" />}
              Analyze Profile
            </button>
            {error && <p className="text-xs text-rose-500 font-bold text-center">{error}</p>}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             {/* Summary Stats */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                   <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{result.total}</div>
                   <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Links</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                   <div className="text-4xl font-black text-blue-600 mb-2">{result.internal}</div>
                   <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Internal (Site)</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                   <div className="text-4xl font-black text-indigo-600 mb-2">{result.external}</div>
                   <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">External (Outbound)</div>
                </div>
             </div>

             {/* Link Table */}
             <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Anchor Text Profile</h3>
                     <p className="text-sm text-slate-500 font-medium">Detailed extract of top 500 links found on page.</p>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Profiles Extracted</span>
                   </div>
                </div>
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
                        <tr className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                          <th className="px-8 py-4">Anchor Text</th>
                          <th className="px-8 py-4">Target URL</th>
                          <th className="px-8 py-4 text-center">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {result.links.map((link, i) => (
                          <tr key={i} className="text-xs hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-8 py-4 font-bold text-slate-900 dark:text-white max-w-[200px] truncate">{link.text}</td>
                            <td className="px-8 py-4">
                               <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 truncate max-w-[300px]">
                                 {link.href}
                                 <ExternalLink className="w-3 h-3 shrink-0" />
                               </a>
                            </td>
                            <td className="px-8 py-4">
                               <span className={`mx-auto block w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${link.type === 'internal' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                 {link.type}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* SEO Advice */}
             <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                <Target className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/10 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-2xl font-black mb-8 italic text-blue-400 tracking-tight">Optimizing your Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-400">
                        <ArrowRight className="w-4 h-4" /> Why External Links?
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Linking to high-authority external sources helps search engines understand your niche and proves you've researched your content. Aim for a 2-3 quality external links per 1000 words.</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-400">
                        <ArrowRight className="w-4 h-4" /> Anchor Text Matters
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Avoid generic text like 'Click Here'. Use descriptive keywords in your anchor text to tell crawlers exactly what the destination page is about.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
