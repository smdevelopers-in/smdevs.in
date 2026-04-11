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
import FAQSection from "@/components/tools/FAQSection";
import { Search } from "lucide-react";

const TRADING_INDEX_FAQS = [
  {
    question: "Do I need to connect my broker to use these tools?",
    answer: "No, all our trading tools are fully standalone. You simply input your entry, stop-loss, and capital parameters. We never require broker connections or API keys, ensuring 100% security for your capital."
  },
  {
    question: "Are these calculators suited for crypto or stock trading?",
    answer: "Both! The mathematical logic behind Risk-Reward, Position Sizing, and Pivot Points applies universally to Crypto, Forex, Options, and Equities."
  },
  {
    question: "Is my financial data stored?",
    answer: "No. All calculations are performed instantly in your browser (client-side). We do not track, store, or transmit your account sizes or trading setups to our servers."
  },
  {
    question: "Are these tools free?",
    answer: "Yes, our entire suite of Trading Utilities is completely free. Our goal is to empower traders with institutional-grade risk management tools without premium subscriptions."
  }
];

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
];

export default function TradingToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = TRADING_TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          <div className="max-w-xl mx-auto pt-8">
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tools (e.g., Pivot, Position Size)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xl shadow-slate-200/20 dark:shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Web Tools", href: "/#web-tools" }, { label: "Trading Tools" }]} />
        </div>
      </div>

      {/* Tools Grid Area */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Trading Calculators Section */}
        {searchQuery ? (
          <section className="space-y-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Search Results</h2>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.title} tool={tool} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 font-medium">No tools found matching "{searchQuery}"</p>
            )}
          </section>
        ) : (
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
        )}

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

        <FAQSection faqs={TRADING_INDEX_FAQS} />
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
      
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 font-bold text-sm flex items-center justify-between text-slate-500 dark:text-slate-400 group-hover:text-blue-600">
        <span>Open Calculator</span>
        {tool.tag && <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-md uppercase tracking-widest">{tool.tag}</span>}
      </div>
    </Link>
  );
}
