"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import { Info, LayoutGrid, Scale } from "lucide-react";

export default function RiskRewardCalculatorPage() {
  const [entry, setEntry] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateRR = () => {
    const e = parseFloat(entry);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(target);

    if (isNaN(e) || isNaN(sl) || isNaN(tp)) {
      setResults(null);
      return;
    }

    const risk = Math.abs(e - sl);
    const reward = Math.abs(tp - e);
    const ratio = reward / risk;

    setResults({ risk, reward, ratio });
  };

  const handleCalculate = () => {
    calculateRR();
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  const validateNumericInput = (val: string) => {
    if (val === "") return "";
    // Allow only up to 6 digits before decimal and up to 3 digits after decimal
    const regex = /^\d{0,6}(\.\d{0,3})?$/;
    if (regex.test(val)) return val;
    return null;
  };

  const handleInputChange = (field: string, val: string) => {
    const validated = validateNumericInput(val);
    if (validated !== null) {
      if (field === "entry") setEntry(validated);
      else if (field === "stopLoss") setStopLoss(validated);
      else if (field === "target") setTarget(validated);
    }
  };

  useEffect(() => {
    calculateRR();
  }, [entry, stopLoss, target]);

  const format = (val: number) => val.toFixed(2);

  return (
    <TradingToolLayout
      title="Risk Reward Calculator"
      description="Calculate the mathematical expectancy of your trades. Aim for higher rewards than risks to stay profitable in the long run."
      howToUse={[
        "Enter your planned entry price (Max 6 digits).",
        "Enter your stop loss level (Max 6 digits).",
        "Enter your take profit target (Max 6 digits).",
        "Review the Risk-to-Reward ratio. 1:2 or higher is often recommended."
      ]}
      formula="Risk = |Entry - Stop| | Reward = |Target - Entry| | Ratio = Reward / Risk"
      tips={[
        "A 1:2 Risk-to-Reward ratio means you only need to be right 34% of the time to break even.",
        "Don't just set a target; ensure the reward potential is realistic based on recent price action (ATR).",
        "Precision Note: All calculations are rounded to 2 decimal places.",
        "Professional traders often 'scale out' of positions at R1 and R2 to lock in gains."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Risk/Reward Ratio (R:R) is a measure of the potential profit for every dollar risked. For example, a 1:3 ratio means you are risking $1 to potentially make $3.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Expectancy</h4>
                <p className="text-xs text-slate-500 font-medium">Higher R:R allows you to stay profitable even with a low winning percentage.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Execution</h4>
                <p className="text-xs text-slate-500 font-medium">Targets should be placed at logical structural levels, not arbitrary percentages.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Entry Price</label>
                   <input 
                     type="text"
                     inputMode="decimal"
                     value={entry}
                     onChange={(e) => handleInputChange("entry", e.target.value)}
                     className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-rose-400 pl-1">Stop Loss</label>
                   <input 
                     type="text"
                     inputMode="decimal"
                     value={stopLoss}
                     onChange={(e) => handleInputChange("stopLoss", e.target.value)}
                     className="w-full px-6 py-4 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400 pl-1">Take Profit Target</label>
                   <input 
                     type="text"
                     inputMode="decimal"
                     value={target}
                     onChange={(e) => handleInputChange("target", e.target.value)}
                     className="w-full px-6 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                   />
                </div>
             </div>

             <div className="pt-6">
               <button 
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                Calculate Risk/Reward
              </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                 <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 className="text-xl font-black tracking-tight">Trade Expectancy</h3>
                    <Scale className="text-blue-400" size={24} />
                 </div>

                 {!results ? (
                   <div className="py-20 text-center space-y-4 opacity-50">
                      <p className="text-slate-400 font-medium italic">Enter trade levels to calculate ratio.</p>
                   </div>
                 ) : (
                   <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-6 bg-rose-500/10 rounded-3xl border border-rose-500/20 text-center space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Risk Distance</span>
                            <div className="text-2xl font-black">{format(results.risk)}</div>
                         </div>
                         <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 text-center space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Reward Potential</span>
                            <div className="text-2xl font-black">{format(results.reward)}</div>
                         </div>
                      </div>

                      <div className="p-10 bg-blue-600 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 shadow-2xl shadow-blue-600/20">
                         <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Risk Reward Ratio</span>
                         <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black italic">1 : {results.ratio.toFixed(2)}</span>
                         </div>
                         <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${results.ratio >= 2 ? "bg-emerald-400 text-emerald-900" : "bg-orange-400 text-orange-950"}`}>
                            {results.ratio >= 3 ? "Excellent" : results.ratio >= 2 ? "Professional" : "Aggressive"}
                         </div>
                      </div>
                   </div>
                 )}
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                 "Trade what you see, not what you think."
              </div>
           </div>
        </div>
      </div>
    </TradingToolLayout>
  );
}
