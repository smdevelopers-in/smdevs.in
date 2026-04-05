"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  Search, 
  Loader2, 
  ShieldAlert, 
  TrendingUp, 
  Gauge, 
  Zap, 
  AlertTriangle,
  FileSearch,
  CheckCircle2
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

export default function KeywordVolumeEstimatorPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    volume: "Low" | "Medium" | "High";
    difficulty: number;
    competition: string;
    description: string;
  } | null>(null);

  const estimateVolume = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulation of heuristic analysis
    await new Promise(r => setTimeout(r, 1200));

    const words = keyword.split(" ").length;
    const len = keyword.length;
    
    // Heuristic logic
    let vol: "Low" | "Medium" | "High" = "Low";
    let diff = 10;
    
    if (len < 5) { vol = "High"; diff = 90; }
    else if (len < 10) { vol = "High"; diff = 75; }
    else if (words === 1) { vol = "High"; diff = 80; }
    else if (words === 2) { vol = "Medium"; diff = 50; }
    else if (words === 3) { vol = "Medium"; diff = 30; }
    else { vol = "Low"; diff = 15; }

    // Adjust based on specific high-volume patterns
    const highVolPatterns = ["buy", "best", "software", "review", "free", "how", "what", "near", "best", "cheap"];
    if (highVolPatterns.some(p => keyword.toLowerCase().includes(p))) {
       diff += 15;
    }

    setResult({
      volume: vol,
      difficulty: Math.min(diff, 100),
      competition: diff > 60 ? "Extremely High" : diff > 40 ? "Moderate" : "Low",
      description: diff > 60 
        ? "This keyword is highly generic and competitive. Ranking will require a high-authority domain and substantial backlink profile." 
        : diff > 30 
        ? "A solid mid-tail keyword. Achievable with quality content and focused on-page SEO." 
        : "A 'low-hanging fruit' opportunity. Great for quick wins and long-tail content strategy."
    });
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    setLoading(false);
  };

  const difficultyColor = (score: number) => {
    if (score > 60) return "text-rose-500";
    if (score > 30) return "text-amber-500";
    return "text-emerald-500";
  };

  return (
    <ToolLayout
      title="Keyword Volume Estimator"
      description="Get heuristic estimates of search volume and ranking difficulty using our automated pattern-matching engine."
      toolType="SEO"
      howToUse={[
        "Enter any phrase or keyword into the search bar.",
        "Click 'Estimate' to calculate potential search popularity.",
        "Review the Difficulty Score to understand how hard it is to rank.",
        "Use the actionable insights to decide if the keyword is worth targeting."
      ]}
      tips={[
        "Single-word keywords (Head terms) almost always have 'High' volume but 'High' difficulty.",
        "Aim for keywords with a difficulty score under 40 if your website is less than 1 year old.",
        "Volume is relative—a 'Low' volume keyword in a high-ticket niche (like Solar) is better than 'High' volume elsewhere.",
        "Difficulty accounts for 'Commercial Intent' markers like 'buy', 'best', and 'review'."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Traditional volume estimation requires expensive, locked-down APIs from Google or Bing. This tool uses a <strong>Linguistic Heuristic Engine</strong> to estimate popularity based on keyword length, word count, and intent signals.
          </p>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 mt-6">
             <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">How it works</h4>
             <p className="text-xs text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
               Lower word counts and shorter phrases typically correspond to higher generic search volume but extreme competitive pressure. Longer phrases (Long-tails) indicate specific intent and lower, more achievable competition.
             </p>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto w-full">
           <div className="space-y-4">
            <div className="relative">
              <BarChart3 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && estimateVolume()}
                placeholder="Enter search term..."
                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={estimateVolume}
              disabled={loading || !keyword}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
              Estimate Competition
            </button>
            <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest pt-2">
              <AlertTriangle className="w-3 h-3 inline mr-1 text-amber-500" /> Estimated values based on heuristic analysis
            </p>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={377} strokeDashoffset={377 - (377 * result.difficulty) / 100} className={`transition-all duration-1000 ${result.difficulty > 60 ? 'text-rose-500' : result.difficulty > 30 ? 'text-amber-500' : 'text-emerald-500'}`} strokeLinecap="round" />
                  </svg>
                  <span className={`absolute text-3xl font-black ${difficultyColor(result.difficulty)}`}>{result.difficulty}</span>
                </div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px] mb-1">Difficulty Score</h4>
                <p className="text-xs font-bold text-slate-500 italic">Scale: 0-100</p>
             </div>

             <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Volume</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${result.volume === 'High' ? 'bg-rose-100 text-rose-600' : result.volume === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {result.volume} VOLUME
                      </span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${result.volume === 'High' ? 'text-rose-500' : 'text-blue-500'}`} />
                      <span className="text-lg font-bold text-slate-900 dark:text-white">Estimated Competition: {result.competition}</span>
                   </div>
                </div>

                <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                   <Gauge className="absolute -bottom-6 -right-6 w-24 h-24 text-white/10 group-hover:rotate-12 transition-transform" />
                   <h3 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                     <FileSearch className="w-4 h-4" /> SEO Insights
                   </h3>
                   <p className="text-sm font-bold leading-relaxed opacity-90 italic">
                     "{result.description}"
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Understanding the Score</h3>
              <p className="text-sm text-slate-500 font-medium">How we estimate difficulty without expensive database APIs.</p>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Score Range</th>
                    <th className="px-8 py-4">Meaning</th>
                    <th className="px-8 py-4">Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { range: "0-30", mean: "Low Difficulty", strat: "Ideal for new websites. Content alone can rank here." },
                    { range: "31-60", mean: "Moderate", strat: "Requires focused SEO structure and 1-2 quality backlinks." },
                    { range: "61-100", mean: "High / Critical", strat: "Reserved for top domains. Requires significant PR and linking." },
                  ].map((row, i) => (
                    <tr key={i} className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                       <td className="px-8 py-6 font-mono font-bold text-blue-600">{row.range}</td>
                       <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{row.mean}</td>
                       <td className="px-8 py-6 text-slate-500 font-medium italic">{row.strat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
