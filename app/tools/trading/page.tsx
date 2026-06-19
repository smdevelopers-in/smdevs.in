"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Calculator,
  Target,
  Zap,
  LineChart,
  Scale,
  BookOpen
} from "lucide-react";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import FAQSection from "@/components/tools/FAQSection";
import { Search } from "lucide-react";

const TRADING_INDEX_FAQS = [
  {
    question: "Do I need to connect my broker to use these tools?",
    answer: "No, all our trading tools are fully standalone. You simply input your parameters manually. We never require broker connections or API keys, ensuring 100% security for your account details."
  },
  {
    question: "Are these calculators suited for crypto or stock trading?",
    answer: "Both! The mathematical logic behind Risk-Reward, Position Sizing, and Pivot Points applies universally to Crypto, Forex, Options, and Equities. The Stock Analyzer works specifically with stock symbols from Yahoo Finance."
  },
  {
    question: "Is my financial data stored?",
    answer: "No. All calculations are performed instantly in your browser (client-side). We do not track, store, or transmit your account sizes or trading setups to our servers."
  },
  {
    question: "Are these tools free?",
    answer: "Yes, our entire suite of Trading Tools is completely free. Our goal is to empower traders with professional-grade tools without premium subscriptions."
  },
  {
    question: "How does the Stock Analyzer fetch data?",
    answer: "The Stock Analyzer uses Yahoo Finance's public API to fetch delayed market data on demand. Simply enter a ticker symbol (e.g., AAPL, RELIANCE.NS) and click Analyze. No API key or account required."
  },
  {
    question: "What is the Intrinsic Value Calculator based on?",
    answer: "Our Intrinsic Value Calculator uses a simplified Discounted Cash Flow (DCF) model. You input the current EPS, expected growth rate, discount rate, and projection years to estimate a stock's fair value and margin of safety."
  },
  {
    question: "Can I use the Option Profit Calculator for Indian markets?",
    answer: "Yes. Enter the strike price in rupees, your lot size (e.g., 75 for Nifty), and the premium paid. The calculator will show your total net payoff, breakeven price, and ROI% based on the expected expiry price."
  }
];


const TRADING_TOOLS = [
  {
    title: "Stock Analyzer",
    description: "Analyze any stock instantly with live price data, P/E ratio, EPS, technical indicators (SMA, RSI, MACD), support & resistance levels, and plain-English explanations.",
    icon: BarChart3,
    href: "/tools/trading/stock-analyzer",
    isFeatured: true,
    tag: "New"
  },
  {
    title: "Intrinsic Value Calculator",
    description: "Estimate a stock's fair value using a DCF-based model. Input EPS, growth rate, and discount rate to see if a stock is undervalued, fairly valued, or overvalued.",
    icon: BookOpen,
    href: "/tools/trading/intrinsic-value",
    isFeatured: true,
    tag: "New"
  },
  {
    title: "Option Profit Calculator",
    description: "Calculate profit, loss, breakeven, ROI%, and net payoff for call and put options. Includes an interactive payoff diagram to visualise your risk before entering.",
    icon: LineChart,
    href: "/tools/trading/option-profit",
    isFeatured: false,
    tag: "New"
  },
  {
    title: "Pivot Calculator",
    description: "Generate accurate support and resistance levels for intraday and swing trading strategies using Standard, Woodie, and Camarilla methods.",
    icon: BarChart3,
    href: "/tools/trading/pivot-calculator",
    isFeatured: false,
    tag: "Popular"
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
    icon: Scale,
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

        {/* Why Use These Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800">
           {[
             { title: "Risk Management", desc: "Protect your capital with scientific position sizing, risk/reward ratios, and break-even analysis before every trade.", icon: ShieldCheck },
             { title: "Stock Intelligence", desc: "Analyze stocks with live data, technical indicators, valuation metrics, and support/resistance levels — all in one place.", icon: BarChart3 },
             { title: "Instant Results", desc: "All calculations happen in your browser — no login, no lag, no data sharing. Professional tools at zero cost.", icon: Zap }
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
