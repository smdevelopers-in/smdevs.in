"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import { Info, BarChart3, TrendingUp, TrendingDown } from "lucide-react";

export default function ProfitLossCalculatorPage() {
  const [entry, setEntry] = useState<string>("");
  const [exit, setExit] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculatePL = () => {
    const e = parseFloat(entry);
    const ex = parseFloat(exit);
    const q = parseFloat(quantity);

    if (isNaN(e) || isNaN(ex) || isNaN(q)) {
      setResults(null);
      return;
    }

    const profitValue = (ex - e) * q;
    const profitPercent = ((ex - e) / e) * 100;
    const isProfit = profitValue >= 0;

    setResults({ profitValue, profitPercent, isProfit });
  };

  const handleCalculate = () => {
    calculatePL();
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
      else if (field === "exit") setExit(validated);
      else if (field === "quantity") setQuantity(validated);
    }
  };

  useEffect(() => {
    calculatePL();
  }, [entry, exit, quantity]);

  const format = (val: number) => Math.abs(val).toFixed(2);

  return (
    <TradingToolLayout
      title="Profit/Loss Calculator"
      description="Calculate your net gains or losses instantly. Account for quantity and price movement to track your P&L accurately."
      howToUse={[
        "Enter your entry price (Max 6 digits).",
        "Enter your exit (selling) price (Max 6 digits).",
        "Enter the quantity of units/shares traded (Max 6 digits).",
        "The calculator will show your P&L in both currency and percentage."
      ]}
      formula="Profit/Loss = (Exit Price - Entry Price) × Quantity"
      tips={[
        "Analyze your losing trades more than your winning ones; they contain the best lessons.",
        "Precision Note: All calculations are rounded to 2 decimal places.",
        "Don't focus on the dollar amount early on; focus on the percentage gain relative to your risk.",
        "Use a trading journal to record your P&L and the 'Why' behind every entry and exit."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Profit and Loss (P&L) refers to the total gain or loss realized on a trade after closing the position. It is the primary metric for evaluating the success of a trading strategy.
          </p>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800 mt-6">
             <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Realized vs Unrealized</h4>
             <p className="text-xs text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
               Unrealized P&L is the profit or loss currently 'on paper' while a trade is open. It only becomes Realized P&L once the position is closed.
             </p>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Exit Price</label>
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={exit}
                      onChange={(e) => handleInputChange("exit", e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Trade Quantity</label>
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                 </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleCalculate}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Calculate P&L
                </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-xl flex flex-col justify-center h-full relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-white/5 opacity-40 blur-[100px] pointer-events-none" />
              
              {!results ? (
                 <div className="space-y-4 opacity-50 relative z-10">
                    <BarChart3 className="mx-auto text-slate-500" size={48} />
                    <p className="text-slate-400 font-medium">Input your trade data to see P&L.</p>
                 </div>
              ) : (
                 <div className="space-y-10 relative z-10">
                    <div className="space-y-2">
                       <span className={`text-xs font-black uppercase tracking-[0.2em] ${results.isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                          Net {results.isProfit ? "Profit" : "Loss"}
                       </span>
                       <div className="flex items-center justify-center gap-4">
                          {results.isProfit ? <TrendingUp className="text-emerald-400" size={40} /> : <TrendingDown className="text-rose-400" size={40} />}
                          <div className={`text-7xl font-black ${results.isProfit ? "text-white" : "text-rose-50"}`}>
                             ${format(results.profitValue)}
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                       <div className={`px-8 py-3 rounded-full text-lg font-black ${results.isProfit ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"}`}>
                          {results.isProfit ? "+" : "-"}{Math.abs(results.profitPercent).toFixed(2)}%
                       </div>
                       <p className="text-xs text-slate-500 font-medium italic underline underline-offset-4 decoration-dotted">
                          {results.isProfit ? "Excellent execution! Manage your exit wisely." : "Review your strategy to minimize drawdowns."}
                       </p>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </TradingToolLayout>
  );
}
