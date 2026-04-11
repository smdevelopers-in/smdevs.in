"use client";

import React from "react";
import { TrendingUp, Sparkles, Zap, Shield, LineChart, ArrowRight, Target, BarChart3 } from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import Link from "next/link";
import FAQSection from "@/components/tools/FAQSection";


const TRADINGMOBILEAPP_FAQS = [
  {
    question: "What features are included in the Trading Mobile App?",
    answer: "The Trading Mobile App brings all our powerful desktop utilities directly to your mobile device. Enjoy real-time monitoring, instant calculations, and advanced analytics from anywhere in the world."
  },
  {
    question: "Is the Trading Mobile App free to download?",
    answer: "Yes, you can download and install the Trading Mobile App completely free of charge. We believe in providing premium-grade tools accessible to everyone."
  },
  {
    question: "Does the Trading Mobile App require an internet connection?",
    answer: "While basic functionalities work offline, you will need an active internet connection to access live market data, real-time SEO audits, and cloud synchronization features."
  },
  {
    question: "Is my data secure on the Trading Mobile App?",
    answer: "Data privacy is our top priority. The Trading Mobile App processes most of your queries locally on your device, ensuring maximum security and zero unwanted tracking."
  }
];

export default function TradingAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 font-bold text-xs uppercase tracking-widest animate-fade-in mx-auto">
             <TrendingUp size={14} /> Smart Trading
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Advanced Market <span className="text-emerald-600">Calculators.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            The ultimate companion for modern traders. Position sizing, risk management, and pivot levels tailored for your mobile screen.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              href="https://groups.google.com/g/od2-testers"
              target="_blank"
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Early Access <ArrowRight size={18} />
            </Link>
            <Link href="/tools/trading" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 transition-all">
              Calculators Web
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Trading Tools", href: "/tools/trading" }, { label: "Trading Tools" }]} />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Trading Tools Section (New Section from Screenshot) */}
        <section className="space-y-12 pt-20 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Trading <span className="text-blue-600">Tools</span>
              </h2>
              <p className="text-slate-500 font-medium">Heuristic engines for deep market analysis and risk intelligence.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black text-blue-600 uppercase tracking-widest">
              PRO MOBILE APP • HIGH PRECISION
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 max-w-lg">
            {[
              { 
                icon: Target, 
                title: "Trading Tools", 
                desc: "Install it now... and try our trading calculator app",
                color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
                href: "https://play.google.com/store/apps/details?id=in.od2.app.sm.trading_tools"
              }
            ].map((tool, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all text-left"
              >
                <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium mb-10">
                  {tool.desc}
                </p>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link 
                    href={tool.href}
                    target="_blank"
                    className="text-blue-600 font-black text-base flex items-center gap-2 group/btn"
                  >
                    Install Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[12px] font-black px-3 py-1 bg-blue-600 text-white rounded-md uppercase tracking-widest">Live NoW</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQSection faqs={TRADINGMOBILEAPP_FAQS} />
      </div>
    </div>
  );
}
