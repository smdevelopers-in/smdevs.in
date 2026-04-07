"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight,
  HelpCircle,
  Plus,
  Minus,
  Calculator,
  ArrowUpRight,
  Target,
  Zap
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";

const TRADING_TOOLS = [
  {
    title: "Pivot Calculator",
    description: "Generate accurate support and resistance levels for intraday and swing trading strategies using Standard, Woodie, and Camarilla methods.",
    icon: BarChart3,
    href: "/tools/trading/pivot-calculator",
    isFeatured: true,
    tag: "Most Popular"
  },
  {
    title: "Position Size Calculator",
    description: "Calculate the exact number of units or lots to trade based on your risk percentage and stop-loss distance.",
    icon: Target,
    href: "/tools/trading/position-size",
    isFeatured: false
  },
  {
    title: "Risk Reward Calculator",
    description: "Determine your potential profit against your potential loss to maintain a positive expectancy in your trading plan.",
    icon: ShieldCheck,
    href: "/tools/trading/risk-reward",
    isFeatured: false
  },
  {
    title: "Profit/Loss Calculator",
    description: "Instantly calculate your net profit or loss after accounting for entry/exit prices and position size.",
    icon: TrendingUp,
    href: "/tools/trading/profit-loss",
    isFeatured: false
  },
  {
    title: "Break-even Calculator",
    description: "Find the exact price point where your trade covers all costs including spreads and commissions.",
    icon: Calculator,
    href: "/tools/trading/break-even",
    isFeatured: false
  }
];

const FAQS = [
  {
    question: "What is a pivot calculator?",
    answer: "A pivot calculator is a tool used by traders to determine potential support and resistance levels. It uses the previous day's high, low, and closing prices to calculate levels where price action might react or reverse."
  },
  {
    question: "Are these tools accurate?",
    answer: "Yes. Our calculators use standardized financial formulas used by professional traders worldwide. However, they are for informational purposes and should be used as part of a comprehensive trading strategy."
  },
  {
    question: "Can beginners use these tools?",
    answer: "Absolutely. We've designed each tool with a clean interface and simple inputs. You don't need complex math skills—our calculators handle the heavy lifting for you."
  },
  {
    question: "Are these tools free?",
    answer: "Yes, all our trading calculators and tools on SM Developers are 100% free to use, with no registration or hidden fees required."
  }
];export default function TradingToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Directory Header (Mirrors SEO Hub) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Professional <span className="gradient-text">Trading Tools</span> for Everyone
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Manage risk, identify key levels, and optimize your trade execution with our suite of free, high-performance trading calculators.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Web Tools", href: "/#web-tools" }, { label: "Trading Tools" }]} />
        </div>
      </div>

      {/* Tools Grid Area */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Trading Calculators Section */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 underline decoration-blue-600/30 underline-offset-8">Market <span className="gradient-text">Calculators</span></h2>
              <p className="text-sm text-slate-500 font-medium">Mathematical precision for every trade entry and exit.</p>
            </div>
            <div className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
              Verified Formulas • No Latency
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRADING_TOOLS.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>

        {/* Why Use These Section (Professional Cleanup) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800">
           {[
             { title: "Risk Management", desc: "Protect your capital with scientific position sizing and risk/reward ratios.", icon: ShieldCheck },
             { title: "Technical Precision", desc: "Identify key supply and demand zones using multiple pivot calculation methods.", icon: Target },
             { title: "Efficiency", desc: "Instant outputs to help you keep up with fast-moving market opportunities.", icon: Zap }
           ].map((benefit, i) => (
             <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                   <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                   {benefit.desc}
                </p>
             </div>
           ))}
        </section>
      </main>
    </div>
  );
}

function ToolCard({ tool }: { tool: any }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
        {tool.title}
        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
        {tool.description}
      </p>
      
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 font-bold text-sm flex items-center justify-between text-slate-400 group-hover:text-blue-600">
        <span>Open Calculator</span>
        {tool.tag && <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md uppercase tracking-widest">{tool.tag}</span>}
      </div>
    </Link>
  );
}
