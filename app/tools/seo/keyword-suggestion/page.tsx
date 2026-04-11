"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  HelpCircle, 
  Loader2, 
  CheckCircle, 
  Copy,
  Hash,
  MessageCircle,
  TrendingUp,
  Brain,
  Zap
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";


const KEYWORDSUGGESTION_FAQS = [
  {
    question: "What is the free Keyword Suggestion used for?",
    answer: "Our Keyword Suggestion helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Keyword Suggestion?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Keyword Suggestion match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Keyword Suggestion?",
    answer: "No installation is required! The Keyword Suggestion is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Keyword Suggestion?",
    answer: "For best results, we recommend using the Keyword Suggestion whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function KeywordSuggestionPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ 
    questions: string[]; 
    longTail: string[]; 
    comparisons: string[]; 
  } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const generateSuggestions = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`/api/keyword-suggestions?q=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      const all = data.suggestions || [];
      
      // Filter into groups
      const questions = all.filter((s: string) => /^(how|what|why|when|where|who|is|can|do|does)/i.test(s));
      const comparisons = all.filter((s: string) => /(vs|versus|or|and|better|best|alternative)/i.test(s));
      const longTail = all.filter((s: string) => !questions.includes(s) && !comparisons.includes(s));

      setResults({ questions, longTail, comparisons });
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      title="Keyword Suggestion Tool"
      description="Generate hundreds of long-tail, question-based, and comparison keywords to fuel your content strategy."
      toolType="SEO"
      howToUse={[
        "Enter a seed keyword (e.g., 'nextjs' or 'coffee')",
        "Click 'Generate Suggestions' to fetch real-world variations",
        "Explore grouped results: Questions, Comparisons, and Long-tail",
        "Click any keyword to copy it to your clipboard"
      ]}
      tips={[
        "Focus on 'Question' keywords to build high-traffic blog posts and FAQ sections.",
        "Long-tail keywords often have lower competition and higher conversion rates than broad terms.",
        "Use 'Comparison' keywords (vs, alternatives) for late-stage buyers who are ready to purchase.",
        "Combine these suggestions with your own research for the best topical coverage."
      ]}
      faqs={KEYWORDSUGGESTION_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            Keyword research is the process of finding and analyzing search terms that people enter into search engines. This tool uses a predictive alphanumeric expansion algorithm to simulate high-intent search variations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Long-Tail Strategy</h4>
                <p className="text-xs text-slate-500 font-medium">Capture specific intent and lower competition by targeting 3+ word phrases.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Topical Authority</h4>
                <p className="text-xs text-slate-500 font-medium">Covering all related questions for a keyword signals to Google that you are an expert.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto w-full">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateSuggestions()}
                placeholder="Enter a keyword..."
                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={generateSuggestions}
              disabled={loading || !keyword}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              Generate Suggestions
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Questions Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Questions</h3>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Informational Intent</p>
                </div>
              </div>
              <div className="space-y-3">
                {results.questions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => copyToClipboard(s)}
                    className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-transparent hover:border-amber-200 dark:hover:border-amber-900 transition-all group flex items-center justify-between"
                  >
                    <span className="truncate">{s}</span>
                    {copied === s ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 dark:text-slate-400 shrink-0" />}
                  </button>
                ))}
                {results.questions.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">No question-based suggestions found.</p>}
              </div>
            </div>

            {/* Comparisons Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Comparisons</h3>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Transactional Intent</p>
                </div>
              </div>
              <div className="space-y-3">
                {results.comparisons.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => copyToClipboard(s)}
                    className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group flex items-center justify-between"
                  >
                    <span className="truncate">{s}</span>
                    {copied === s ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 dark:text-slate-400 shrink-0" />}
                  </button>
                ))}
                {results.comparisons.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">No comparison-based suggestions found.</p>}
              </div>
            </div>

            {/* Long-tail Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm h-fit shadow-xl shadow-blue-500/5 ring-1 ring-blue-50 dark:ring-blue-900/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white italic">AI Suggestions</h3>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-blue-100">Broad Intent</p>
                </div>
              </div>
              <div className="space-y-3">
                {results.longTail.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => copyToClipboard(s)}
                    className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all group flex items-center justify-between"
                  >
                    <span className="truncate">{s}</span>
                    {copied === s ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 dark:text-slate-400 shrink-0" />}
                  </button>
                ))}
                {results.longTail.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">No long-tail suggestions found.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="max-w-4xl mx-auto p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group">
          <TrendingUp className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/10 group-hover:rotate-12 transition-transform duration-700" />
          <h3 className="text-2xl font-black mb-6 italic tracking-tight">Mastering Intent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                <h4 className="font-bold text-blue-400 text-sm mb-1 uppercase tracking-widest">Informational</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Use 'Questions' to fuel your blog and FAQ sections. High traffic, low conversion but builds authority.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors">
                <h4 className="font-bold text-indigo-400 text-sm mb-1 uppercase tracking-widest">Transactional</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Use 'Comparisons' for product pages and reviews. Lower traffic, but highly qualified leads.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm italic font-medium leading-relaxed">
                "Finding the right keyword isn't about search volume—it's about matching what the user is thinking at that exact moment. Use long-tail variations to capture 'hidden' traffic competitors often miss."
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
