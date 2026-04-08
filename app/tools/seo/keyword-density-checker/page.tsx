"use client";

import React, { useState } from "react";
import { Search, Info, Award, BarChart3, ListFilter, Trash2 } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

interface KeywordFreq {
  word: string;
  count: number;
  density: number;
}

export default function KeywordDensityPage() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<KeywordFreq[]>([]);
  const [totalWords, setTotalWords] = useState(0);

  const analyzeDensity = () => {
    if (!text.trim()) return;

    // Clean text: lowercase and remove punctuation
    const cleanText = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    const words = cleanText.split(" ").filter(w => w.length > 2); // Filter out tiny words
    
    setTotalWords(words.length);

    const freq: Record<string, number> = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const densityArray: KeywordFreq[] = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / words.length) * 100
      }))
      .sort((a, b) => b.count - a.count);

    setResults(densityArray.slice(0, 20)); // Keep top 20
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  const clear = () => {
    setText("");
    setResults([]);
    setTotalWords(0);
  };

  return (
    <ToolLayout
      title="Keyword Density Checker"
      description="Analyze your content to find the most frequent words and their density percentage. Avoid keyword stuffing and optimize for SEO."
      toolType="SEO"
      howToUse={[
        "Paste your content into the large text area.",
        "Click 'Analyze Content' to process the text.",
        "Review the table to see keyword frequencies and density percentages.",
        "Adjust your content to maintain an optimal 1-2% density for target keywords."
      ]}
      tips={[
        "Aim for a keyword density of 1-2% for your primary target phrase.",
        "Check your 'Stop Words' density; if words like 'the' or 'and' are too high, your content might be wordy.",
        "Use synonyms (LSI keywords) instead of repeating the same word to improve readability and SEO.",
        "Avoid 'Keyword Stuffing' (over 3% density), as it can lead to search engine penalties."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Keyword Density measures how often a specific word or phrase appears within a piece of content compared to the total number of words. It is a fundamental signal used by search engines to determine the <strong>topic and relevance</strong> of a page.
          </p>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 mt-6">
             <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Modern SEO Context</h4>
             <p className="text-xs text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
               While keyword density was once a primary ranking factor, modern search engines like Google now prioritize <strong>Natural Language Processing (NLP)</strong>. This means you should focus on writing for humans first, while using this tool to ensure your main topics are clearly emphasized without being repetitive.
             </p>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Content to Analyze</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article or webpage content here..."
            className="w-full h-80 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl text-slate-900 dark:text-white font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none resize-none mb-6"
          />
          <div className="flex gap-4">
            <button
              onClick={analyzeDensity}
              className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              <BarChart3 className="w-5 h-5" />
              Analyze Content
            </button>
            <button
              onClick={clear}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Summary */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <ListFilter className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Total Words (3+ chars)</h4>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{totalWords}</p>
                  </div>
                </div>
                <div className="bg-blue-600 p-8 rounded-[2rem] shadow-xl shadow-blue-500/20 flex items-center gap-6 text-white">
                   <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1">Top Keyword</h4>
                    <p className="text-3xl font-black">{results[0].word}</p>
                  </div>
                </div>
             </div>

             {/* Results Table */}
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Keyword</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Count</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Density %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {results.map((kw, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900 dark:text-white capitalize">{kw.word}</td>
                          <td className="px-8 py-4 text-center font-mono text-slate-600 dark:text-slate-400">{kw.count}</td>
                          <td className="px-8 py-4 text-right overflow-hidden">
                            <div className="flex items-center justify-end gap-3">
                              <span className={`text-sm font-black ${kw.density > 3 ? "text-rose-500" : kw.density >= 1 ? "text-emerald-500" : "text-amber-500"}`}>
                                {kw.density.toFixed(2)}%
                              </span>
                              <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-1000 ${kw.density > 3 ? "bg-rose-500" : kw.density >= 1 ? "bg-emerald-500" : "bg-amber-500"}`} 
                                  style={{ width: `${Math.min(kw.density * 20, 100)}%` }} 
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>

             {/* Explanation Box */}
             <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-800 flex gap-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-blue-900 dark:text-blue-300 font-bold">What is Keyword Density?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                    Keyword density tells you how often a specific word appears relative to the total word count. While there's no magic number, maintaining a <strong>1% to 2% density</strong> for target keywords is generally considered optimal. Over-optimizing (stuffing) can lead to search engine penalties.
                  </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
