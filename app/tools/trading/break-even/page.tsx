"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import { Info, Calculator, Percent, DollarSign } from "lucide-react";

export default function BreakEvenCalculatorPage() {
  const [entry, setEntry] = useState<string>("");
  const [fees, setFees] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateBE = () => {
    const e = parseFloat(entry);
    const f = parseFloat(fees);
    const q = parseFloat(quantity);

    if (isNaN(e) || isNaN(f) || isNaN(q) || q <= 0) {
      setResults(null);
      return;
    }

    const totalEntryValue = e * q;
    const breakEvenPrice = e + (f / q);
    const breakEvenPercent = ((breakEvenPrice - e) / e) * 100;

    setResults({ breakEvenPrice, breakEvenPercent, totalEntryValue });
  };

  const handleCalculate = () => {
    calculateBE();
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
      else if (field === "fees") setFees(validated);
      else if (field === "quantity") setQuantity(validated);
    }
  };

  useEffect(() => {
    calculateBE();
  }, [entry, fees, quantity]);

  const format = (val: number) => val.toFixed(2);

  return (
    <TradingToolLayout
      title="Break-even Calculator"
      description="Identify the exact price point where your trade covers all costs, including spreads and commissions, before it becomes profitable."
      howToUse={[
        "Enter your entry price (Max 6 digits).",
        "Enter total fees/costs (Max 6 digits).",
        "Enter position quantity (Max 6 digits).",
        "The calculator will show the exact price you need to reach to break even."
      ]}
      formula="Break-even Price = Entry Price + (Total Fees / Quantity)"
      tips={[
        "Spreads and commissions are 'Hidden Costs' that move your break-even point against you.",
        "Precision Note: All calculations are rounded to 2 decimal places.",
        "Once price passes the break-even level, some traders move their stop loss to this point for a 'Free Trade'.",
        "Consider taxes if you are trading in a taxable account, as they further increase your required markup."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
             The Break-even point is the exact price at which the trade yields zero profit and zero loss after accounting for all execution costs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Cost Basis</h4>
                <p className="text-xs text-slate-500 font-medium">Includes entry price plus all transactional overhead (commissions/fees).</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Markup</h4>
                <p className="text-xs text-slate-500 font-medium">The percentage increase required just to stop losing money on the trade.</p>
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
                   <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={entry}
                        onChange={(e) => handleInputChange("entry", e.target.value)}
                        className="w-full pl-10 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Total Fees (Buy + Sell)</label>
                   <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                      <input 
                        type="text"
                        inputMode="decimal"
                        value={fees}
                        onChange={(e) => handleInputChange("fees", e.target.value)}
                        placeholder="e.g. 5.00"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Position Quantity</label>
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
                Calculate Break-even
              </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-12">
           <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -ml-48 -mt-48" />
              
              {!results ? (
                 <div className="flex-1 py-12 text-center space-y-4 opacity-50 relative z-10 w-full">
                    <Calculator className="mx-auto text-slate-500" size={48} />
                    <p className="text-slate-400 font-medium italic">Complete the inputs to find your break-even point.</p>
                 </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 relative z-10">
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Target Break-even Price</span>
                     <div className="text-7xl font-black italic tracking-tighter">
                        ${format(results.breakEvenPrice)}
                     </div>
                     <p className="text-slate-500 font-medium max-w-sm">
                        Price must increase by <span className="text-white font-bold">{results.breakEvenPercent.toFixed(4)}%</span> to cover only your execution costs.
                     </p>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full md:w-auto">
                     <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-slate-500">
                           <DollarSign size={16} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Entry Value</span>
                        </div>
                        <div className="text-3xl font-black">${format(results.totalEntryValue)}</div>
                     </div>
                     <div className="p-8 bg-blue-600/20 rounded-[2rem] border border-blue-600/30 space-y-2 text-blue-400">
                        <div className="flex items-center gap-2">
                           <Percent size={16} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Markup Required</span>
                        </div>
                        <div className="text-3xl font-black">+{results.breakEvenPercent.toFixed(2)}%</div>
                     </div>
                  </div>
                </>
              )}
           </div>
        </div>
      </div>
    </TradingToolLayout>
  );
}
