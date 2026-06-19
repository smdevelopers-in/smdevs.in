"use client";

import { useState, useEffect, useCallback } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import RelatedTradingTools from "@/components/tools/RelatedTradingTools";
import { LineChart, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";

// ─── Schemas ────────────────────────────────────────────────────────────────

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Options Profit Calculator – Calls and Puts",
  "description": "Calculate option profit, loss, breakeven, ROI, and payoff instantly for call and put options.",
  "url": "https://smdevs.in/tools/trading/option-profit",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smdevs.in" },
      { "@type": "ListItem", "position": 2, "name": "Trading Tools", "item": "https://smdevs.in/tools/trading" },
      { "@type": "ListItem", "position": 3, "name": "Option Profit Calculator", "item": "https://smdevs.in/tools/trading/option-profit" }
    ]
  }
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Option Profit Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free calculator for call and put option profit, loss, breakeven price, ROI%, and net payoff with interactive payoff diagram.",
  "url": "https://smdevs.in/tools/trading/option-profit"
};

// ─── FAQs ────────────────────────────────────────────────────────────────────

const FAQS = [
  { question: "What is a call option?", answer: "A call option gives the buyer the right — but not the obligation — to purchase the underlying asset at the strike price before expiry. You buy a call when you expect the price to rise. If the price rises above the breakeven, the option becomes profitable." },
  { question: "What is a put option?", answer: "A put option gives the buyer the right to sell the underlying asset at the strike price before expiry. You buy a put when you expect the price to fall. If the underlying falls below the breakeven price, the put becomes profitable." },
  { question: "What is a premium in options?", answer: "The premium is the price you pay to buy an option contract. It represents the cost of the right conveyed by the option. Premiums are affected by the underlying price, strike price, time to expiry, implied volatility, and interest rates." },
  { question: "How is breakeven calculated for a call option?", answer: "For a call option, breakeven = Strike Price + Premium Paid per share. The underlying must trade above this level at expiry for the option buyer to make a profit." },
  { question: "How is breakeven calculated for a put option?", answer: "For a put option, breakeven = Strike Price − Premium Paid per share. The underlying must trade below this level at expiry for the put buyer to profit." },
  { question: "What is intrinsic value of an option?", answer: "Intrinsic value is the immediate exercise value of an option. For a call: max(0, Underlying Price − Strike Price). For a put: max(0, Strike Price − Underlying Price). Options with positive intrinsic value are 'in-the-money' (ITM)." },
  { question: "What is time decay (Theta)?", answer: "Time decay (Theta) is the loss in an option's value as time passes, all else being equal. Options lose value every day as expiry approaches, which is why option buyers want rapid price moves while option sellers benefit from slow, steady markets." },
  { question: "What is a lot size?", answer: "In Indian markets (NSE/BSE), options are traded in lots. Each lot represents a fixed number of shares (e.g., Nifty lot = 75). Your profit/loss is multiplied by the lot size, making position sizing critically important." },
  { question: "Can I lose more than the premium paid when buying options?", answer: "No. When you buy an option (call or put), your maximum loss is limited to the premium you paid. You cannot lose more than your initial investment. This makes buying options a defined-risk strategy." },
  { question: "What is ROI in options trading?", answer: "Return on Investment (ROI) = Net Profit / Total Premium Paid × 100. Because options require a relatively small premium compared to the underlying value, winning trades can generate very high ROI percentages — which is both the appeal and the risk of options." },
  { question: "What does 'in the money' mean?", answer: "A call option is in-the-money (ITM) when the underlying price is above the strike price. A put is ITM when the underlying is below the strike. ITM options have intrinsic value and are more likely to be exercised at expiry." },
  { question: "What does 'out of the money' mean?", answer: "An option is out-of-the-money (OTM) when it has no intrinsic value. OTM calls have a strike above the current price; OTM puts have a strike below the current price. They expire worthless if conditions don't change." },
  { question: "How does implied volatility affect option prices?", answer: "Higher implied volatility (IV) increases premiums because there is greater uncertainty about where the underlying will move. Buying options during high IV environments can be expensive; selling options during high IV can be lucrative but risky." },
  { question: "What is a payoff diagram?", answer: "A payoff diagram plots an option strategy's profit or loss at different underlying prices at expiry. It is a visual tool that helps traders instantly understand the risk/reward profile of a position before entering it." },
  { question: "Is options trading suitable for beginners?", answer: "Options involve more complexity and risk than simple stock buying. Beginners should first understand the basics — calls, puts, premiums, strike prices, and expiry — before trading with real money. Paper trading (simulated trading) is a safe way to practice." },
  { question: "What is the maximum profit for a call buyer?", answer: "For a call buyer, the maximum profit is theoretically unlimited because the underlying price can rise indefinitely. In practice, most traders set a profit target and exit before expiry to capture gains while time value still exists." },
  { question: "What is the maximum profit for a put buyer?", answer: "For a put buyer, the maximum profit is capped at: (Strike Price − 0) − Premium Paid, because a stock price cannot go below zero. In practice, stocks rarely go to zero and put buyers typically exit early to lock in gains." },
  { question: "Why do most option buyers lose money?", answer: "Statistics show that the majority of options expire worthless, meaning sellers collect the premium and buyers lose. This happens because options require not just the right direction but also the right timing and sufficient magnitude of move. Time decay erodes value every day." },
  { question: "What is the difference between American and European options?", answer: "American options can be exercised at any time before expiry. European options can only be exercised at expiry. Most Indian index options (Nifty, Bank Nifty) are European-style, while individual stock options are American-style." },
  { question: "Should I use this calculator for actual trading decisions?", answer: "This calculator provides accurate mathematical outputs based on your inputs, but it does not account for bid-ask spreads, brokerage charges, taxes, or real-time pricing. Use it to understand risk/reward profiles, but always verify with your broker's platform before placing actual trades." },
];

