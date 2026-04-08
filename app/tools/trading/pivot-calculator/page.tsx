"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import { Info, RefreshCw } from "lucide-react";

type PivotMethod = "Standard" | "Fibonacci" | "Camarilla" | "Woodie";

export default function PivotCalculatorPage() {
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const [method, setMethod] = useState<PivotMethod>("Standard");
  const [results, setResults] = useState<any>(null);

  const calculatePivots = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);
    const c = parseFloat(close);

    if (isNaN(h) || isNaN(l) || isNaN(c)) return;

    let p = 0, r1 = 0, s1 = 0, r2 = 0, s2 = 0, r3 = 0, s3 = 0, r4 = 0, s4 = 0;

    const range = h - l;

    switch (method) {
      case "Standard":
        p = (h + l + c) / 3;
        r1 = (2 * p) - l;
        s1 = (2 * p) - h;
        r2 = p + range;
        s2 = p - range;
        r3 = h + 2 * (p - l);
        s3 = l - 2 * (h - p);
        break;
      case "Fibonacci":
        p = (h + l + c) / 3;
        r1 = p + (range * 0.382);
        s1 = p - (range * 0.382);
        r2 = p + (range * 0.618);
        s2 = p - (range * 0.618);
        r3 = p + (range * 1.0);
        s3 = p - (range * 1.0);
        break;
      case "Camarilla":
        p = c; // Pivot isn't normally used for trading in Camarilla, but we show close
        r1 = c + (range * 1.1 / 12);
        s1 = c - (range * 1.1 / 12);
        r2 = c + (range * 1.1 / 6);
        s2 = c - (range * 1.1 / 6);
        r3 = c + (range * 1.1 / 4);
        s3 = c - (range * 1.1 / 4);
        r4 = c + (range * 1.1 / 2);
        s4 = c - (range * 1.1 / 2);
        break;
      case "Woodie":
        p = (h + l + 2 * c) / 4;
        r1 = (2 * p) - l;
        s1 = (2 * p) - h;
        r2 = p + range;
        s2 = p - range;
        r3 = h + 2 * (p - l);
        s3 = l - 2 * (h - p);
        break;
    }

    setResults({ p, r1, s1, r2, s2, r3, s3, r4, s4 });
  };

  const handleCalculate = () => {
    calculatePivots();
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  const validateNumericInput = (val: string) => {
    if (val === "") return "";
    // Allow only up to 6 digits before decimal and up to 3 digits after decimal
    const regex = /^\d{0,6}(\.\d{0,3})?$/;
    if (regex.test(val)) return val;
    return null; // Indicates invalid input
  };

  const handleInputChange = (field: string, val: string) => {
    const validated = validateNumericInput(val);
    if (validated !== null) {
      if (field === "High") setHigh(validated);
      else if (field === "Low") setLow(validated);
      else setClose(validated);
    }
  };

  useEffect(() => {
    calculatePivots();
  }, [high, low, close, method]);

  const format = (val: number) => val.toFixed(2);

  return (
    <TradingToolLayout
      title="Pivot Calculator"
      description="Professional-grade pivot point generator using multiple calculation methodologies for precision market level analysis."
      howToUse={[
        "Enter the high price from the previous session (Max 6 digits).",
        "Enter the low price from the previous session (Max 6 digits).",
        "Enter the closing price from the previous session (Max 6 digits).",
        "Select your preferred methodology (Standard, Fib, etc.).",
        "Analyze the calculated support (S) and resistance (R) levels."
      ]}
      formula="Standard: P = (H + L + C) / 3 | R1 = (2*P)-L | S1 = (2*P)-H"
      tips={[
        "Pivot points are most effective when they align with other indicators like Fibonacci levels or Moving Averages.",
        "The R1 and S1 levels are the most frequently tested targets during the daily trading session.",
        "Precision Note: All calculations are rounded to 2 decimal places for clarity.",
        "A price opening above the Main Pivot (P) is generally considered a bullish signal for the day."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Pivot points are technical analysis indicators used to determine the overall trend of the market over different time frames. The pivot point itself is simply the average of the high, low, and closing prices from the previous trading day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Support (S)</h4>
                <p className="text-xs text-slate-500 font-medium">Buying pressure often increases at these levels, potentially stopping a price decline.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-rose-600 mb-2">Resistance (R)</h4>
                <p className="text-xs text-slate-500 font-medium">Selling pressure typically builds at these levels, often capping a price rally.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
            <div className="space-y-4">
               {["High", "Low", "Close"].map((field) => (
                 <div key={field} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">{field} Price</label>
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={field === "High" ? high : field === "Low" ? low : close}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={`Enter ${field.toLowerCase()}...`}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                 </div>
               ))}
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Calculation Method</label>
               <div className="grid grid-cols-2 gap-2">
                  {(["Standard", "Fibonacci", "Camarilla", "Woodie"] as PivotMethod[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                        method === m 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-500/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
               </div>
            </div>

            <div className="pt-4 space-y-4">
               <button 
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                 Calculate Pivot Levels
              </button>

              <button 
                onClick={() => { setHigh(""); setLow(""); setClose(""); setResults(null); }}
                className="w-full py-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all flex items-center justify-center gap-2"
              >
                 <RefreshCw size={14} /> Clear Inputs
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-200/50 dark:shadow-none min-h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="space-y-8 relative z-10">
                 <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 className="text-xl font-black tracking-tight">Calculated Levels</h3>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
                       {method}
                    </div>
                 </div>

                 {!results ? (
                   <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                         <Info className="text-slate-500" />
                      </div>
                      <p className="text-slate-500 font-medium italic">Enter HLC prices to see pivot levels.</p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {/* Pivot Point */}
                      <div className="md:col-span-2 p-6 bg-blue-600 rounded-3xl flex items-center justify-between shadow-lg shadow-blue-600/20">
                         <span className="text-sm font-black uppercase tracking-widest text-white/70">Main Pivot (P)</span>
                         <span className="text-3xl font-black">{format(results.p)}</span>
                      </div>

                      {/* Resistance */}
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-2">Resistance Levels</h4>
                         <div className="space-y-2">
                           {[
                             { label: "R3", val: results.r3 },
                             { label: "R2", val: results.r2 },
                             { label: "R1", val: results.r1 }
                           ].map(item => (
                             <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <span className="text-xs font-black text-emerald-400">{item.label}</span>
                                <span className="text-lg font-bold">{format(item.val)}</span>
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* Support */}
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-2">Support Levels</h4>
                         <div className="space-y-2">
                           {[
                             { label: "S1", val: results.s1 },
                             { label: "S2", val: results.s2 },
                             { label: "S3", val: results.s3 }
                           ].map(item => (
                             <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <span className="text-xs font-black text-rose-400">{item.label}</span>
                                <span className="text-lg font-bold">{format(item.val)}</span>
                             </div>
                           ))}
                         </div>
                      </div>

                      {method === "Camarilla" && results.r4 && (
                        <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                           <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">R4 Breakout</span>
                              <span className="text-lg font-bold">{format(results.r4)}</span>
                           </div>
                           <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">S4 Breakdown</span>
                              <span className="text-lg font-bold">{format(results.s4)}</span>
                           </div>
                        </div>
                      )}
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </TradingToolLayout>
  );
}
