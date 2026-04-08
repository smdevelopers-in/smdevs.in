"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import { Info, Target, ShieldAlert } from "lucide-react";

export default function PositionSizeCalculatorPage() {
  const [capital, setCapital] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<string>("1");
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculatePosition = () => {
    const cap = parseFloat(capital);
    const riskP = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);

    if (isNaN(cap) || isNaN(riskP) || isNaN(entry) || isNaN(stop)) {
      setResults(null);
      return;
    }

    if (entry === stop) {
      setResults(null);
      return;
    }

    const riskAmount = cap * (riskP / 100);
    const stopLossDistance = Math.abs(entry - stop);
    const positionSize = riskAmount / stopLossDistance;
    const totalContractValue = positionSize * entry;

    setResults({
      riskAmount,
      positionSize,
      totalContractValue,
      stopLossPercent: (stopLossDistance / entry) * 100
    });
  };

  const handleCalculate = () => {
    calculatePosition();
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
      if (field === "capital") setCapital(validated);
      else if (field === "riskPercent") setRiskPercent(validated);
      else if (field === "entryPrice") setEntryPrice(validated);
      else if (field === "stopLoss") setStopLoss(validated);
    }
  };

  useEffect(() => {
    calculatePosition();
  }, [capital, riskPercent, entryPrice, stopLoss]);

  const format = (val: number) => val.toFixed(2);

  return (
    <TradingToolLayout
      title="Position Size Calculator"
      description="Protect your capital with precise unit calculation. Never risk more than your specified percentage on a single trade."
      howToUse={[
        "Enter your account capital (Max 6 digits).",
        "Set your risk percentage.",
        "Enter your planned entry price (Max 6 digits).",
        "Enter your hard stop-loss price (Max 6 digits).",
        "The calculator will show you exactly how many units to buy/sell."
      ]}
      formula="Risk Amount = Capital × (Risk % / 100) | Position Size = Risk Amount / |Entry - Stop Loss|"
      tips={[
        "Beginner traders should aim for a risk of 1% or less per trade to ensure long-term survival.",
        "Your stop loss should be placed at a level where your trade thesis is proven wrong, not just a random number.",
        "Precision Note: All calculations are rounded to 2 decimal places.",
        "Risking too much on a single trade (Over-leveraging) is the #1 reason why retail traders fail."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Position Sizing is the most critical component of risk management. It determines how many units of an asset you should buy or sell based on your account size and the distance to your stop loss.
          </p>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 mt-6">
             <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">The Golden Rule</h4>
             <p className="text-xs text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
                Even if you have a 40% win rate, proper position sizing ensures that your winning trades are larger than your losing ones, keeping your equity curve moving upwards over time.
             </p>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Account Capital</label>
                   <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-500 dark:text-slate-400">$</span>
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={capital}
                        onChange={(e) => handleInputChange("capital", e.target.value)}
                        placeholder="e.g. 10000"
                        className="w-full pl-10 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Risk per trade (%)</label>
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={riskPercent}
                        onChange={(e) => handleInputChange("riskPercent", e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Planned Entry</label>
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={entryPrice}
                        onChange={(e) => handleInputChange("entryPrice", e.target.value)}
                        placeholder="1.2345"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Stop Loss Price</label>
                   <div className="relative">
                      <ShieldAlert className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={stopLoss}
                        onChange={(e) => handleInputChange("stopLoss", e.target.value)}
                        placeholder="1.2300"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-rose-500/10 border-rose-100 dark:border-rose-900/30 outline-none transition-all"
                      />
                   </div>
                </div>
             </div>

             <div className="pt-6">
               <button 
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                Calculate Position Size
              </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="space-y-8 relative z-10">
                 <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 className="text-xl font-black tracking-tight">Position Strategy</h3>
                    <Target className="text-blue-400" size={24} />
                 </div>

                 {!results ? (
                    <div className="py-20 text-center space-y-4 opacity-50">
                       <p className="text-slate-500 dark:text-slate-400 font-medium italic">Complete the inputs to calculate size.</p>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       <div className="p-8 bg-blue-600 rounded-[2rem] space-y-2 shadow-xl shadow-blue-500/20">
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Units to Trade</span>
                          <div className="text-5xl font-black">{format(results.positionSize)} <span className="text-xl font-medium opacity-60 uppercase">Units</span></div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Risk Amount ($)</span>
                             <div className="text-2xl font-black text-rose-400">${format(results.riskAmount)}</div>
                          </div>
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Risk Distance (%)</span>
                             <div className="text-2xl font-black text-white">{format(results.stopLossPercent)}%</div>
                          </div>
                       </div>

                       <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Total Contract Value</span>
                          <span className="text-xl font-bold">${format(results.totalContractValue)}</span>
                       </div>
                    </div>
                 )}
              </div>
              
              <div className="pt-8 border-t border-white/5 relative z-10">
                 <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <Info size={14} className="text-blue-400" />
                    Calculating your position ensures you never lose more than {riskPercent || 1}% of your capital if hit.
                 </div>
              </div>
           </div>
        </div>
      </div>
    </TradingToolLayout>
  );
}