// ─── Payoff SVG Chart ────────────────────────────────────────────────────────

function PayoffChart({
  optionType,
  strikePrice,
  premium,
  breakeven,
}: {
  optionType: "call" | "put";
  strikePrice: number;
  premium: number;
  breakeven: number;
}) {
  const W = 500, H = 240;
  const pad = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  // Price range: breakeven ± 30%
  const midPrice = breakeven;
  const span = midPrice * 0.35;
  const minP = Math.max(0, midPrice - span);
  const maxP = midPrice + span;

  const pnlAt = (price: number) => {
    if (optionType === "call") return Math.max(-premium, price - strikePrice - premium);
    return Math.max(-premium, strikePrice - price - premium);
  };

  const pnls = [minP, ...Array.from({ length: 40 }, (_, i) => minP + (i / 39) * (maxP - minP)), maxP].map((p) => pnlAt(p));
  const minPnl = Math.min(...pnls, -premium * 1.2);
  const maxPnl = Math.max(...pnls, premium * 1.2);

  const toX = (price: number) => pad.left + ((price - minP) / (maxP - minP)) * chartW;
  const toY = (pnl: number) => pad.top + ((maxPnl - pnl) / (maxPnl - minPnl)) * chartH;

  const zeroY = toY(0);
  const prices = [minP, ...Array.from({ length: 40 }, (_, i) => minP + (i / 39) * (maxP - minP)), maxP];
  const points = prices.map((p) => `${toX(p)},${toY(pnlAt(p))}`).join(" ");

  // Split into profit (green) and loss (red) segments
  const profitPoints = prices
    .map((p) => ({ x: toX(p), y: toY(pnlAt(p)), pnl: pnlAt(p) }))
    .filter((pt) => pt.pnl >= 0)
    .map((pt) => `${pt.x},${pt.y}`)
    .join(" ");
  const lossPoints = prices
    .map((p) => ({ x: toX(p), y: toY(pnlAt(p)), pnl: pnlAt(p) }))
    .filter((pt) => pt.pnl <= 0)
    .map((pt) => `${pt.x},${pt.y}`)
    .join(" ");

  const breakevenX = toX(breakeven);
  const strikePriceX = toX(strikePrice);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label="Options payoff diagram">
      {/* Zero line */}
      <line x1={pad.left} y1={zeroY} x2={W - pad.right} y2={zeroY} stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />

      {/* Breakeven line */}
      <line x1={breakevenX} y1={pad.top} x2={breakevenX} y2={H - pad.bottom} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={breakevenX} y={pad.top - 6} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">BE</text>

      {/* Strike price line */}
      <line x1={strikePriceX} y1={pad.top} x2={strikePriceX} y2={H - pad.bottom} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <text x={strikePriceX} y={H - pad.bottom + 14} textAnchor="middle" fill="#94a3b8" fontSize="8">Strike</text>

      {/* Polyline: loss segment (red) */}
      {lossPoints && (
        <polyline points={lossPoints} fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {/* Polyline: profit segment (green) */}
      {profitPoints && (
        <polyline points={profitPoints} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {/* Y-axis labels */}
      {[maxPnl, 0, minPnl].map((v, i) => (
        <text key={i} x={pad.left - 6} y={toY(v) + 4} textAnchor="end" fill="#64748b" fontSize="9">
          {v >= 0 ? "+" : ""}{Math.round(v)}
        </text>
      ))}

      {/* X-axis labels */}
      {[minP, midPrice, maxP].map((p, i) => (
        <text key={i} x={toX(p)} y={H - pad.bottom + 14} textAnchor="middle" fill="#64748b" fontSize="9">
          {Math.round(p)}
        </text>
      ))}

      {/* Legend */}
      <circle cx={W - 110} cy={H - pad.bottom + 30} r="4" fill="#34d399" />
      <text x={W - 100} y={H - pad.bottom + 34} fill="#94a3b8" fontSize="9">Profit</text>
      <circle cx={W - 55} cy={H - pad.bottom + 30} r="4" fill="#f87171" />
      <text x={W - 45} y={H - pad.bottom + 34} fill="#94a3b8" fontSize="9">Loss</text>
    </svg>
  );
}

// ─── Educational Content ─────────────────────────────────────────────────────

const EducationalContent = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Understanding Options: Calls and Puts</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Options are financial derivatives that give the buyer the right — but not the obligation — to buy or sell an underlying asset at a predetermined price (the strike price) before or at expiry. Unlike buying shares outright, options provide leverage: you can control a large position with a relatively small premium outlay. This leverage is both the attraction and the danger of options trading.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        There are two fundamental types of options: calls and puts. A call option profits when the underlying price rises above the breakeven. A put option profits when the price falls below the breakeven. Together, they allow traders and investors to profit from price moves in either direction, hedge existing positions, or generate income through selling.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 space-y-3">
        <h3 className="font-black text-emerald-700 dark:text-emerald-400">📈 Call Option</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <li>• Buy when you expect price to <strong>rise</strong></li>
          <li>• Breakeven = Strike + Premium</li>
          <li>• Max loss = Premium paid</li>
          <li>• Profit potential = Unlimited</li>
        </ul>
      </div>
      <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 space-y-3">
        <h3 className="font-black text-rose-700 dark:text-rose-400">📉 Put Option</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <li>• Buy when you expect price to <strong>fall</strong></li>
          <li>• Breakeven = Strike − Premium</li>
          <li>• Max loss = Premium paid</li>
          <li>• Max profit = Strike − Premium (if stock → ₹0)</li>
        </ul>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">The Role of Premium</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        The premium is the price you pay to own an option. It consists of two components: intrinsic value and time value (also called extrinsic value). Intrinsic value is how much the option is already in-the-money. Time value is the additional amount traders pay for the possibility that the option will move further in-the-money before expiry.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        As expiry approaches, time value decays — a process called Theta decay. This is why option buyers need a significant price move in their favour quickly, while option sellers benefit from the passage of time even when prices don't move dramatically.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Breakeven: The True Cost of an Option</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Many beginners confuse the strike price with the breakeven price. The strike price is where the option gives you the right to buy or sell. But you also paid a premium, so the underlying needs to move beyond the strike by the premium amount just for you to break even.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        For a call with a ₹500 strike and ₹20 premium: you need the stock to close above ₹520 at expiry to be profitable. For a put with a ₹500 strike and ₹20 premium: you need it below ₹480. This is why understanding breakeven is so critical before entering any option trade.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Lot Size and Real Profit/Loss</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        In Indian derivative markets, options are traded in standardised lots. A lot represents a fixed number of shares or units of the underlying. For example, if the lot size for a stock is 500 and you buy 1 call at ₹10 premium, your total outlay is ₹5,000 (₹10 × 500). If the premium rises to ₹25, your profit is ₹7,500 — not just ₹15.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        This multiplication effect is why position sizing in options is essential. Never risk more lots than your account can afford to lose entirely — because the maximum loss on a bought option is always the full premium paid multiplied by the lot size.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Common Mistakes in Options Trading</h2>
      <div className="space-y-3">
        {[
          { mistake: "Ignoring time decay", fix: "Always check DTE (days to expiry). Options decay faster in the final 30 days. Buy more time than you think you need." },
          { mistake: "Buying OTM options hoping for a big move", fix: "OTM options need large, fast moves to be profitable. Most expire worthless. Start with ATM or slightly ITM options." },
          { mistake: "Not defining risk before entry", fix: "Know your maximum loss (always the premium paid × lot size) before clicking 'Buy'." },
          { mistake: "Confusing strike price with breakeven", fix: "The stock must move beyond strike + premium (call) or strike − premium (put) for you to make money." },
          { mistake: "Holding till expiry hoping for a turnaround", fix: "Most experienced traders exit options early to preserve remaining time value and limit losses." },
        ].map((item, i) => (
          <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">❌ {item.mistake}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">✅ {item.fix}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 flex gap-4">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
        <strong>Disclaimer:</strong> Options trading involves substantial risk and is not appropriate for all investors. This calculator is for educational purposes only and should not be considered financial or investment advice. Past results do not guarantee future performance.
      </p>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function OptionProfitCalculatorPage() {
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [strikePrice, setStrikePrice] = useState("");
  const [premium, setPremium] = useState("");
  const [lotSize, setLotSize] = useState("1");
  const [expiryPrice, setExpiryPrice] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculate = useCallback(() => {
    const sp = parseFloat(strikePrice);
    const pr = parseFloat(premium);
    const ls = parseFloat(lotSize);
    const ep = parseFloat(expiryPrice);

    if (isNaN(sp) || isNaN(pr) || isNaN(ls) || ls <= 0 || pr <= 0) {
      setResults(null);
      return;
    }

    const breakeven = optionType === "call" ? sp + pr : sp - pr;

    let intrinsicValue: number;
    if (optionType === "call") {
      intrinsicValue = Math.max(0, (isNaN(ep) ? sp : ep) - sp);
    } else {
      intrinsicValue = Math.max(0, sp - (isNaN(ep) ? sp : ep));
    }

    let profitLossPerUnit: number | null = null;
    let roi: number | null = null;
    let netPayoff: number | null = null;

    if (!isNaN(ep) && ep > 0) {
      if (optionType === "call") {
        profitLossPerUnit = Math.max(-pr, ep - sp - pr);
      } else {
        profitLossPerUnit = Math.max(-pr, sp - ep - pr);
      }
      netPayoff = profitLossPerUnit * ls;
      roi = (profitLossPerUnit / pr) * 100;
    }

    setResults({ breakeven, intrinsicValue, profitLossPerUnit, netPayoff, roi, sp, pr, ls });
  }, [optionType, strikePrice, premium, lotSize, expiryPrice]);

  const handleCalculate = () => {
    calculate();
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  useEffect(() => { calculate(); }, [calculate]);

  const validate = (val: string, maxInt = 6, maxDec = 2) => {
    if (val === "") return "";
    const regex = new RegExp(`^\\d{0,${maxInt}}(\\.\\d{0,${maxDec}})?$`);
    return regex.test(val) ? val : null;
  };

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

  const isProfit = results?.profitLossPerUnit !== null && results?.profitLossPerUnit >= 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <TradingToolLayout
        title="Option Profit Calculator"
        description="Calculate the exact profit, loss, breakeven price, and ROI for any call or put option trade. Includes an interactive payoff diagram to visualise your risk at expiry."
        formula="Call Breakeven = Strike + Premium  |  Put Breakeven = Strike − Premium  |  P&L = (Intrinsic Value − Premium) × Lot Size"
        howToUse={[
          "Select option type: Call (bullish) or Put (bearish).",
          "Enter the strike price of the option contract.",
          "Enter the premium paid per unit (option price).",
          "Enter the lot size (number of units in the contract).",
          "Enter the expected expiry price to see your profit or loss.",
        ]}
        tips={[
          "The maximum loss for an option buyer is always the total premium paid (Premium × Lot Size).",
          "Time decay (Theta) erodes option value every day — buy options with enough time to expiry.",
          "High Implied Volatility (IV) means expensive premiums. Avoid buying options when IV is elevated.",
          "Always know your breakeven before you enter: it must be realistic given the time to expiry.",
        ]}
        faqs={FAQS}
        explanation={<EducationalContent />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Inputs ─── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Option Type Toggle */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">
                Option Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["call", "put"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOptionType(type)}
                    className={`py-4 rounded-2xl font-black text-sm capitalize transition-all ${
                      optionType === type
                        ? type === "call"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                          : "bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700"
                    }`}
                  >
                    {type === "call" ? "📈 Call" : "📉 Put"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Strike Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Strike Price</label>
                <input
                  type="text" inputMode="decimal" value={strikePrice}
                  onChange={(e) => { const v = validate(e.target.value); if (v !== null) setStrikePrice(v); }}
                  placeholder="e.g. 500"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              {/* Premium */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 pl-1">Premium Paid (per unit)</label>
                <input
                  type="text" inputMode="decimal" value={premium}
                  onChange={(e) => { const v = validate(e.target.value); if (v !== null) setPremium(v); }}
                  placeholder="e.g. 20"
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              {/* Lot Size */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 pl-1">Lot Size (units)</label>
                <input
                  type="text" inputMode="decimal" value={lotSize}
                  onChange={(e) => { const v = validate(e.target.value, 6, 0); if (v !== null) setLotSize(v); }}
                  placeholder="e.g. 75"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              {/* Expiry Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-violet-500 pl-1">Expiry Price (expected)</label>
                <input
                  type="text" inputMode="decimal" value={expiryPrice}
                  onChange={(e) => { const v = validate(e.target.value); if (v !== null) setExpiryPrice(v); }}
                  placeholder="e.g. 540"
                  className="w-full px-6 py-4 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-900/30 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-violet-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20"
            >
              Calculate Option P&L
            </button>
          </div>

          {/* ─── Results ─── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <h3 className="text-xl font-black tracking-tight">Option P&L Summary</h3>
                  <LineChart className="text-violet-400" size={24} />
                </div>

                {!results ? (
                  <div className="py-16 text-center opacity-50">
                    <p className="text-slate-500 font-medium italic">Enter strike price and premium to calculate.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Breakeven Hero */}
                    <div className="p-6 bg-blue-600 rounded-[2rem] flex items-center justify-between shadow-xl shadow-blue-500/20">
                      <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Breakeven Price</span>
                        <div className="text-4xl font-black mt-1">₹{fmt(results.breakeven)}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black uppercase tracking-widest text-white/50">Type</span>
                        <div className="text-lg font-black capitalize mt-1">{optionType}</div>
                      </div>
                    </div>

                    {/* P&L + ROI (if expiry price given) */}
                    {results.profitLossPerUnit !== null && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-5 rounded-2xl border text-center space-y-1 ${isProfit ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Payoff</span>
                          <div className={`text-2xl font-black ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                            {results.netPayoff >= 0 ? "+" : ""}₹{fmt(results.netPayoff)}
                          </div>
                        </div>
                        <div className={`p-5 rounded-2xl border text-center space-y-1 ${isProfit ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ROI</span>
                          <div className={`text-2xl font-black ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                            {fmtPct(results.roi!)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Intrinsic Value + Max Loss */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Intrinsic Value</span>
                        <div className="text-xl font-black">₹{fmt(results.intrinsicValue)}</div>
                      </div>
                      <div className="p-5 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Max Loss</span>
                        <div className="text-xl font-black text-rose-400">
                          ₹{fmt(parseFloat(premium || "0") * parseFloat(lotSize || "1"))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payoff Chart */}
            {results && (
              <div className="bg-slate-900 rounded-[2.5rem] p-6 border border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Payoff Diagram at Expiry</p>
                <PayoffChart
                  optionType={optionType}
                  strikePrice={parseFloat(strikePrice) || 0}
                  premium={parseFloat(premium) || 0}
                  breakeven={results.breakeven}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <RelatedTradingTools exclude={["/tools/trading/option-profit"]} limit={4} />
        </div>
      </TradingToolLayout>
    </>
  );
}
