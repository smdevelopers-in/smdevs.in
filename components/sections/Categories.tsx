import { Search, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "SEO Tools",
    description: "Boost your search rankings with our advanced Schema Validator, SEO Analyzer, and meta-tag generators designed for modern web standards.",
    icon: Search,
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-600",
    href: "/tools/seo",
  },
  {
    title: "Trading Tools",
    description: "Make smarter financial decisions using our precise Pivot Calculators, risk management tools, and real-time market analysis utilities.",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-600",
    href: "/tools/trading",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="section-padding space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Powerful Tools by Category
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              From SEO to trading, we offer a specialized set of tools designed for precision and speed.
            </p>
          </div>
          <Link href="/tools/seo" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
            View All Tools
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className={`group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-transparent transition-all duration-500 relative overflow-hidden`}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 ${cat.iconColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  EXPLORE TOOLS <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
