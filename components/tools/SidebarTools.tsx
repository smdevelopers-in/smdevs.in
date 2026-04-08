import Link from "next/link";
import { Zap, Search, Target, LineChart, Code, ArrowRight } from "lucide-react";

interface SidebarToolsProps {
  category: string;
}

const TOOLS_BY_CATEGORY: Record<string, any[]> = {
  "SEO": [
    { title: "Schema Generator", desc: "Build exact JSON-LD schemas.", href: "/tools/seo/schema-generator", icon: Search, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "SEO Analyzer", desc: "Audit your on-page SEO health.", href: "/tools/seo/analyze-seo", icon: Zap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  ],
  "Trading": [
    { title: "Position Size Calculator", desc: "Calculate exact units to trade.", href: "/tools/trading/position-size", icon: Target, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { title: "Pivot Points", desc: "Intraday support/resistance.", href: "/tools/trading/pivot-points", icon: LineChart, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  ],
  "Development": [
    { title: "JSON Formatter", desc: "Format and validate JSON.", href: "/tools/dev/json-formatter", icon: Code, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  ],
  "General": []
};

// Fallback to SEO tools if category is General or not found
export default function SidebarTools({ category }: SidebarToolsProps) {
  let tools = TOOLS_BY_CATEGORY[category];
  if (!tools || tools.length === 0) {
    tools = TOOLS_BY_CATEGORY["SEO"];
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem]">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <Zap size={16} className="text-amber-500" /> Featured Tools
      </h3>
      <div className="space-y-4">
        {tools.map((tool, i) => (
          <Link 
            key={i} 
            href={tool.href}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group shadow-sm hover:shadow-md"
          >
            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${tool.bg} ${tool.color}`}>
              <tool.icon size={20} />
            </div>
            <div className="space-y-1">
               <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                 {tool.title}
               </h4>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                 {tool.desc}
               </p>
            </div>
          </Link>
        ))}
        
        <Link 
          href={category.toLowerCase() === "trading" ? "/tools/trading" : category.toLowerCase() === "seo" ? "/tools/seo" : "/tools"} 
          className="block w-full py-3 text-center text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors bg-white dark:bg-slate-800 rounded-xl"
        >
          View All {category !== "General" ? category : ""} Tools
        </Link>
      </div>
    </div>
  );
}
