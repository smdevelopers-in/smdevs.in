"use client";

import { useState } from "react";
import TradingToolLayout from "@/components/tools/TradingToolLayout";
import RelatedTradingTools from "@/components/tools/RelatedTradingTools";
import {
  Search, TrendingUp, TrendingDown, Minus, BarChart3, Activity,
  DollarSign, Layers, AlertTriangle, Loader2, RefreshCw
} from "lucide-react";

// ─── Schemas ────────────────────────────────────────────────────────────────

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Free Stock Analyzer Tool – Analyze Stocks Instantly",
  "description": "Analyze stocks with valuation metrics, technical indicators, support and resistance levels, and beginner-friendly explanations.",
  "url": "https://smdevs.in/tools/trading/stock-analyzer",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smdevs.in" },
      { "@type": "ListItem", "position": 2, "name": "Trading Tools", "item": "https://smdevs.in/tools/trading" },
      { "@type": "ListItem", "position": 3, "name": "Stock Analyzer", "item": "https://smdevs.in/tools/trading/stock-analyzer" }
    ]
  }
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Stock Analyzer",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free stock analyzer with live data, technical indicators (SMA, RSI, MACD), valuation metrics, and beginner-friendly explanations.",
  "url": "https://smdevs.in/tools/trading/stock-analyzer"
};

// ─── FAQs ────────────────────────────────────────────────────────────────────

const FAQS = [
  { question: "What stock symbols can I analyze?", answer: "You can analyze most US-listed stocks using their standard ticker symbols (e.g., AAPL, TSLA, MSFT). For Indian stocks, add the exchange suffix: RELIANCE.NS for NSE, RELIANCE.BO for BSE. Data is sourced from Yahoo Finance's public API." },
  { question: "What is a P/E ratio?", answer: "The Price-to-Earnings ratio compares a stock's current price to its earnings per share. A P/E of 20 means investors are paying ₹20 for every ₹1 of earnings. Higher P/E generally indicates higher growth expectations. Compare within the same sector for context." },
  { question: "What is EPS?", answer: "EPS (Earnings Per Share) is the company's net profit divided by the number of outstanding shares. It is a key measure of profitability. Rising EPS over time generally signals a healthier, growing business." },
  { question: "What is the SMA?", answer: "SMA stands for Simple Moving Average — the average closing price over a specified number of days. The 20-day SMA tracks short-term trends, the 50-day tracks medium-term, and the 200-day is widely watched as a long-term trend indicator." },
  { question: "What does it mean when a stock is above its 200-day SMA?", answer: "A stock trading above its 200-day SMA is generally considered to be in a long-term uptrend. Many institutional investors use this level as a key filter — they prefer to buy only stocks above their 200-day MA." },
  { question: "What is RSI?", answer: "RSI (Relative Strength Index) is a momentum oscillator that measures the speed and magnitude of price changes on a 0–100 scale. RSI above 70 is traditionally considered overbought (possibly due for a pullback); below 30 is oversold (potentially oversold). RSI around 40–60 indicates neutral momentum." },
  { question: "What is MACD?", answer: "MACD (Moving Average Convergence Divergence) is a trend-following momentum indicator. It is calculated as the difference between the 12-day and 26-day EMA. A positive MACD suggests upward momentum; negative suggests downward. When MACD crosses above its signal line, it is often seen as a bullish signal." },
  { question: "What are support and resistance levels?", answer: "Support is a price level where buying interest tends to emerge and prevent further declines. Resistance is a level where selling pressure tends to cap price advances. These levels are calculated from recent price highs and lows and serve as potential entry/exit points." },
  { question: "What is market capitalization?", answer: "Market cap is the total market value of a company's outstanding shares (Price × Shares Outstanding). It classifies companies as large-cap (₹20,000+ crore or $10B+), mid-cap, or small-cap. Larger caps are generally more stable; smaller caps can be more volatile but offer higher growth potential." },
  { question: "What is the 52-week high/low?", answer: "The 52-week high is the highest price the stock has traded at in the past year; the 52-week low is the lowest. Stocks breaking above their 52-week high may indicate strong momentum; stocks near their 52-week low may be either a value opportunity or in long-term decline." },
  { question: "What is dividend yield?", answer: "Dividend yield = Annual Dividend per Share / Current Stock Price × 100. It shows how much income you receive relative to the stock's price. A 3% yield means you receive ₹3 in dividends for every ₹100 invested annually." },
  { question: "Is this real-time data?", answer: "The data is sourced from Yahoo Finance's public API and reflects delayed market prices (typically 15-20 minutes delayed for free data). For real-time data, use your broker's platform. This tool is designed for analysis and educational purposes." },
  { question: "What does 'Bullish trend' mean?", answer: "A bullish trend means the stock's technical indicators suggest upward price momentum — for example, price above major SMAs, rising RSI, and positive MACD. It does not guarantee the price will rise but suggests the current trend is positive." },
  { question: "What does 'Bearish trend' mean?", answer: "A bearish trend means technical indicators suggest downward pressure — price below major SMAs, low RSI, or negative MACD. This doesn't guarantee continued decline but signals caution from a technical standpoint." },
  { question: "Should I make investment decisions based solely on this tool?", answer: "No. This tool provides a snapshot of technical and fundamental data for educational purposes. Investment decisions should be based on comprehensive research including business analysis, financial statements, competitive positioning, and ideally guidance from a qualified financial advisor." },
];

