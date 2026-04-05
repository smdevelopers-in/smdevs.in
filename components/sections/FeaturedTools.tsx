import { CheckCircle2, Code2, LineChart, FileJson, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    title: "Schema Validator",
    description: "Identify and fix structured data errors instantly to improve your search visibility and rich snippets.",
    icon: CheckCircle2,
    tag: "Essential",
    color: "bg-emerald-500",
  },
  {
    title: "SEO Analyzer",
    description: "Get a comprehensive audit of your webpage structure, heading hierarchy, and on-page SEO health.",
    icon: Zap,
    tag: "Premium",
    color: "bg-blue-600",
  },
  {
    title: "Pivot Calculator",
    description: "Generate accurate support and resistance levels for intraday and swing trading strategies.",
    icon: LineChart,
    tag: "Trader's Choice",
    color: "bg-indigo-500",
  },
];

export default function FeaturedTools() {
  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/50">
      <div className="section-padding space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
            <Zap className="w-4 h-4 fill-primary" /> Featured Utilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Our Most Popular Tools
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            These tools are used daily by thousands of developers to speed up their development and analysis workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOOLS.map((tool, index) => (
            <div
              key={index}
              className="glass p-8 rounded-[2rem] border border-border flex flex-col items-start gap-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-12 h-12 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${tool.color}`}>
                  {tool.tag}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <Link
                href="#"
                className="mt-auto w-full py-4 rounded-xl border border-primary/20 text-primary font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-primary/20"
              >
                Try Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
