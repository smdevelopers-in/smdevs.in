"use client";

import { useState, useEffect, useRef } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import RelatedTradingTools from "@/components/tools/RelatedTradingTools";
import { TrendingUp, PiggyBank, BarChart2, ChevronDown, ChevronUp } from "lucide-react";

const SIP_FAQS = [
  {
    question: "What is SIP (Systematic Investment Plan)?",
    answer: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in mutual funds at regular intervals (monthly, quarterly). It enforces discipline, averages out market volatility through rupee cost averaging, and harnesses compound interest to grow wealth steadily over time."
  },
  {
    question: "What is a Step-Up SIP?",
    answer: "A Step-Up SIP (also called Top-Up SIP) allows you to increase your SIP contribution by a fixed percentage or amount every year. For example, increasing your ₹5,000/month SIP by 10% annually means you invest ₹5,500 in Year 2, ₹6,050 in Year 3, and so on — dramatically boosting your corpus compared to a flat SIP."
  },
  {
    question: "How is the SIP return calculated?",
    answer: "SIP returns use the Compound Annual Growth Rate (CAGR) formula applied monthly. Monthly rate = Annual rate / 12. Future Value = P × [((1 + r)^n - 1) / r] × (1 + r), where P is monthly installment, r is monthly return rate, and n is total number of months."
  },
  {
    question: "What is a realistic SIP return rate?",
    answer: "Historically, Indian equity mutual funds (large-cap) have delivered 10-14% CAGR over long periods. Debt funds typically return 5-8%. For conservative estimates, 10-12% is used for equity SIPs. Always remember — past performance does not guarantee future results."
  },
  {
    question: "Should I use Step-Up SIP?",
    answer: "Yes, if your income grows over time. Linking your SIP growth to your income growth ensures your investments grow proportionally, helping you reach financial goals faster without significantly impacting your lifestyle. Even a 5-10% annual step-up can add lakhs to your final corpus."
  }
];

function formatIndian(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}

function formatCurrency(num: number): string {
  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}

interface YearlyData {
  year: number;
  monthlyInvestment: number;
  yearlyInvestment: number;
  cumulativeInvestment: number;
  cumulativeValue: number;
  returns: number;
}

interface SIPResult {
  totalInvested: number;
  totalReturns: number;
  maturityValue: number;
  absoluteReturn: number;
  yearlyBreakdown: YearlyData[];
}

