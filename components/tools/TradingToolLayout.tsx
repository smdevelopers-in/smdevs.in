"use client";

import React from "react";
import { HelpCircle, TrendingUp } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface TradingToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  howToUse?: string[];
  formula?: string;
  tips?: string[];
  explanation?: React.ReactNode;
}

export default function TradingToolLayout({
  title,
  description,
  children,
  howToUse,
  formula,
  tips,
  explanation
}: TradingToolLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Tool Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                 <TrendingUp size={12} /> Trading Suite
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20 space-y-16">
        <Breadcrumbs 
          items={[
            { label: "Trading Tools", href: "/tools/trading" },
            { label: title }
          ]} 
        />

        {/* Tool Logic / Children */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
          {children}
        </div>

        {/* Formula/Logic Section (Merged into flow) */}
        {formula && (
          <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
             <div className="relative z-10 space-y-6">
                <h2 className="text-2xl font-black tracking-tight">Calculation Formula</h2>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm leading-relaxed text-blue-200 overflow-x-auto">
                  {formula}
                </div>
                <p className="text-xs text-white/40 font-medium italic">
                  Professional mathematical precision powered by SM Developers.
                </p>
             </div>
          </div>
        )}

        {/* Tips Section (Moved to Bottom) */}
        {tips && tips.length > 0 && (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
            <div className="flex items-center gap-4 mb-8 relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black italic">Strategy Tips</h2>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">Professional Trading Insights</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {tips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-blue-500 font-black">#0{index + 1}</span>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation Section (Moved to Bottom) */}
        {explanation && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <HelpCircle className="w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Trading Deep Dive</h2>
                      <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Mastering the Concept</p>
                   </div>
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium leading-[1.8] prose prose-slate dark:prose-invert max-w-none">
                   {explanation}
                </div>
             </div>
          </div>
        )}

        {/* Internal Feedback Form (Same as ToolLayout) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Help Us Improve This Tool</h2>
              <p className="text-slate-500 font-medium text-sm">Your feedback helps us improve accuracy and usability.</p>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input 
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Feedback Message</label>
              <textarea 
                rows={4}
                placeholder="Tell us what's on your mind..."
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
