import Link from "next/link";
import { ArrowRight, BarChart3, TrendingUp, Shield, Calculator, Scale, Target, Zap, LineChart, PiggyBank } from "lucide-react";

const ALL_TRADING_TOOLS = [
  {
    title: "Stock Analyzer",
    description: "Analyze stocks with live data, technical indicators, and beginner-friendly explanations.",
    href: "/tools/trading/stock-analyzer",
    icon: BarChart3,
    color: "blue",
  },
  {
    title: "Risk Reward Calculator",
    description: "Calculate risk/reward ratio, profit potential, and loss exposure before entering a trade.",
    href: "/tools/trading/risk-reward",
    icon: Scale,
    color: "rose",
  },
  {
    title: "Position Size Calculator",
    description: "Determine ideal trade quantity based on capital, risk percentage, and stop loss distance.",
    href: "/tools/trading/position-size",
    icon: Target,
    color: "emerald",
  },
  {
    title: "Intrinsic Value Calculator",
    description: "Estimate fair value using earnings growth assumptions and margin of safety analysis.",
    href: "/tools/trading/intrinsic-value",
    icon: TrendingUp,
    color: "indigo",
  },
  {
    title: "Option Profit Calculator",
    description: "Calculate option profit, loss, breakeven, ROI, and payoff instantly for calls and puts.",
    href: "/tools/trading/option-profit",
    icon: LineChart,
    color: "violet",
  },
  {
    title: "Pivot Calculator",
    description: "Generate support and resistance levels using Standard, Woodie, and Camarilla methods.",
    href: "/tools/trading/pivot-calculator",
    icon: Zap,
    color: "amber",
  },
  {
    title: "Break-even Calculator",
    description: "Find the exact price point where your trade covers all costs including spreads and commissions.",
    href: "/tools/trading/break-even",
    icon: Calculator,
    color: "teal",
  },
  {
    title: "Profit/Loss Calculator",
    description: "Instantly calculate your net profit or loss after accounting for entry/exit prices and position size.",
    href: "/tools/trading/profit-loss",
    icon: Shield,
    color: "slate",
  },
  {
    title: "SIP Calculator",
    description: "Calculate SIP returns with optional annual step-up. See year-by-year corpus growth and maturity value.",
    href: "/tools/trading/sip-calculator",
    icon: PiggyBank,
    color: "indigo",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-900/20",   text: "text-blue-600 dark:text-blue-400",   border: "border-blue-100 dark:border-blue-900/40" },
  rose:   { bg: "bg-rose-50 dark:bg-rose-900/20",   text: "text-rose-600 dark:text-rose-400",   border: "border-rose-100 dark:border-rose-900/40" },
  emerald:{ bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-900/40" },
  indigo: { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-100 dark:border-indigo-900/40" },
  violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", border: "border-violet-100 dark:border-violet-900/40" },
  amber:  { bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-600 dark:text-amber-400",  border: "border-amber-100 dark:border-amber-900/40" },
  teal:   { bg: "bg-teal-50 dark:bg-teal-900/20",   text: "text-teal-600 dark:text-teal-400",   border: "border-teal-100 dark:border-teal-900/40" },
  slate:  { bg: "bg-slate-50 dark:bg-slate-800/50", text: "text-slate-600 dark:text-slate-400", border: "border-slate-100 dark:border-slate-700" },
};

interface RelatedTradingToolsProps {
  /** Hrefs of tools to EXCLUDE from the related list (i.e., the current page) */
  exclude?: string[];
  /** Max number of tools to show. Defaults to 4. */
  limit?: number;
}

export default function RelatedTradingTools({ exclude = [], limit = 4 }: RelatedTradingToolsProps) {
  const shown = ALL_TRADING_TOOLS.filter((t) => !exclude.includes(t.href)).slice(0, limit);

  if (shown.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Related Trading Tools</h2>
          <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            More tools to sharpen your edge
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {shown.map((tool) => {
          const Icon = tool.icon;
          const colors = COLOR_MAP[tool.color] ?? COLOR_MAP.slate;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center justify-between">
                  {tool.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
