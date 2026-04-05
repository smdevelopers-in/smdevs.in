"use client";

import React from "react";
import { TrendingUp, Sparkles, Zap, Shield, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TradingAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 font-bold text-xs uppercase tracking-widest animate-fade-in">
             <TrendingUp size={14} /> Smart Trading
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Advanced Market <span className="text-emerald-600">Calculators.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            The ultimate companion for modern traders. Position sizing, risk management, and pivot levels tailored for your mobile screen.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
              Get Early Access <ArrowRight size={18} />
            </button>
            <Link href="/tools/trading" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 transition-all">
              Calculators Web
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { icon: LineChart, title: "Precision Math", desc: "100% accurate financial formulas for risk, reward, and pivot levels." },
            { icon: Zap, title: "Instant Execution", desc: "Lightning fast calculations designed for high-stakes environments." },
            { icon: Shield, title: "Data Privacy", desc: "Your capital and strategy data stays private and never leaves your device." }
          ].map((f, i) => (
            <div key={i} className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{f.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Development Status */}
        <div className="p-12 rounded-[3.5rem] bg-emerald-600 text-white relative overflow-hidden text-center space-y-6 shadow-2xl shadow-emerald-500/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32" />
           <Sparkles className="mx-auto w-12 h-12 animate-pulse fill-white" />
           <h2 className="text-3xl font-black leading-tight">Launching Q3 2026</h2>
           <p className="text-emerald-100 font-medium max-w-2xl mx-auto">
             Our mobile trading suite is currently in private beta. 
             Stay tuned for the most intuitive financial tools ever built for mobile.
           </p>
        </div>
      </div>
    </div>
  );
}
