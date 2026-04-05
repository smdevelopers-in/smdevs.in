import React from "react";
import { 
  BookOpen, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  MousePointer2, 
  ArrowRight,
  ChevronRight,
  Globe,
  Lock,
  Heart
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/tools/Breadcrumbs";

export const metadata = {
  title: "Documentation | SM Developers",
  description: "Learn how to use SM Developers' suite of free SEO, trading, and development tools. Detailed guides and 'how it works' section.",
};

const DOC_SECTIONS = [
  {
    title: "SEO Tools",
    icon: Search,
    description: "Our SEO suite uses advanced heuristic engines to analyze technical signals and content depth.",
    items: [
      { name: "Schema Generator", desc: "Creates JSON-LD markup by mapping user input to Schema.org standards." },
      { name: "SEO Structure Analyzer", desc: "Crawls the target URL to extract heading hierarchy, meta tags, and internal link distributions." },
      { name: "AI Content Detector", desc: "Uses linguistic pattern matching to identify machine-generated text styles." },
      { name: "Keyword Suggestion", desc: "Queries real-time search trends to find long-tail keyword opportunities." }
    ]
  },
  {
    title: "Trading Calculators",
    icon: TrendingUp,
    description: "Mathematical precision for market analysis, helping you manage risk and identify key price levels.",
    items: [
      { name: "Pivot Calculator", desc: "Calculates support and resistance levels using Standard, Woodie, and Camarilla formulas." },
      { name: "Position Sizer", desc: "Determines lot sizes by calculating risk relative to stop-loss distance and account equity." },
      { name: "Risk Reward", desc: "Visualizes potential profit vs potential loss to maintain a positive expectancy." },
      { name: "Break-even Calculator", desc: "Finds the exact price where a trade covers all entry/exit costs." }
    ]
  }
];

const STEPS = [
  {
    title: "Choose Your Tool",
    desc: "Browse our directory and select the utility that fits your current task.",
    icon: MousePointer2
  },
  {
    title: "Input Data",
    desc: "Enter your URL, keywords, or trading parameters into the simple input fields.",
    icon: Zap
  },
  {
    title: "Get Instant Results",
    desc: "Our high-performance backend processes your request and returns precise data in seconds.",
    icon: ArrowRight
  }
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 pt-32 pb-20">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden pb-16">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 mx-auto">
            <BookOpen className="w-3.5 h-3.5" /> Platform Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            How Everything <span className="gradient-text">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            A comprehensive guide to our free professional utilities. Designed for speed, precision, and zero friction.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Documentation" }]} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        
        {/* How It Works Section (Demo Anchor) */}
        <section id="how-it-works" className="space-y-16 scroll-mt-32">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">The Three-Step <span className="text-blue-600">Workflow</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">Our platform is built to be used immediately, without complex signups or learning curves.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <div key={i} className="relative group">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[100%] w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-10" />
                )}
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-all text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {DOC_SECTIONS.map((section) => (
            <div key={section.title} className="bg-white dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{section.title}</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {section.description}
              </p>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                       <ChevronRight className="w-4 h-4 text-blue-600" />
                       {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <Link 
                href={section.title.includes("SEO") ? "/tools/seo" : "/tools/trading"}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
              >
                Go to {section.title} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </section>

        {/* Philosophy Section */}
        <section className="bg-slate-900 dark:bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center space-y-12 relative overflow-hidden">
             {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />
            
            <div className="relative max-w-3xl mx-auto space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Our <span className="text-blue-400 dark:text-blue-100">Commitment</span> to You</h2>
               <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                  We believe professional utilities should be accessible to everyone. Our platform remains free through efficient server management and minimal overhead.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  {[
                    { title: "No Data Tracking", icon: Lock, desc: "We don't store your inputs or personal details." },
                    { title: "Global High Speed", icon: Globe, desc: "Edge functions ensure low latency worldwide." },
                    { title: "Zero Cost Forever", icon: Heart, desc: "Our core tools will never require a paid plan." },
                    { title: "Privacy First", icon: ShieldCheck, desc: "Fully GDPR compliant and privacy-respecting." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 text-left p-6 rounded-2xl bg-white/5 border border-white/10">
                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-white" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm">{item.title}</h4>
                          <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
        </section>

      </main>
    </div>
  );
}