// ─── Technical Calculations ─────────────────────────────────────────────────

function calcSMA(closes: number[], period: number): number | null {
  if (closes.length < period) return null;
  const slice = closes.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

function calcEMA(closes: number[], period: number): number[] {
  if (closes.length < period) return [];
  const k = 2 / (period + 1);
  const emas: number[] = [];
  let ema = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
  emas.push(ema);
  for (let i = period; i < closes.length; i++) {
    ema = closes[i] * k + ema * (1 - k);
    emas.push(ema);
  }
  return emas;
}

function calcRSI(closes: number[], period = 14): number | null {
  if (closes.length < period + 1) return null;
  const changes = closes.slice(1).map((c, i) => c - closes[i]);
  const relevant = changes.slice(-period);
  const gains = relevant.filter((c) => c > 0).reduce((a, b) => a + b, 0) / period;
  const losses = relevant.filter((c) => c < 0).map((c) => -c).reduce((a, b) => a + b, 0) / period;
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function calcMACD(closes: number[]): { macd: number; signal: number; histogram: number } | null {
  const ema12 = calcEMA(closes, 12);
  const ema26 = calcEMA(closes, 26);
  if (ema12.length === 0 || ema26.length === 0) return null;
  const diff = Math.min(ema12.length, ema26.length);
  const macdLine = Array.from({ length: diff }, (_, i) => ema12[ema12.length - diff + i] - ema26[ema26.length - diff + i]);
  const signal = calcEMA(macdLine, 9);
  if (signal.length === 0) return null;
  const lastMacd = macdLine[macdLine.length - 1];
  const lastSignal = signal[signal.length - 1];
  return { macd: lastMacd, signal: lastSignal, histogram: lastMacd - lastSignal };
}

function calcSupportResistance(highs: number[], lows: number[]) {
  const recentHighs = highs.slice(-20);
  const recentLows = lows.slice(-20);
  const resistance = Math.max(...recentHighs);
  const support = Math.min(...recentLows);
  return { support, resistance };
}

// ─── AI Explanations (rule-based) ───────────────────────────────────────────

function generateExplanations(data: any): string[] {
  const exp: string[] = [];
  const { currentPrice, sma20, sma50, sma200, rsi, macd, dividendYield, peRatio } = data;

  if (sma200 && currentPrice > sma200) {
    exp.push(`The stock is trading above its 200-day moving average (₹${sma200.toFixed(2)}), which is generally considered a sign of long-term upward momentum.`);
  } else if (sma200 && currentPrice < sma200) {
    exp.push(`The stock is trading below its 200-day moving average (₹${sma200.toFixed(2)}). This can indicate long-term weakness and many institutional investors view this cautiously.`);
  }

  if (rsi !== null) {
    if (rsi > 70) {
      exp.push(`RSI is at ${rsi.toFixed(1)}, approaching overbought territory (above 70). This suggests strong recent momentum but also a higher risk of a short-term pullback.`);
    } else if (rsi < 30) {
      exp.push(`RSI is at ${rsi.toFixed(1)}, in oversold territory (below 30). This may indicate the stock has been sold too aggressively and could be due for a bounce, but doesn't guarantee a reversal.`);
    } else {
      exp.push(`RSI is at ${rsi.toFixed(1)}, in neutral territory. Neither overbought nor oversold — momentum is balanced at this time.`);
    }
  }

  if (macd) {
    if (macd.histogram > 0) {
      exp.push(`The MACD histogram is positive (${macd.histogram.toFixed(2)}), indicating bullish momentum — the shorter-term moving average is above the longer-term one.`);
    } else {
      exp.push(`The MACD histogram is negative (${macd.histogram.toFixed(2)}), suggesting bearish momentum. The shorter-term moving average is below the longer-term average.`);
    }
  }

  if (peRatio && peRatio > 0) {
    if (peRatio > 50) {
      exp.push(`The P/E ratio of ${peRatio.toFixed(1)} is relatively high. Investors are paying a premium for this stock, possibly expecting strong future growth. High P/E stocks carry higher risk if growth expectations aren't met.`);
    } else if (peRatio < 15) {
      exp.push(`The P/E ratio of ${peRatio.toFixed(1)} is relatively low, which may indicate the stock is trading at a discount compared to its earnings — potentially a value opportunity, or it may reflect lower growth expectations.`);
    } else {
      exp.push(`The P/E ratio of ${peRatio.toFixed(1)} is within a moderate range, suggesting the market is pricing the stock in line with typical earnings expectations for its sector.`);
    }
  }

  if (dividendYield && dividendYield > 0) {
    exp.push(`The dividend yield is ${(dividendYield * 100).toFixed(2)}%, meaning investors receive this percentage as annual income relative to the current stock price.`);
  } else {
    exp.push(`This stock does not currently pay a dividend. The company likely reinvests profits into growth rather than distributing them to shareholders.`);
  }

  if (sma20 && sma50) {
    if (sma20 > sma50) {
      exp.push(`The 20-day SMA (₹${sma20.toFixed(2)}) is above the 50-day SMA (₹${sma50.toFixed(2)}), forming a short-term bullish cross — short-term momentum is stronger than the medium-term trend.`);
    } else {
      exp.push(`The 20-day SMA (₹${sma20.toFixed(2)}) is below the 50-day SMA (₹${sma50.toFixed(2)}), suggesting short-term weakness relative to the medium-term trend.`);
    }
  }

  return exp;
}

// ─── Trend Badge ─────────────────────────────────────────────────────────────

function TrendBadge({ value, label }: { value: number | null; label: string }) {
  if (value === null) return <span className="text-slate-400 text-xs font-medium">N/A</span>;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
      <span className="font-black text-white">₹{value.toFixed(2)}</span>
    </div>
  );
}

function OverallTrend({ rsi, macd, price, sma200 }: { rsi: number | null; macd: any; price: number; sma200: number | null }) {
  let bullish = 0, bearish = 0;
  if (rsi !== null) { if (rsi > 50) bullish++; else bearish++; }
  if (macd) { if (macd.histogram > 0) bullish++; else bearish++; }
  if (sma200 !== null) { if (price > sma200) bullish++; else bearish++; }

  const total = bullish + bearish;
  if (total === 0) return null;
  const pct = (bullish / total) * 100;

  const { label, color, Icon } = pct >= 60
    ? { label: "Bullish", color: "text-emerald-400", Icon: TrendingUp }
    : pct <= 40
    ? { label: "Bearish", color: "text-rose-400", Icon: TrendingDown }
    : { label: "Neutral", color: "text-amber-400", Icon: Minus };

  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={color} />
      <span className={`font-black text-sm ${color}`}>{label}</span>
    </div>
  );
}

