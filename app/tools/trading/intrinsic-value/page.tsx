"use client";

import { useState, useEffect } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import RelatedTradingTools from "@/components/tools/RelatedTradingTools";
import { TrendingUp, TrendingDown, Minus, BookOpen, AlertTriangle } from "lucide-react";

// ─── Schemas ────────────────────────────────────────────────────────────────

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Intrinsic Value Calculator for Stocks",
  "description": "Estimate fair value of any stock using earnings growth assumptions and margin of safety analysis.",
  "url": "https://smdevs.in/tools/trading/intrinsic-value",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smdevs.in" },
      { "@type": "ListItem", "position": 2, "name": "Trading Tools", "item": "https://smdevs.in/tools/trading" },
      { "@type": "ListItem", "position": 3, "name": "Intrinsic Value Calculator", "item": "https://smdevs.in/tools/trading/intrinsic-value" }
    ]
  }
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Intrinsic Value Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Estimate fair value using earnings growth and margin of safety. Free, client-side, no login.",
  "url": "https://smdevs.in/tools/trading/intrinsic-value"
};

// ─── FAQs ────────────────────────────────────────────────────────────────────

const FAQS = [
  { question: "What is intrinsic value?", answer: "Intrinsic value is the estimated 'true' or 'fair' value of a stock based on fundamental analysis — primarily the company's earnings power, growth prospects, and discount rate. It may differ significantly from the current market price." },
  { question: "How does this calculator estimate intrinsic value?", answer: "We use a simplified Discounted Cash Flow (DCF) model based on projected EPS growth. The formula projects future earnings over your chosen time horizon and discounts them back to present value using your specified discount rate." },
  { question: "What is EPS?", answer: "EPS stands for Earnings Per Share — the portion of a company's profit allocated to each outstanding share. It is the starting point for most fundamental valuation methods and is readily available on financial portals." },
  { question: "What discount rate should I use?", answer: "The discount rate represents your required rate of return. A common approach is to use the risk-free rate (e.g., 10-year government bond yield, ~6-7% in India) plus a risk premium. Many value investors use 10-15%." },
  { question: "What is a reasonable expected growth rate?", answer: "Sustainable long-term growth rates for most companies range from 5% to 20%. For mature large-caps, 8-12% is realistic. Applying rates above 25% is speculative and should be used with extreme caution." },
  { question: "What is the margin of safety?", answer: "Margin of safety is the discount between a stock's current market price and its estimated intrinsic value. For example, if intrinsic value is ₹1000 and the stock trades at ₹700, the margin of safety is 30%. Larger margins of safety provide a greater buffer against estimation errors." },
  { question: "What does 'Undervalued' mean?", answer: "Undervalued means the stock's current market price is below the estimated intrinsic value with a meaningful margin of safety (typically 15%+). This could represent a buying opportunity — but always verify with further research." },
  { question: "What does 'Overvalued' mean?", answer: "Overvalued means the market price is above the calculated intrinsic value, implying investors are paying more than the business may be worth based on current earnings assumptions." },
  { question: "What is the Graham Number?", answer: "The Graham Number, named after Benjamin Graham, is a simple formula: √(22.5 × EPS × Book Value). It provides a rough upper bound for what a defensive investor should pay for a stock. Our calculator uses a DCF-based approach for more flexibility." },
  { question: "How many years should I project?", answer: "Most value investors use 5 to 10 years. Longer projections increase uncertainty significantly. Warren Buffett often focuses on 10-year projections but with very conservative growth assumptions." },
  { question: "Is intrinsic value the same as book value?", answer: "No. Book value is the net asset value recorded on the balance sheet. Intrinsic value attempts to estimate what a business is truly worth based on its future earnings potential, which is often quite different from accounting-based book value." },
  { question: "Should I use this calculator to make buy/sell decisions?", answer: "This calculator is for educational and analytical purposes only. Intrinsic value estimates depend heavily on input assumptions and should be one component of a broader research process that includes studying financials, competitive moats, management quality, and sector dynamics." },
  { question: "How does growth rate affect intrinsic value?", answer: "Higher growth rates significantly increase intrinsic value estimates. Doubling the growth rate from 10% to 20% can more than double the intrinsic value over a 10-year period due to compounding. This is why growth assumptions must be realistic and conservative." },
  { question: "Can I use this for Indian stocks?", answer: "Absolutely. Just enter the EPS in rupees (₹), use an appropriate discount rate (10-15% is common for Indian equities), and enter the current market price in rupees. The calculator is currency-agnostic." },
  { question: "What are the limitations of intrinsic value calculations?", answer: "All intrinsic value estimates are only as good as your assumptions. Errors in EPS, growth rate, or discount rate compound over the projection period. No formula can predict future business performance with certainty — always treat estimates as a range, not a precise number." },
];

