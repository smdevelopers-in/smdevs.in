import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-8 pb-20 md:pt-12 md:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="section-padding text-center space-y-8 relative">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New Tools Added Weekly
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Powerful <span className="gradient-text">Free Tools</span> for SEO, Trading & <span className="gradient-text">Learning</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Access a growing suite of 18+ professional-grade utilities designed to simplify your workflow. From advanced SEO audits to precise trading calculators—completely free, always.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/tools/seo"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-primary/20 group"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-background border border-border font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Demo
          </Link>
        </div>

        {/* Stats / Proof */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-border/50 mt-16">
          {[
            { label: "Free Tools", value: "50+" },
            { label: "Active Users", value: "10k+" },
            { label: "Community", value: "5k+" },
            { label: "Rating", value: "4.9/5" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