// ─── Educational Content ─────────────────────────────────────────────────────

const EducationalContent = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is Stock Analysis?</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Stock analysis is the process of evaluating a company's financial health, growth prospects, and price behaviour to make informed investment decisions. Professional investors combine two broad approaches: fundamental analysis (what a business is worth) and technical analysis (what price and volume data tell us about supply and demand). Beginners often start with fundamental metrics and layer in technical signals as they gain experience.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fundamental Analysis</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Fundamental analysis asks: what is this business actually worth? It examines financial statements, competitive advantages (moats), management quality, industry dynamics, and macroeconomic conditions. Key metrics include revenue growth, profit margins, return on equity (ROE), debt levels, and free cash flow generation. The goal is to identify companies trading at a discount to their intrinsic value.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        The P/E ratio is one of the most widely used valuation metrics. It compares price to earnings — a high P/E may mean the market expects strong growth, while a low P/E may indicate pessimism or value. EPS (earnings per share) reveals underlying profitability per share and should grow consistently for a healthy business. Dividend yield shows income return relative to price — important for income-focused investors.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Technical Analysis</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Technical analysis studies historical price and volume data to identify patterns and trends. Unlike fundamental analysis, it makes no judgment about what a company is intrinsically worth — it simply asks: where are buyers and sellers positioned, and which direction is the trend?
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Moving averages smooth out price noise to reveal the underlying trend. The 200-day SMA is particularly important — stocks above it are generally considered in long-term uptrends. Momentum oscillators like RSI measure whether a stock is moving too fast in one direction and may be due for a reversal. MACD tracks the relationship between two exponential moving averages to identify trend direction and momentum shifts.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Use the P/E Ratio</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Never evaluate a P/E ratio in isolation. A P/E of 30 might be cheap for a high-growth software company (where peers trade at 60x) but expensive for a slow-growing utility (where peers trade at 12x). Always compare the P/E to: the company's own historical P/E range, the sector average, and the broader market P/E.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Also watch for earnings quality. If EPS is inflated by one-time items (asset sales, tax benefits) or depressed by temporary charges, the reported P/E can be misleading. Analysts often prefer "normalised" or "forward" P/E ratios based on estimated future earnings.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Understanding RSI</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        The Relative Strength Index (RSI) measures the velocity of price changes over the past 14 days on a 0–100 scale. Above 70: traditionally overbought — the stock may have risen too far, too fast. Below 30: oversold — the stock may have fallen excessively. Between 40–60: neutral momentum.
      </p>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Important caveat: RSI signals are more reliable in ranging markets than in strong trends. In a powerful uptrend, RSI can stay above 70 for extended periods. Always combine RSI with price action and other indicators rather than acting on it alone.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Support and Resistance Levels</h2>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        Support and resistance are price levels where the stock has historically experienced significant buying or selling. Support acts as a "floor" — when price approaches it, buyers often step in and push prices back up. Resistance acts as a "ceiling" — sellers become more active, limiting further advances. These levels become especially significant when they align with round numbers, previous highs/lows, or moving averages.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Common Beginner Mistakes</h2>
      <div className="space-y-3">
        {[
          { m: "Buying based on news headlines alone", f: "By the time news hits mainstream media, it is often already priced in. Focus on research, not headlines." },
          { m: "Ignoring the broader market trend", f: "Individual stocks are heavily influenced by the overall market. In bear markets, even great stocks fall." },
          { m: "Treating technical signals as guarantees", f: "No indicator works 100% of the time. Treat signals as probabilities, not certainties." },
          { m: "Overweighting a single metric", f: "A low P/E with poor growth and high debt can be a value trap. Always analyse multiple factors together." },
        ].map((item, i) => (
          <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">❌ {item.m}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">✅ {item.f}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 flex gap-4">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
        <strong>Disclaimer:</strong> The information provided by this tool is for educational purposes only and should not be considered financial or investment advice. Stock data is delayed and sourced from public APIs. Always verify with your broker and conduct thorough research before making investment decisions.
      </p>
    </div>
  </div>
);

// ─── Example Symbols ─────────────────────────────────────────────────────────

const EXAMPLES = ["AAPL", "TSLA", "MSFT", "RELIANCE.NS", "TCS.NS", "INFY.NS"];

// ─── Main Page ───────────────────────────────────────────────────────────────

type StockData = {
  symbol: string;
  shortName: string;
  currentPrice: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: number;
  trailingPE: number | null;
  trailingEps: number | null;
  dividendYield: number | null;
  closes: number[];
  highs: number[];
  lows: number[];
};

export default function StockAnalyzerPage() {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);

  const fetchStock = async (sym: string) => {
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const cleanSym = sym.trim().toUpperCase();

      // Fetch quote summary
      const quoteRes = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${cleanSym}?interval=1d&range=1y`,
        { next: { revalidate: 0 } }
      );

      if (!quoteRes.ok) throw new Error("Symbol not found or data unavailable.");
      const quoteJson = await quoteRes.json();

      const result = quoteJson?.chart?.result?.[0];
      if (!result) throw new Error("No data returned for this symbol. Try adding .NS for NSE or .BO for BSE (e.g., RELIANCE.NS).");

      const meta = result.meta;
      const quotes = result.indicators?.quote?.[0];
      const timestamps = result.timestamp;

      if (!quotes || !timestamps) throw new Error("Incomplete data. Please try again.");

      const closes = quotes.close.filter((c: any) => c !== null && !isNaN(c));
      const highs = quotes.high.filter((h: any) => h !== null && !isNaN(h));
      const lows = quotes.low.filter((l: any) => l !== null && !isNaN(l));

      setStockData({
        symbol: cleanSym,
        shortName: meta.shortName || cleanSym,
        currentPrice: meta.regularMarketPrice,
        dayHigh: meta.regularMarketDayHigh,
        dayLow: meta.regularMarketDayLow,
        fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
        marketCap: meta.marketCap || 0,
        trailingPE: meta.trailingPE || null,
        trailingEps: meta.trailingEps || null,
        dividendYield: meta.dividendYield || null,
        closes,
        highs,
        lows,
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch data. Please check the symbol and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = (sym?: string) => {
    const s = sym || symbol;
    if (!s.trim()) return;
    fetchStock(s);
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  const fmt = (n: number, decimals = 2) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const fmtLarge = (n: number) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`;
    return `${n.toLocaleString()}`;
  };

  // Derived technical values
  const sma20 = stockData ? calcSMA(stockData.closes, 20) : null;
  const sma50 = stockData ? calcSMA(stockData.closes, 50) : null;
  const sma200 = stockData ? calcSMA(stockData.closes, 200) : null;
  const rsi = stockData ? calcRSI(stockData.closes) : null;
  const macd = stockData ? calcMACD(stockData.closes) : null;
  const sr = stockData ? calcSupportResistance(stockData.highs, stockData.lows) : null;

  const explanations = stockData
    ? generateExplanations({
        currentPrice: stockData.currentPrice,
        sma20, sma50, sma200, rsi, macd,
        dividendYield: stockData.dividendYield,
        peRatio: stockData.trailingPE,
      })
    : [];

  const overallTrend = stockData && rsi !== null
    ? (() => {
        let b = 0, be = 0;
        if (rsi > 50) b++; else be++;
        if (macd && macd.histogram > 0) b++; else if (macd) be++;
        if (sma200 && stockData.currentPrice > sma200) b++; else if (sma200) be++;
        const total = b + be;
        if (total === 0) return "Neutral";
        const pct = (b / total) * 100;
        return pct >= 60 ? "Bullish" : pct <= 40 ? "Bearish" : "Neutral";
      })()
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <TradingToolLayout
        title="Stock Analyzer"
        description="Analyze any stock instantly — get live price data, valuation metrics, technical indicators (SMA, RSI, MACD), support & resistance levels, and plain-English explanations."
        howToUse={[
          "Enter a stock symbol (e.g., AAPL for Apple, RELIANCE.NS for Reliance on NSE).",
          "Click 'Analyze Stock' to fetch live data from Yahoo Finance.",
          "Review the overview, valuation metrics, and technical snapshot.",
          "Read the AI-generated plain-English explanations for each indicator.",
        ]}
        tips={[
          "For Indian stocks on NSE, add '.NS' suffix (e.g., HDFCBANK.NS). For BSE, use '.BO'.",
          "The 200-day SMA is a key level — stocks above it are generally in long-term uptrends.",
          "RSI above 70 = overbought caution; below 30 = oversold territory.",
          "Always combine technical signals with fundamental analysis for better decisions.",
        ]}
        faqs={FAQS}
        explanation={<EducationalContent />}
      >
        {/* Search Bar */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter stock symbol (e.g. AAPL, RELIANCE.NS)"
                className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg"
              />
            </div>
            <button
              onClick={() => handleAnalyze()}
              disabled={loading || !symbol.trim()}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />}
              {loading ? "Analyzing…" : "Analyze Stock"}
            </button>
          </div>

          {/* Example Chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-400">Examples:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => { setSymbol(ex); handleAnalyze(ex); }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all border border-transparent hover:border-blue-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-5 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl flex gap-3">
            <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 py-16 flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="font-bold">Fetching market data for {symbol}…</p>
          </div>
        )}

        {/* Results */}
        {stockData && !loading && (
          <div className="mt-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{stockData.shortName}</h2>
                <p className="text-sm font-bold text-slate-500">{stockData.symbol}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {stockData.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                {overallTrend && (
                  <div className={`text-sm font-black ${overallTrend === "Bullish" ? "text-emerald-500" : overallTrend === "Bearish" ? "text-rose-500" : "text-amber-500"}`}>
                    {overallTrend === "Bullish" ? "↑" : overallTrend === "Bearish" ? "↓" : "→"} {overallTrend}
                  </div>
                )}
              </div>
            </div>

            {/* Section 1: Overview */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
              <div className="flex items-center gap-2 mb-5">
                <DollarSign size={16} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Overview</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Current Price", value: fmt(stockData.currentPrice) },
                  { label: "Day High", value: fmt(stockData.dayHigh) },
                  { label: "Day Low", value: fmt(stockData.dayLow) },
                  { label: "52W High", value: fmt(stockData.fiftyTwoWeekHigh) },
                  { label: "52W Low", value: fmt(stockData.fiftyTwoWeekLow) },
                  { label: "Market Cap", value: fmtLarge(stockData.marketCap) },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                    <div className="text-lg font-black">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Valuation */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-5">
                <Layers size={16} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Valuation Metrics</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "P/E Ratio", value: stockData.trailingPE ? fmt(stockData.trailingPE) : "N/A" },
                  { label: "EPS", value: stockData.trailingEps ? fmt(stockData.trailingEps) : "N/A" },
                  { label: "Div. Yield", value: stockData.dividendYield ? `${(stockData.dividendYield * 100).toFixed(2)}%` : "N/A" },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Technical Snapshot */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Snapshot</span>
                </div>
                {overallTrend && (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    overallTrend === "Bullish" ? "bg-emerald-500/20 text-emerald-400" :
                    overallTrend === "Bearish" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                  }`}>{overallTrend}</span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <TrendBadge value={sma20} label="SMA 20" />
                <TrendBadge value={sma50} label="SMA 50" />
                <TrendBadge value={sma200} label="SMA 200" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">RSI (14)</span>
                  <span className={`font-black ${rsi !== null && rsi > 70 ? "text-rose-400" : rsi !== null && rsi < 30 ? "text-emerald-400" : "text-white"}`}>
                    {rsi !== null ? rsi.toFixed(1) : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">MACD</span>
                  <span className={`font-black ${macd && macd.macd > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {macd ? macd.macd.toFixed(2) : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">MACD Signal</span>
                  <span className="font-black text-white">{macd ? macd.signal.toFixed(2) : "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Section 4: Support & Resistance */}
            {sr && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30 text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Support</span>
                  <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">₹{fmt(sr.support)}</div>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-medium">Recent 20-day low zone</p>
                </div>
                <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-[2rem] border border-rose-100 dark:border-rose-900/30 text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Resistance</span>
                  <div className="text-3xl font-black text-rose-700 dark:text-rose-300">₹{fmt(sr.resistance)}</div>
                  <p className="text-xs text-rose-600/70 dark:text-rose-400/70 font-medium">Recent 20-day high zone</p>
                </div>
              </div>
            )}

            {/* Section 5: AI Explanations */}
            {explanations.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <BarChart3 size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Plain-English Analysis</span>
                </div>
                <ul className="space-y-3">
                  {explanations.map((exp, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      <span className="text-blue-500 font-black shrink-0 mt-0.5">→</span>
                      {exp}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-800">
                  These explanations are generated from rule-based logic and are for educational purposes only. Not financial advice.
                </p>
              </div>
            )}

            {/* Refresh */}
            <button
              onClick={() => fetchStock(stockData.symbol)}
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors"
            >
              <RefreshCw size={14} />
              Refresh data
            </button>
          </div>
        )}

        {/* Related Tools */}
        <div className="mt-8">
          <RelatedTradingTools exclude={["/tools/trading/stock-analyzer"]} limit={4} />
        </div>
      </TradingToolLayout>
    </>
  );
}