function DonutChart({ invested, returns }: { invested: number; returns: number }) {
  const total = invested + returns;
  const investedPct = (invested / total) * 100;
  const returnsPct = (returns / total) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const investedDash = (investedPct / 100) * circumference;
  const returnsDash = (returnsPct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        {/* Background */}
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="24" />
        {/* Invested */}
        <circle
          cx="90" cy="90" r={radius} fill="none"
          stroke="#3b82f6" strokeWidth="24"
          strokeDasharray={`${investedDash} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Returns */}
        <circle
          cx="90" cy="90" r={radius} fill="none"
          stroke="#10b981" strokeWidth="24"
          strokeDasharray={`${returnsDash} ${circumference}`}
          strokeDashoffset={-investedDash}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Returns</div>
        <div className="text-lg font-black text-emerald-400">{returnsPct.toFixed(1)}%</div>
      </div>
    </div>
  );
}

export default function SIPCalculatorPage() {
  const [monthly, setMonthly] = useState<string>("10000");
  const [rate, setRate] = useState<string>("12");
  const [years, setYears] = useState<string>("10");
  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpRate, setStepUpRate] = useState<string>("10");
  const [results, setResults] = useState<SIPResult | null>(null);
  const [showFullTable, setShowFullTable] = useState(false);

  const calculateSIP = () => {
    const P = parseFloat(monthly);
    const annualRate = parseFloat(rate);
    const totalYears = parseInt(years);
    const annualStepUp = stepUpEnabled ? parseFloat(stepUpRate) / 100 : 0;

    if (isNaN(P) || isNaN(annualRate) || isNaN(totalYears) || P <= 0 || annualRate <= 0 || totalYears <= 0) {
      setResults(null);
      return;
    }

    const r = annualRate / 100 / 12; // monthly rate
    let totalInvested = 0;
    let maturityValue = 0;
    const yearlyBreakdown: YearlyData[] = [];
    let cumulativeInvested = 0;
    let cumulativeValue = 0;
    let currentMonthly = P;

    for (let y = 1; y <= totalYears; y++) {
      // Adjust monthly for step-up (after first year)
      if (y > 1 && stepUpEnabled) {
        currentMonthly = currentMonthly * (1 + annualStepUp);
      }
      const yearlyInvestment = currentMonthly * 12;
      cumulativeInvested += yearlyInvestment;

      // For each month of this year, compute future value contribution at end of period
      const monthsRemaining = (totalYears - y) * 12 + 12;
      for (let m = 1; m <= 12; m++) {
        const monthsLeft = (totalYears - y) * 12 + (12 - m + 1);
        cumulativeValue += currentMonthly * Math.pow(1 + r, monthsLeft);
      }

      yearlyBreakdown.push({
        year: y,
        monthlyInvestment: Math.round(currentMonthly),
        yearlyInvestment: Math.round(yearlyInvestment),
        cumulativeInvestment: Math.round(cumulativeInvested),
        cumulativeValue: Math.round(cumulativeValue),
        returns: Math.round(cumulativeValue - cumulativeInvested)
      });
    }

    const maturity = yearlyBreakdown[totalYears - 1].cumulativeValue;
    const invested = yearlyBreakdown[totalYears - 1].cumulativeInvestment;
    const returns = maturity - invested;

    setResults({
      totalInvested: invested,
      totalReturns: returns,
      maturityValue: maturity,
      absoluteReturn: (returns / invested) * 100,
      yearlyBreakdown
    });
  };

  const handleCalculate = () => {
    calculateSIP();
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  useEffect(() => {
    calculateSIP();
  }, [monthly, rate, years, stepUpEnabled, stepUpRate]);

  const displayedRows = results
    ? showFullTable
      ? results.yearlyBreakdown
      : results.yearlyBreakdown.slice(0, 5)
    : [];

  return (
    <TradingToolLayout
      title="SIP Calculator"
      description="Calculate your Systematic Investment Plan returns with optional annual step-up. See your wealth grow year by year with a visual breakdown."
      howToUse={[
        "Enter your monthly SIP investment amount.",
        "Set the expected annual return rate (10-14% for equity funds historically).",
        "Choose your investment duration in years.",
        "Toggle Step-Up SIP to simulate annual increment in your SIP amount.",
        "View the year-by-year wealth breakdown table and total corpus."
      ]}
      formula="Monthly Rate (r) = Annual Rate / 12 | FV = P × [((1+r)^n – 1) / r] × (1+r) | Step-Up: Each year's SIP = Previous × (1 + Step-Up%)"
      tips={[
        "The Step-Up SIP of just 10% per year can double your corpus compared to a flat SIP over 20 years.",
        "Start early — investing ₹5,000/month at age 25 vs. 35 can result in 3x more corpus at retirement.",
        "A 1% higher return over 20 years can add lakhs to your final corpus — choose funds wisely.",
        "Equity SIP returns fluctuate year to year; use 10-12% as a conservative long-term estimate."
      ]}
      faqs={SIP_FAQS}
      explanation={
        <div className="space-y-4">
          <p>
            A SIP (Systematic Investment Plan) allows you to invest a fixed amount at regular intervals. The power of SIP lies in rupee cost averaging and compounding — you buy more units when prices are low and fewer when high, averaging your cost over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Rupee Cost Averaging</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Investing regularly means you automatically buy more units when prices fall, lowering your average cost per unit.</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Step-Up Power</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Increasing your SIP by 10% annually mirrors income growth and dramatically compounds your wealth over time.</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            {/* Monthly SIP */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Monthly Investment</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-500 dark:text-slate-400 text-lg">₹</span>
                <input
                  type="text" inputMode="numeric" value={monthly}
                  onChange={(e) => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 8) setMonthly(e.target.value); }}
                  placeholder="e.g. 10000"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-lg focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Rate & Duration Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Expected Return (%)</label>
                <div className="relative">
                  <input
                    type="text" inputMode="decimal" value={rate}
                    onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value.length <= 5) setRate(e.target.value); }}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">% p.a.</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Duration (Years)</label>
                <div className="relative">
                  <input
                    type="text" inputMode="numeric" value={years}
                    onChange={(e) => { if (/^\d*$/.test(e.target.value) && parseInt(e.target.value || "0") <= 40) setYears(e.target.value); }}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Yrs</span>
                </div>
              </div>
            </div>

            {/* Step-Up Toggle */}
            <div className="space-y-4">
              <div
                onClick={() => setStepUpEnabled(!stepUpEnabled)}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${stepUpEnabled ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"}`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp size={18} className={stepUpEnabled ? "text-emerald-600" : "text-slate-400"} />
                  <div>
                    <div className={`text-sm font-black ${stepUpEnabled ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
                      Annual Step-Up SIP
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">Increase SIP every year</div>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all relative ${stepUpEnabled ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all ${stepUpEnabled ? "left-7" : "left-1"}`} />
                </div>
              </div>

              {stepUpEnabled && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 pl-1">Step-Up Rate (% per year)</label>
                  <div className="relative">
                    <input
                      type="text" inputMode="decimal" value={stepUpRate}
                      onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value.length <= 4) setStepUpRate(e.target.value); }}
                      className="w-full px-6 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-500">% p.a.</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium pl-1">
                    Your SIP will increase by {stepUpRate || "0"}% each year automatically.
                  </p>
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <div className="pt-2">
              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <PiggyBank size={18} />
                Calculate SIP Returns
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col relative overflow-hidden min-h-[400px]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/10 blur-[100px] rounded-full -ml-20 -mb-20 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 relative z-10">
              <h3 className="text-xl font-black tracking-tight">SIP Projection</h3>
              <BarChart2 className="text-blue-400" size={24} />
            </div>

            {!results ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3 opacity-40">
                  <PiggyBank size={48} className="mx-auto text-slate-400" />
                  <p className="text-slate-500 font-medium italic">Enter your SIP details to see projections.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                {/* Main corpus card */}
                <div className="p-8 bg-blue-600 rounded-[2rem] space-y-2 shadow-xl shadow-blue-600/25">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Maturity Corpus</span>
                  <div className="text-4xl md:text-5xl font-black">{formatIndian(results.maturityValue)}</div>
                  <div className="flex gap-3 flex-wrap pt-1">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {years} Years
                    </span>
                    <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                      +{results.absoluteReturn.toFixed(0)}% Absolute Return
                    </span>
                    {stepUpEnabled && (
                      <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {stepUpRate}% Step-Up
                      </span>
                    )}
                  </div>
                </div>

                {/* Breakdown + Donut */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Invested</div>
                        <div className="text-xl font-black text-blue-400">{formatIndian(results.totalInvested)}</div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Est. Returns</div>
                        <div className="text-xl font-black text-emerald-400">{formatIndian(results.totalReturns)}</div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <DonutChart invested={results.totalInvested} returns={results.totalReturns} />
                  </div>
                </div>

                {/* Footer note */}
                <div className="pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                  Estimates based on constant CAGR. Actual mutual fund returns vary.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YEAR-BY-YEAR BREAKDOWN TABLE */}
      {results && results.yearlyBreakdown.length > 0 && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Year-by-Year Breakdown</h2>
              <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">How your wealth grows annually</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Year</th>
                  <th className="text-right py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Monthly SIP</th>
                  <th className="text-right py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Invested (Cumul.)</th>
                  <th className="text-right py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Portfolio Value</th>
                  <th className="text-right py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Est. Returns</th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((row, i) => {
                  const isLast = i === displayedRows.length - 1 && !showFullTable && results.yearlyBreakdown.length > 5;
                  return (
                    <tr
                      key={row.year}
                      className={`border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${isLast ? "opacity-50" : ""}`}
                    >
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-black text-xs">
                          Y{row.year}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-slate-700 dark:text-slate-300">
                        {formatCurrency(row.monthlyInvestment)}
                        {stepUpEnabled && row.year > 1 && (
                          <span className="ml-1 text-[9px] font-black text-emerald-500">↑</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-blue-600 dark:text-blue-400">
                        {formatIndian(row.cumulativeInvestment)}
                      </td>
                      <td className="py-4 px-4 text-right font-black text-slate-900 dark:text-white">
                        {formatIndian(row.cumulativeValue)}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        +{formatIndian(row.returns)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {results.yearlyBreakdown.length > 5 && (
            <button
              onClick={() => setShowFullTable(!showFullTable)}
              className="mt-4 w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              {showFullTable ? (
                <><ChevronUp size={16} /> Show Less</>
              ) : (
                <><ChevronDown size={16} /> Show All {results.yearlyBreakdown.length} Years</>
              )}
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        <RelatedTradingTools exclude={["/tools/trading/sip-calculator"]} limit={4} />
      </div>
    </TradingToolLayout>
  );
}