// ─── Educational Content ─────────────────────────────────────────────────────

const EducationalContent = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is Intrinsic Value?</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Intrinsic value is perhaps the most important concept in fundamental investing. Coined and popularised by Benjamin Graham — the father of value investing — intrinsic value refers to the actual, underlying worth of a business based on its fundamentals, rather than its current market price. The stock market, Graham famously argued, is a voting machine in the short run but a weighing machine in the long run. Over time, prices tend to converge toward intrinsic value.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        When you buy a share of stock, you are buying a fractional ownership in a business. The true value of that ownership depends on how much cash the business will generate over its lifetime, discounted back to what those future cash flows are worth today. That is the essence of intrinsic value: the present value of all future economic benefits.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Discounted Cash Flow (DCF) Approach</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        The most rigorous method for calculating intrinsic value is the Discounted Cash Flow model. The central idea is simple: a rupee received today is worth more than a rupee received five years from now, because you could invest that rupee and earn a return over those five years. The discount rate represents this opportunity cost.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        In our simplified model, we start with the current Earnings Per Share (EPS), project it forward at the expected growth rate for the chosen number of years, and then discount the sum of all projected earnings back to present value. The resulting number is the estimated intrinsic value per share. If the current market price is significantly below this figure, the stock may be undervalued.
      </p>
      <div className="bg-slate-950 text-blue-200 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
        Intrinsic Value = Σ [ EPS × (1 + g)^t / (1 + r)^t ] for t = 1 to N{"\n"}
        Where: g = growth rate, r = discount rate, N = projection years
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Margin of Safety: The Investor's Parachute</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Benjamin Graham introduced the margin of safety concept as a buffer against analytical errors and uncertainty. Even the best financial models rest on assumptions that may prove wrong. By buying stocks only when the price is significantly below intrinsic value — say 20% to 40% below — investors protect themselves from estimation errors, unexpected business deterioration, or temporary market panic.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Warren Buffett, Graham's most famous student, described the margin of safety as "the three most important words in investing." A 30% margin of safety on a ₹1000 intrinsic value stock means you only buy at ₹700 or below. If your assumptions were slightly optimistic and the stock is actually worth ₹900, you've still bought at a discount.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Understanding the Inputs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { term: "EPS (Earnings Per Share)", desc: "The company's annual profit divided by total shares outstanding. Find it in the latest annual report or financial portals like Screener.in, Moneycontrol, or Yahoo Finance." },
          { term: "Expected Growth Rate", desc: "The annualised rate at which you expect EPS to grow over the projection period. Use historical EPS growth as a guide, but be conservative — the future is always uncertain." },
          { term: "Discount Rate", desc: "Your required annual return. Common choices: risk-free rate + 4-5% risk premium. For Indian markets, 10-15% is widely used by value investors." },
          { term: "Projection Years", desc: "How many years to project earnings. 5-10 years is standard. Beyond 10 years, uncertainty grows substantially and estimates become less reliable." },
        ].map((item, i) => (
          <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-black text-sm text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">{item.term}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Limitations You Must Understand</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Intrinsic value calculators are powerful analytical tools, but they carry important limitations that every investor must appreciate. First, the output is only as good as the inputs. If the growth rate assumption is overly optimistic, the resulting intrinsic value will be inflated. Garbage in, garbage out.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Second, this model does not account for qualitative factors like brand strength, management integrity, competitive moat width, regulatory risks, or macroeconomic shifts — all of which can fundamentally alter a business's trajectory. Third, EPS can be manipulated through accounting choices, share buybacks, or non-recurring items. Always normalise EPS before using it as an input.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Finally, valuation is as much art as science. Even professional fund managers with access to sophisticated models and company management teams routinely disagree on intrinsic value. Treat your calculation as a range — not a precise number — and build in a generous margin of safety.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">How Professional Investors Use Intrinsic Value</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Value investors like Warren Buffett, Charlie Munger, and Howard Marks don't buy a stock because it "looks cheap" on a chart. They build detailed models of a business's future earnings, stress-test their assumptions across multiple scenarios (bear case, base case, bull case), and only commit capital when the price offers a meaningful margin of safety.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        In practice, this means creating a watch list of high-quality businesses at fair or overvalued prices, and then waiting patiently for the market to offer them at a discount — during corrections, sector rotations, or company-specific temporary challenges. The calculator is the first step in this process, not the last.
      </p>
    </div>

    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 flex gap-4">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
        <strong>Disclaimer:</strong> The information provided by this tool is for educational purposes only and should not be considered financial or investment advice. Always conduct thorough research and consult a qualified financial advisor before making investment decisions.
      </p>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function IntrinsicValueCalculatorPage() {
  const [eps, setEps] = useState("");
  const [growthRate, setGrowthRate] = useState("12");
  const [discountRate, setDiscountRate] = useState("12");
  const [years, setYears] = useState("10");
  const [marketPrice, setMarketPrice] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const e = parseFloat(eps);
    const g = parseFloat(growthRate) / 100;
    const r = parseFloat(discountRate) / 100;
    const n = parseInt(years);
    const mp = parseFloat(marketPrice);

    if (isNaN(e) || isNaN(g) || isNaN(r) || isNaN(n) || e <= 0 || r <= 0 || n <= 0) {
      setResults(null);
      return;
    }

    // DCF: sum of discounted projected earnings
    let intrinsicValue = 0;
    for (let t = 1; t <= n; t++) {
      intrinsicValue += (e * Math.pow(1 + g, t)) / Math.pow(1 + r, t);
    }

    intrinsicValue = Math.max(0, intrinsicValue);

    let marginOfSafety: number | null = null;
    let valuation: "undervalued" | "fairlyvalued" | "overvalued" | null = null;

    if (!isNaN(mp) && mp > 0) {
      marginOfSafety = ((intrinsicValue - mp) / intrinsicValue) * 100;
      if (marginOfSafety > 15) valuation = "undervalued";
      else if (marginOfSafety < -5) valuation = "overvalued";
      else valuation = "fairlyvalued";
    }

    setResults({ intrinsicValue, marginOfSafety, valuation });
  };

  const handleCalculate = () => {
    calculate();
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  useEffect(() => { calculate(); }, [eps, growthRate, discountRate, years, marketPrice]);

  const validate = (val: string, maxInt = 6, maxDec = 2) => {
    if (val === "") return "";
    const regex = new RegExp(`^\\d{0,${maxInt}}(\\.\\d{0,${maxDec}})?$`);
    return regex.test(val) ? val : null;
  };

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const valuationConfig = {
    undervalued:  { label: "Undervalued",     bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", Icon: TrendingDown, desc: "Stock appears to trade below estimated fair value. Exercise further due diligence." },
    fairlyvalued: { label: "Fairly Valued",   bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-400",    Icon: Minus,      desc: "Stock appears to trade near estimated fair value. Less margin of safety available." },
    overvalued:   { label: "Overvalued",      bg: "bg-rose-500/10",    border: "border-rose-500/30",    text: "text-rose-400",    Icon: TrendingUp, desc: "Stock appears to trade above estimated fair value. Consider waiting for a better price." },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <TradingToolLayout
        title="Intrinsic Value Calculator"
        description="Estimate a stock's fair value using a DCF-based model. Input EPS, expected growth rate, discount rate, and projection years to discover if a stock is undervalued."
        formula="Intrinsic Value = Σ [ EPS × (1 + g)^t / (1 + r)^t ]  |  t = 1 to N  |  g = Growth Rate, r = Discount Rate"
        howToUse={[
          "Enter the company's current annual EPS (find it on Screener.in or Yahoo Finance).",
          "Set the expected annual EPS growth rate (use historical growth as a guide; be conservative).",
          "Enter your required discount rate (10–15% is common for equity investments).",
          "Choose the projection horizon in years (5–10 years recommended).",
          "Optionally enter the current market price to see your margin of safety.",
        ]}
        tips={[
          "Use a conservative growth rate — optimistic assumptions inflate intrinsic value and can mislead you.",
          "A margin of safety of 20–30% or more provides a meaningful buffer against estimation errors.",
          "Run the calculator with multiple growth scenarios (bear, base, bull) to get a range of values.",
          "Normalize EPS: remove one-time gains/losses before using it as an input.",
        ]}
        faqs={FAQS}
        explanation={<EducationalContent />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Inputs ─── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-5">
              {/* EPS */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">
                  Current EPS (Earnings Per Share)
                </label>
                <input
                  type="text" inputMode="decimal"
                  value={eps}
                  onChange={(e) => { const v = validate(e.target.value, 6, 2); if (v !== null) setEps(v); }}
                  placeholder="e.g. 45.50"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              {/* Growth Rate */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 pl-1">
                  Expected Growth Rate (% per year)
                </label>
                <div className="relative">
                  <input
                    type="text" inputMode="decimal"
                    value={growthRate}
                    onChange={(e) => { const v = validate(e.target.value, 3, 2); if (v !== null) setGrowthRate(v); }}
                    placeholder="e.g. 12"
                    className="w-full px-6 pr-12 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-emerald-500">%</span>
                </div>
              </div>

              {/* Discount Rate */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 pl-1">
                  Discount Rate / Required Return (%)
                </label>
                <div className="relative">
                  <input
                    type="text" inputMode="decimal"
                    value={discountRate}
                    onChange={(e) => { const v = validate(e.target.value, 3, 2); if (v !== null) setDiscountRate(v); }}
                    placeholder="e.g. 12"
                    className="w-full px-6 pr-12 py-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-indigo-500">%</span>
                </div>
              </div>

              {/* Projection Years */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">
                  Projection Years
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["5", "7", "10", "15"].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all ${years === y ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-blue-300"}`}
                    >
                      {y}yr
                    </button>
                  ))}
                </div>
              </div>

              {/* Market Price (optional) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">
                  Current Market Price <span className="normal-case font-medium">(optional – for margin of safety)</span>
                </label>
                <input
                  type="text" inputMode="decimal"
                  value={marketPrice}
                  onChange={(e) => { const v = validate(e.target.value, 6, 2); if (v !== null) setMarketPrice(v); }}
                  placeholder="e.g. 800"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20"
            >
              Calculate Intrinsic Value
            </button>
          </div>

          {/* ─── Results ─── */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />

              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h3 className="text-xl font-black tracking-tight">Valuation Summary</h3>
                  <BookOpen className="text-indigo-400" size={24} />
                </div>

                {!results ? (
                  <div className="py-20 text-center opacity-50">
                    <p className="text-slate-500 font-medium italic">Enter EPS and growth assumptions to calculate.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Intrinsic Value Hero */}
                    <div className="p-8 bg-indigo-600 rounded-[2rem] space-y-2 shadow-xl shadow-indigo-500/20 text-center">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Estimated Intrinsic Value</span>
                      <div className="text-5xl font-black">₹{fmt(results.intrinsicValue)}</div>
                      <span className="text-xs text-white/60 font-medium">Based on {years}-year DCF projection</span>
                    </div>

                    {/* Margin of Safety */}
                    {results.marginOfSafety !== null && results.valuation && (() => {
                      const cfg = valuationConfig[results.valuation as keyof typeof valuationConfig];
                      const VIcon = cfg.Icon;
                      return (
                        <div className={`p-6 ${cfg.bg} rounded-2xl border ${cfg.border} space-y-3`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Margin of Safety</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cfg.bg} ${cfg.text} border ${cfg.border} flex items-center gap-1.5`}>
                              <VIcon size={10} /> {cfg.label}
                            </span>
                          </div>
                          <div className={`text-3xl font-black ${cfg.text}`}>
                            {results.marginOfSafety > 0 ? "+" : ""}{results.marginOfSafety.toFixed(1)}%
                          </div>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">{cfg.desc}</p>
                        </div>
                      );
                    })()}

                    {/* Key Inputs Summary */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "EPS", value: `₹${eps || "—"}` },
                        { label: "Growth", value: `${growthRate}%` },
                        { label: "Discount", value: `${discountRate}%` },
                      ].map((item) => (
                        <div key={item.label} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                          <div className="text-lg font-black">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                "Price is what you pay, value is what you get." — Warren Buffett
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <RelatedTradingTools exclude={["/tools/trading/intrinsic-value"]} limit={4} />
        </div>
      </TradingToolLayout>
    </>
  );
}
