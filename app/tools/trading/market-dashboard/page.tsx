"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, Globe, BarChart3, DollarSign, Activity, 
  Sun, Moon, RefreshCw, Clock, AlertTriangle, BookOpen,
  ChevronDown, ChevronUp, ArrowRight, Zap, Shield,
  CheckCircle2, XCircle, Info, Star, Target, Scale,
  Calculator, LineChart, PiggyBank
} from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/tools/Breadcrumbs';
import { MarketCard } from '@/components/market/MarketCard';
import { MarketSection } from '@/components/market/MarketSection';
import { SentimentCard } from '@/components/market/SentimentCard';
import { ChecklistCard } from '@/components/market/ChecklistCard';
import InsightsPanel, { generateInsights } from '@/components/market/InsightsPanel';
import { HistoricalTable } from '@/components/market/HistoricalTable';
import { HeroStatus } from '@/components/market/HeroStatus';
import LoadingSkeleton from '@/components/market/LoadingSkeleton';
import type { 
  MarketApiResponse, MarketDataByCategory, MarketData, 
  ChecklistItem, Market, SentimentResult 
} from '@/types/market';
import { getMarketStatus, formatLastUpdated } from '@/lib/market-calculations';

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Free Market Dashboard — Indian & Global Markets Daily Overview",
  "description": "Track Nifty 50, Bank Nifty, Gift Nifty, Dow Jones, Gold, Crude Oil, Currency trends and daily Market Sentiment in one free premium dashboard.",
  "url": "https://smdevs.in/tools/trading/market-dashboard",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smdevs.in" },
      { "@type": "ListItem", "position": 2, "name": "Trading Tools", "item": "https://smdevs.in/tools/trading" },
      { "@type": "ListItem", "position": 3, "name": "Market Dashboard", "item": "https://smdevs.in/tools/trading/market-dashboard" }
    ]
  }
};

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Market Dashboard",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "description": "Free market dashboard tracking Indian Markets, Global Markets, Commodities, Currencies and Market Sentiment. Updated every 5 minutes.",
  "url": "https://smdevs.in/tools/trading/market-dashboard"
};

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What is Gift Nifty and why does it matter?",
    answer: "Gift Nifty (now called GIFT Nifty, traded on NSE IX in GIFT City, Gujarat) is a futures contract based on the Nifty 50 index that trades before Indian market hours. Traders use it as a leading indicator — if Gift Nifty is trading above the previous close, Indian markets are likely to open positive. It replaced the older SGX Nifty (Singapore Exchange) as the primary pre-market indicator for Nifty direction."
  },
  {
    question: "Why do US Markets affect Indian markets?",
    answer: "Indian markets have strong correlations with US markets due to Foreign Institutional Investor (FII) flows, global risk sentiment, and interconnected economies. When the S&P 500 or Dow Jones closes strongly positive, FIIs typically increase allocations to emerging markets like India the next day. When US markets crash, risk-off sentiment causes FIIs to sell Indian equities as well. The correlation is particularly strong with Nifty 50."
  },
  {
    question: "How does crude oil price affect Indian markets?",
    answer: "India is one of the world's largest crude oil importers, spending over $100 billion annually. Rising crude prices increase import bills, widen the Current Account Deficit (CAD), weaken the Indian Rupee, cause inflation, and hurt sectors like paints (Asian Paints, Berger), tyres (MRF, Apollo), and aviation (IndiGo, Air India). Falling crude is very positive for India — it reduces inflation, strengthens the Rupee, and boosts the above sectors."
  },
  {
    question: "What is India VIX and why is it important?",
    answer: "India VIX (Volatility Index) measures the expected volatility in the Nifty 50 over the next 30 days, derived from options prices. A VIX below 15 indicates calm, stable markets with low fear. A VIX above 20 signals elevated anxiety and wider price swings. Option premiums become expensive when VIX is high. Traders monitor VIX to gauge market risk: buying options is attractive at low VIX (cheaper premiums), while selling options is more rewarding at high VIX."
  },
  {
    question: "How is the Market Sentiment calculated?",
    answer: "Our sentiment engine uses 7 deterministic factors: Nifty 50/Gift Nifty direction, US Markets (Dow Jones), Asian Markets (Nikkei), India VIX level, Crude Oil trend, Gold trend, and Dollar Index direction. Each factor is scored +1 (bullish) or -1 (bearish) based on specific thresholds. The total score determines sentiment: ≥+4 = Very Bullish, +2 to +3 = Bullish, -1 to +1 = Neutral, -2 to -3 = Bearish, ≤-4 = Very Bearish. No AI or randomness — purely deterministic rules."
  },
  {
    question: "How often is this dashboard updated?",
    answer: "During NSE market hours (Mon–Fri 9:15 AM to 3:30 PM IST), the dashboard refreshes every 5 minutes. Outside market hours, it updates once per hour. You can also manually trigger a refresh using the Refresh button in the header. The Last Updated timestamp shows exactly when the data was last fetched. Historical data is stored permanently in our database."
  },
  {
    question: "Is the data real-time?",
    answer: "The data is near-real-time, delayed by 5–15 minutes depending on the exchange. Yahoo Finance provides 15-minute delayed data for most global indices, while Upstox data for Indian markets like Nifty 50 and Bank Nifty is closer to real-time (with minor delays). For trading decisions requiring tick-by-tick data, always use your broker's platform. This dashboard is designed for daily market overview and bias formation."
  },
  {
    question: "Can I use this dashboard before market open?",
    answer: "Absolutely — that's the primary use case. Use this dashboard between 7:00 AM and 9:15 AM IST to get your morning market briefing. Check Gift Nifty direction, US market close, Asian market performance, Gold, Crude, and Dollar trends. The Morning Checklist section provides a structured pre-market review. The Sentiment Engine gives you an overall market bias before you place your first trade."
  },
  {
    question: "What is Gold's relationship with the stock market?",
    answer: "Gold is traditionally a 'safe haven' asset — investors buy gold when they are fearful about equities. Strong gold with simultaneously weak equities is a 'risk-off' signal. When gold rises sharply (+1.5% or more), it often indicates that global institutions are moving money to safety, which is generally bearish for Indian equities. However, gold sometimes rises alongside equities during inflationary periods, so context always matters."
  },
  {
    question: "Why does the Dollar Index matter for Indian markets?",
    answer: "The US Dollar Index (DXY) measures the dollar against a basket of major currencies. A strong dollar (rising DXY) weakens the Indian Rupee — each time the Rupee depreciates, FIIs face currency losses on their Indian holdings, prompting selling. A strong dollar is also negative for commodities priced in USD. However, IT stocks benefit from a weak Rupee as they earn in dollars. A weak dollar is generally positive for Indian equities and commodities."
  },
  {
    question: "What are Nifty Futures and how are they different from Nifty 50?",
    answer: "Nifty 50 is the spot index showing the actual current value of the top 50 NSE stocks. Nifty Futures are derivative contracts that allow you to buy or sell the Nifty at a specified future date. Futures trade at a premium or discount to spot (called 'basis'). The spread between futures and spot tells you about market sentiment — a large premium suggests bullishness, while a discount (backwardation) signals bearishness or near-term uncertainty."
  },
  {
    question: "How should beginners use this dashboard?",
    answer: "Start with the Morning Checklist before market open. Check: (1) Did US markets close positive or negative? (2) Are Asian markets trading up or down? (3) Is Gift Nifty above or below yesterday's close? (4) Is India VIX elevated? (5) Is Crude Oil rising or falling? Based on these 5 factors, you'll have a clear sense of market bias. The Sentiment Engine consolidates all this into a single rating. For beginners: trade only when sentiment aligns with your trade direction."
  },
  {
    question: "What is the Morning Trading Checklist?",
    answer: "The Morning Trading Checklist is a structured pre-market review tool showing the status of 8 key market factors: US Markets close, Asian Markets direction, Gift Nifty position, Gold trend, Crude Oil trend, Dollar trend, India VIX level, and Overall Bias. Each item shows Complete (data positive), Pending (awaiting data), or Neutral (neither clearly bullish nor bearish). This checklist helps traders form a systematic view rather than reacting emotionally."
  },
  {
    question: "What is Bank Nifty and why is it tracked separately?",
    answer: "Bank Nifty is the sectoral index of the top 12 banking stocks on NSE, including HDFC Bank, ICICI Bank, Kotak, Axis Bank, SBI, and others. Banking stocks are highly sensitive to interest rates, credit growth, and liquidity conditions. Bank Nifty is more volatile than Nifty 50 — traders often use it for intraday options trading due to higher premium and movement. Tracking it separately helps identify if strength or weakness is broad-market or sector-specific."
  },
  {
    question: "Can I use this data for intraday trading?",
    answer: "Yes, but with appropriate expectations. This dashboard provides daily and near-real-time snapshots — it's best for forming your morning bias and understanding the macro environment. For intraday entry/exit, you'll need 1-minute or 5-minute candlestick data from your broker's terminal. Use this dashboard to decide your directional bias (bullish/bearish/neutral) and use your broker's charts for precise timing of entries."
  },
  {
    question: "How is historical data stored and displayed?",
    answer: "We store daily snapshots of all 25+ market instruments in our database. The Historical Data section allows you to view price history for any instrument over Today, 7 Days, 30 Days, or 12 Months. Data is displayed in a sortable table showing Open, High, Low, Close, Change, and Change%. This historical data is accumulated over time — the more you visit, the richer the history becomes."
  },
  {
    question: "What markets are covered in this dashboard?",
    answer: "We cover 23+ market instruments across 5 categories: Indian Markets (Nifty 50, Bank Nifty, Gift Nifty, Nifty Futures, BankNifty Futures, India VIX), Global Markets (Dow Jones, Nasdaq, S&P 500, Nikkei 225, Hang Seng, DAX, FTSE 100), Commodities (Gold, Silver, Crude Oil WTI, Natural Gas, Copper), and Currencies (USD/INR, EUR/INR, GBP/INR, JPY/INR, Dollar Index)."
  },
  {
    question: "Why does this dashboard use Yahoo Finance data?",
    answer: "Yahoo Finance provides a publicly accessible API that covers global markets, commodities, and currencies with 15-minute delayed data. For Indian markets, we also use the Upstox API which provides more accurate near-real-time data during NSE hours. This combination ensures maximum coverage with reliable fallback: if Upstox data is unavailable, Yahoo Finance data is used. If both fail, the last stored snapshot is displayed."
  },
  {
    question: "What should I do when the dashboard shows 'Latest available data'?",
    answer: "This message appears when live data cannot be fetched — usually due to market closure (weekends, holidays) or temporary API unavailability. The data shown is the most recent snapshot stored in our database. During weekends or NSE holidays, this will show Friday's closing data. Try refreshing after a few minutes. If you consistently see this during market hours, our team is notified and will resolve it promptly."
  }
];

// ─── Related Trading Tools ────────────────────────────────────────────────────

const QUICK_TOOLS = [
  { title: "Pivot Calculator", href: "/tools/trading/pivot-calculator", icon: Zap, desc: "Generate S/R levels for intraday trading", color: "amber" },
  { title: "Position Size Calculator", href: "/tools/trading/position-size", icon: Target, desc: "Calculate ideal trade size based on your risk", color: "emerald" },
  { title: "Risk Reward Calculator", href: "/tools/trading/risk-reward", icon: Scale, desc: "Analyse potential profit vs loss before entry", color: "rose" },
  { title: "Profit/Loss Calculator", href: "/tools/trading/profit-loss", icon: Calculator, desc: "Calculate net profit or loss for any trade", color: "blue" },
  { title: "Break-Even Calculator", href: "/tools/trading/break-even", icon: Shield, desc: "Find your exact break-even price point", color: "teal" },
  { title: "Stock Analyzer", href: "/tools/trading/stock-analyzer", icon: BarChart3, desc: "Analyze stocks with live technical indicators", color: "indigo" },
  { title: "SIP Calculator", href: "/tools/trading/sip-calculator", icon: PiggyBank, desc: "Plan your SIP investments with step-up options", color: "violet" },
  { title: "Option Profit Calculator", href: "/tools/trading/option-profit", icon: LineChart, desc: "Calculate options P&L and breakeven price", color: "purple" },
];

const TOOL_COLOR_MAP: Record<string, string> = {
  amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? 'border-fuchsia-300 dark:border-fuchsia-700 shadow-md shadow-fuchsia-100 dark:shadow-fuchsia-900/20'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${
          open ? 'bg-fuchsia-50 dark:bg-fuchsia-900/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
        aria-expanded={open}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className={`font-bold text-sm leading-snug ${open ? 'text-fuchsia-700 dark:text-fuchsia-400' : 'text-slate-900 dark:text-white'}`}>
          {q}
        </span>
        <span className={`shrink-0 ${open ? 'text-fuchsia-600' : 'text-slate-400'}`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyMarketCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
      </div>
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-4" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Build checklist from market data ────────────────────────────────────────

function buildChecklist(data: MarketDataByCategory | null): ChecklistItem[] {
  const getSnap = (items: MarketData[], symbol: string) =>
    items.find(d => d.market.symbol === symbol || d.market.yahoo_symbol === symbol)?.snapshot ?? null;

  const usMkt = data ? getSnap(data.globalIndex, '^DJI') : null;
  const asianMkt = data ? getSnap(data.globalIndex, '^N225') : null;
  const giftNifty = data ? getSnap(data.indianIndex, 'GIFT_NIFTY') : null;
  const gold = data ? getSnap(data.commodities, 'GC=F') : null;
  const crude = data ? getSnap(data.commodities, 'CL=F') : null;
  const dollar = data ? getSnap(data.currency, 'DX-Y.NYB') : null;
  const vix = data ? getSnap(data.volatility, '^INDIAVIX') : null;

  const statusOf = (snap: typeof usMkt, bullish: (s: typeof usMkt) => boolean, bearish: (s: typeof usMkt) => boolean) => {
    if (!snap) return 'neutral' as const;
    if (bullish(snap)) return 'complete' as const;
    if (bearish(snap)) return 'pending' as const;
    return 'neutral' as const;
  };

  return [
    {
      id: 'us-market',
      label: 'US Market Closed',
      icon: '🇺🇸',
      status: statusOf(usMkt, s => (s?.change_percent ?? 0) > 0, s => (s?.change_percent ?? 0) < -0.5),
      value: usMkt ? `${(usMkt.change_percent ?? 0) > 0 ? '+' : ''}${(usMkt.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: usMkt
        ? `Dow Jones ${(usMkt.change_percent ?? 0) > 0 ? 'closed positive ✅' : (usMkt.change_percent ?? 0) < 0 ? 'closed negative ⚠️' : 'closed flat ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'asian-markets',
      label: 'Asian Markets',
      icon: '🌏',
      status: statusOf(asianMkt, s => (s?.change_percent ?? 0) > 0.3, s => (s?.change_percent ?? 0) < -0.3),
      value: asianMkt ? `${(asianMkt.change_percent ?? 0) > 0 ? '+' : ''}${(asianMkt.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: asianMkt
        ? `Nikkei ${(asianMkt.change_percent ?? 0) > 0.3 ? 'positive 📈' : (asianMkt.change_percent ?? 0) < -0.3 ? 'weak 📉' : 'flat ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'gift-nifty',
      label: 'Gift Nifty',
      icon: '🇮🇳',
      status: statusOf(giftNifty, s => (s?.change_percent ?? 0) > 0.3, s => (s?.change_percent ?? 0) < -0.3),
      value: giftNifty ? `${(giftNifty.change_percent ?? 0) > 0 ? '+' : ''}${(giftNifty.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: giftNifty
        ? `${(giftNifty.change_percent ?? 0) > 0.3 ? 'Above prev close 🚀' : (giftNifty.change_percent ?? 0) < -0.3 ? 'Below prev close ⚠️' : 'Near prev close ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'gold',
      label: 'Gold Trend',
      icon: '🥇',
      status: statusOf(gold, s => (s?.change_percent ?? 0) < -0.3, s => (s?.change_percent ?? 0) > 1.2),
      value: gold ? `${(gold.change_percent ?? 0) > 0 ? '+' : ''}${(gold.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: gold
        ? `Gold ${(gold.change_percent ?? 0) > 1 ? 'rising strongly (risk-off) ⚠️' : (gold.change_percent ?? 0) < -0.5 ? 'falling (risk-on) ✅' : 'stable ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'crude',
      label: 'Crude Oil Trend',
      icon: '🛢️',
      status: statusOf(crude, s => (s?.change_percent ?? 0) < -1, s => (s?.change_percent ?? 0) > 2),
      value: crude ? `${(crude.change_percent ?? 0) > 0 ? '+' : ''}${(crude.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: crude
        ? `Crude ${(crude.change_percent ?? 0) < -1 ? 'falling (good for India) ✅' : (crude.change_percent ?? 0) > 2 ? 'rising sharply (bearish for India) ⚠️' : 'stable ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'dollar',
      label: 'Dollar Trend',
      icon: '💵',
      status: statusOf(dollar, s => (s?.change_percent ?? 0) < -0.3, s => (s?.change_percent ?? 0) > 0.5),
      value: dollar ? `${(dollar.change_percent ?? 0) > 0 ? '+' : ''}${(dollar.change_percent ?? 0).toFixed(2)}%` : 'N/A',
      detail: dollar
        ? `Dollar ${(dollar.change_percent ?? 0) > 0.5 ? 'strengthening (weak INR) ⚠️' : (dollar.change_percent ?? 0) < -0.3 ? 'weakening (good for markets) ✅' : 'stable ➖'}`
        : 'Data unavailable',
    },
    {
      id: 'vix',
      label: 'India VIX',
      icon: '📊',
      status: statusOf(vix, s => (s?.close ?? 20) < 15, s => (s?.close ?? 20) > 20),
      value: vix?.close != null ? vix.close.toFixed(2) : 'N/A',
      detail: vix
        ? `VIX at ${vix.close?.toFixed(2) ?? 'N/A'} — ${(vix.close ?? 20) < 15 ? 'calm market 🟢' : (vix.close ?? 20) > 20 ? 'elevated fear 🔴' : 'moderate 🟡'}`
        : 'Data unavailable',
    },
    {
      id: 'overall-bias',
      label: 'Overall Bias',
      icon: '🎯',
      status: 'neutral',
      value: 'See Sentiment',
      detail: 'Check the Market Sentiment Engine below for overall market bias',
    },
  ];
}

// ─── Disclaimer Ticker ───────────────────────────────────────────────────────

const DISCLAIMER_TEXT = 
  '⚠️ Data delayed 15–20 min · Not financial advice · For educational purposes only · ' +
  'Always verify prices with your broker · Past performance ≠ future results · ' +
  'NSE market hours: Mon–Fri 9:15 AM – 3:30 PM IST · '

function DisclaimerTicker() {
  return (
    <div className="relative overflow-hidden bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl py-2.5">
      {/* fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-50 dark:from-[#1a1100] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-amber-50 dark:from-[#1a1100] to-transparent z-10" />
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'market-ticker 30s linear infinite',
        }}
      >
        {/* Repeat text twice for seamless loop */}
        <span className="text-[11px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide pr-8">
          {DISCLAIMER_TEXT}{DISCLAIMER_TEXT}
        </span>
        <span className="text-[11px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide pr-8">
          {DISCLAIMER_TEXT}{DISCLAIMER_TEXT}
        </span>
      </div>
      <style>{`
        @keyframes market-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function MarketDashboardPage() {
  const [apiData, setApiData] = useState<MarketApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'cache'>('live');

  const fetchMarketData = useCallback(async () => {
    try {
      const res = await fetch('/api/market', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: MarketApiResponse = await res.json();
      setApiData(json);
      setDataSource('live');
      setError(null);
    } catch (err: any) {
      setError('Could not load live data. Showing latest available data.');
      setDataSource('cache');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetch('/api/market', { method: 'POST' });
      await fetchMarketData();
    } catch {
      // silently fail — fetchMarketData will show error
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchMarketData]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // Auto-refresh every 5 min during market hours, 60 min otherwise
  useEffect(() => {
    const status = getMarketStatus();
    const interval = status === 'open' ? 5 * 60 * 1000 : 60 * 60 * 1000;
    const timer = setInterval(fetchMarketData, interval);
    return () => clearInterval(timer);
  }, [fetchMarketData]);

  const data = apiData?.data ?? null;
  const sentiment = apiData?.sentiment;
  const marketStatus = apiData?.marketStatus ?? getMarketStatus();
  const lastRefreshed = apiData?.lastRefreshed ?? null;
  const checklistItems = buildChecklist(data);
  const insights = data ? generateInsights(data) : [];
  const allMarkets: Market[] = data
    ? [
        ...data.indianIndex.map(d => d.market),
        ...data.globalIndex.map(d => d.market),
        ...data.commodities.map(d => d.market),
        ...data.currency.map(d => d.market),
        ...data.volatility.map(d => d.market),
      ]
    : [];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }) }} />

      <div className="min-h-screen bg-white dark:bg-slate-950">

        {/* ─── Hero Section ─────────────────────────────────────────────── */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                <Activity size={12} />
                Trading Suite — Market Dashboard
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Market <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl leading-relaxed max-w-2xl">
                Track Indian Markets, Global Markets, Commodities, Currency Trends and Daily Market Sentiment in one place — your complete morning market briefing, free forever.
              </p>
              <HeroStatus
                lastRefreshed={lastRefreshed}
                marketStatus={marketStatus}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-20">

          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Trading Tools", href: "/tools/trading" },
            { label: "Market Dashboard" }
          ]} />

          {/* Disclaimer Ticker */}
          <DisclaimerTicker />

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Latest Available Market Data</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* ─── Section 1: Indian Markets ───────────────────────────────── */}
          <section id="indian-markets" aria-label="Indian Markets">
            <MarketSection
              title="Indian Markets"
              subtitle="NSE • Live Indices & Futures"
              icon={<TrendingUp className="w-6 h-6" />}
              iconBgColor="bg-orange-50 dark:bg-orange-900/20"
              iconColor="text-orange-600 dark:text-orange-400"
              badge="NSE Live"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => <EmptyMarketCard key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data?.indianIndex.map(d => (
                    <MarketCard key={d.market.id} market={d.market} snapshot={d.snapshot} />
                  ))}
                  {data?.volatility.map(d => (
                    <MarketCard key={d.market.id} market={d.market} snapshot={d.snapshot} />
                  ))}
                  {(!data?.indianIndex.length && !data?.volatility.length) && (
                    <p className="col-span-3 text-center text-slate-400 py-8 font-medium text-sm">
                      No data available. Click Refresh to load latest data.
                    </p>
                  )}
                </div>
              )}
            </MarketSection>
          </section>

          {/* ─── Section 2: Global Markets ───────────────────────────────── */}
          <section id="global-markets" aria-label="Global Markets">
            <MarketSection
              title="Global Markets"
              subtitle="US • Europe • Asia"
              icon={<Globe className="w-6 h-6" />}
              iconBgColor="bg-blue-50 dark:bg-blue-900/20"
              iconColor="text-blue-600 dark:text-blue-400"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(7)].map((_, i) => <EmptyMarketCard key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {data?.globalIndex.map(d => (
                    <MarketCard key={d.market.id} market={d.market} snapshot={d.snapshot} />
                  ))}
                </div>
              )}
            </MarketSection>
          </section>

          {/* ─── Section 3: Commodities ──────────────────────────────────── */}
          <section id="commodities" aria-label="Commodities">
            <MarketSection
              title="Commodities"
              subtitle="Gold • Silver • Crude • Energy"
              icon={<Star className="w-6 h-6" />}
              iconBgColor="bg-yellow-50 dark:bg-yellow-900/20"
              iconColor="text-yellow-600 dark:text-yellow-400"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => <EmptyMarketCard key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {data?.commodities.map(d => (
                    <MarketCard key={d.market.id} market={d.market} snapshot={d.snapshot} />
                  ))}
                </div>
              )}
            </MarketSection>
          </section>

          {/* ─── Section 4: Currency ─────────────────────────────────────── */}
          <section id="currency" aria-label="Currency Markets">
            <MarketSection
              title="Currency"
              subtitle="USD/INR • EUR/INR • Dollar Index"
              icon={<DollarSign className="w-6 h-6" />}
              iconBgColor="bg-green-50 dark:bg-green-900/20"
              iconColor="text-green-600 dark:text-green-400"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => <EmptyMarketCard key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {data?.currency.map(d => (
                    <MarketCard key={d.market.id} market={d.market} snapshot={d.snapshot} />
                  ))}
                </div>
              )}
            </MarketSection>
          </section>

          {/* ─── Section 5: Market Sentiment Engine ──────────────────────── */}
          <section id="market-sentiment" aria-label="Market Sentiment Engine">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-900/20 flex items-center justify-center text-fuchsia-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Market Sentiment Engine</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rule-Based • 7 Factors • No AI</p>
                </div>
              </div>
              {loading ? (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 animate-pulse">
                  <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4 w-1/2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-8" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl" />)}
                  </div>
                </div>
              ) : sentiment ? (
                <SentimentCard sentiment={sentiment} />
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 text-center">
                  <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Sentiment will be calculated once market data loads.</p>
                </div>
              )}
            </div>
          </section>

          {/* ─── Section 6: Morning Checklist ────────────────────────────── */}
          <section id="morning-checklist" aria-label="Morning Trading Checklist">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Morning Trading Checklist</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pre-Market Routine • 8 Factors</p>
                </div>
              </div>
              <ChecklistCard items={checklistItems} />
            </div>
          </section>

          {/* ─── Section 7: Market Insights Engine ───────────────────────── */}
          {!loading && insights.length > 0 && (
            <section id="market-insights" aria-label="Market Insights">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Market Insight Engine</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Automatic Rule-Based Analysis • Sector Impact</p>
                  </div>
                </div>
                <InsightsPanel insights={insights} />
              </div>
            </section>
          )}

          {/* ─── Section 8: Historical Data ──────────────────────────────── */}
          <section id="historical-data" aria-label="Historical Market Data">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Historical Data</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Snapshots • Sortable • Paginated</p>
                </div>
              </div>
              <HistoricalTable
                markets={allMarkets}
                initialMarketId={data?.indianIndex[0]?.market.id}
              />
            </div>
          </section>

          {/* ─── Section 9: Quick Trading Tools ──────────────────────────── */}
          <section id="related-tools" aria-label="Related Trading Tools">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quick Trading Tools</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Free Professional Calculators</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {QUICK_TOOLS.map(tool => {
                  const Icon = tool.icon;
                  const colorClass = TOOL_COLOR_MAP[tool.color] ?? TOOL_COLOR_MAP.blue;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex flex-col gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center justify-between">
                          {tool.title}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">{tool.desc}</p>
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 group-hover:underline">Open Tool →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Section 10: Educational Guide ───────────────────────────── */}
          <section id="market-guide" aria-label="Market Dashboard Educational Guide">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Complete Market Analysis Guide</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trading Education • Beginner Friendly</p>
                </div>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-[1.8] space-y-8">

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">What is Gift Nifty and Why Every Indian Trader Should Watch It</h2>
                  <p>
                    Gift Nifty — officially traded at NSE International Exchange (NSE IX) in GIFT City, Ahmedabad — is one of the most important pre-market indicators for Indian traders. Every morning, before the NSE opens at 9:15 AM IST, Gift Nifty is already trading. Its value gives you a real-time sense of where Nifty 50 is likely to open.
                  </p>
                  <p>
                    If Gift Nifty is trading 100 points above the previous Nifty 50 close, expect a gap-up opening. If it's 150 points below, prepare for a gap-down. This pre-market signal is used by retail traders, institutional desks, and algo systems to position themselves before the opening bell.
                  </p>
                  <p>
                    <strong>How to use it:</strong> Check Gift Nifty between 8:00–9:15 AM IST. Compare it to yesterday's Nifty 50 closing price. The difference (premium or discount) indicates the likely gap at open. Remember — markets can and do reverse, so use Gift Nifty as a starting point, not a guarantee.
                  </p>
                  <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 not-prose">
                    <p className="text-sm font-bold text-blue-800 dark:text-blue-300">💡 Pro Tip</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mt-1">The strongest trading signals come when Gift Nifty, Asian markets, and US futures all align in the same direction. When all three agree, the gap-up or gap-down usually holds.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">How Global Markets Affect Indian Markets</h2>
                  <p>
                    The Nifty 50 does not exist in isolation. Every global market move — from Wall Street to Tokyo to Frankfurt — creates ripples that reach Dalal Street the next day (or the same day for markets trading simultaneously). Understanding these connections is essential for any serious trader.
                  </p>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">The US Markets Connection</h3>
                  <p>
                    The US stock market — specifically the S&P 500, Dow Jones Industrial Average, and Nasdaq — is the world's most watched equity benchmark. When US markets close strongly positive, Foreign Institutional Investors (FIIs) who manage global portfolios typically increase their emerging market allocations, including India, the next trading day. A powerful US rally often translates to a 0.3–0.8% positive opening in Indian indices.
                  </p>
                  <p>
                    The reverse is equally powerful. A sharp US sell-off (especially if driven by recession fears, credit events, or Federal Reserve policy changes) triggers a global risk-off move where FIIs pull money from all emerging markets simultaneously. During such events, Nifty 50 can open 1–3% lower.
                  </p>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">Asian Markets (Nikkei, Hang Seng)</h3>
                  <p>
                    Since Asian markets — Japan (Nikkei 225) and Hong Kong (Hang Seng) — trade simultaneously with Indian markets during morning hours, their real-time direction adds confirmation to your bias. If Nikkei is up 1% while Indian markets open, it signals sustained positive sentiment across Asia, supporting a bullish case for Nifty.
                  </p>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">European Markets (DAX, FTSE)</h3>
                  <p>
                    European markets open after Indian markets close, but their pre-open futures and the previous day's close are still relevant. Strong European performance the previous day adds to the global risk-on backdrop that supports Indian markets.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gold and the Stock Market — A Complex Relationship</h2>
                  <p>
                    Gold has a nuanced relationship with equity markets that every trader must understand. In simple terms: gold is a "fear gauge." When investors are nervous, they buy gold as a safe store of value. When they are confident, they prefer higher-returning assets like stocks.
                  </p>
                  <p>
                    <strong>Gold Rising = Caution Signal:</strong> When gold rises sharply (+1.5% or more in a day), it usually signals global uncertainty — geopolitical tension, recession fears, banking stress, or currency crises. In these conditions, equity markets typically face headwinds. For Indian traders: a sharp gold rally before market open is a bearish signal.
                  </p>
                  <p>
                    <strong>Gold Falling = Risk-On:</strong> When gold falls and equities simultaneously rise, it confirms a risk-on environment — investors are choosing growth assets over safety. This is generally bullish for Indian markets.
                  </p>
                  <p>
                    <strong>The Exception:</strong> Sometimes gold and equities rise together during inflationary periods, as both serve as inflation hedges. Always interpret gold movements in the context of the broader macro environment, not in isolation.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-sm not-prose">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">Gold Signal</th>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">Market Implication</th>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">Trade Bias</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { signal: "Strong Rally (+2% or more)", impl: "Global fear / risk-off", bias: "Bearish for equities" },
                          { signal: "Mild Rise (+0.5% to +1.5%)", impl: "Mild caution", bias: "Neutral" },
                          { signal: "Flat (±0.5%)", impl: "No clear signal", bias: "Neutral" },
                          { signal: "Falling (−0.5% to −1.5%)", impl: "Risk-on sentiment", bias: "Bullish for equities" },
                          { signal: "Sharp Fall (−2% or more)", impl: "Strong risk appetite", bias: "Very Bullish" },
                        ].map((r, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}>
                            <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{r.signal}</td>
                            <td className="p-3 font-medium text-slate-600 dark:text-slate-400">{r.impl}</td>
                            <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{r.bias}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Crude Oil Impact on Indian Markets — Why It Matters So Much</h2>
                  <p>
                    India is heavily dependent on crude oil imports — roughly 85% of its oil needs are imported. This makes India uniquely vulnerable to crude price movements. When oil prices rise, the impact cascades through the entire economy.
                  </p>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">When Crude Rises</h3>
                  <p>
                    Rising crude oil prices hurt Indian markets through multiple channels: (1) The trade deficit widens, putting pressure on the Indian Rupee. (2) Inflation rises as fuel, logistics, and manufacturing costs increase. (3) The government may delay fuel price hikes, creating fiscal strain. (4) Sectors directly exposed — paints (raw material: crude derivatives), tyres (natural rubber + crude-linked synthetics), and aviation (jet fuel) — face margin compression.
                  </p>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">When Crude Falls</h3>
                  <p>
                    Falling crude is among the most positive macro events for India. Lower oil reduces the import bill by billions of dollars, strengthens the Rupee, reduces inflation, and directly benefits the sectors mentioned above. Airlines often see significant margin expansion when jet fuel prices drop. Paints and tyre companies see improved earnings. For Indian markets overall, a 10% fall in crude is roughly equivalent to a 0.3–0.5% boost to GDP growth.
                  </p>
                  <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 not-prose">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300">⚠️ Sector Watch</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mt-1">Companies most affected by crude moves: Asian Paints, Berger Paints, Kansai Nerolac (paints), MRF, Apollo Tyres, CEAT (tyres), IndiGo, Air India (aviation), IOC, BPCL, HPCL (oil marketing companies).</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Dollar Impact on Indian Markets — The USD/INR Story</h2>
                  <p>
                    The US Dollar and Indian Rupee have an inverse relationship: when the dollar strengthens, the Rupee typically weakens, and vice versa. This currency relationship affects Indian markets in several important ways.
                  </p>
                  <p>
                    <strong>Strong Dollar (Weak Rupee):</strong> FIIs face currency losses — if they invested ₹100 crore in Indian equities and the Rupee falls 5%, their dollar returns drop even if the market is flat. This discourages FII inflows and often triggers selling. However, Indian IT companies benefit as they earn in dollars: a 5% Rupee depreciation directly boosts IT company revenues by ~5% in rupee terms.
                  </p>
                  <p>
                    <strong>Weak Dollar (Strong Rupee):</strong> Positive for FII inflows and most sectors. Negative for IT and pharma export revenues in rupee terms. Generally supportive of equity market valuations and reduces imported inflation.
                  </p>
                  <p>
                    The Dollar Index (DXY) tracks the dollar against a basket of 6 major currencies (Euro, Yen, Pound, Canadian Dollar, Swedish Krona, Swiss Franc). A rising DXY usually means a falling Rupee and vice versa. Monitor DXY direction each morning — it's one of the fastest-moving macro signals.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">India VIX Explained — The Fear Gauge of Indian Markets</h2>
                  <p>
                    India VIX (Volatility Index) is computed by NSE using the Black-Scholes option pricing model on Nifty 50 options. It measures the market's expectation of volatility over the next 30 calendar days, expressed as an annualised percentage.
                  </p>
                  <p>
                    Think of VIX as the "fear thermometer" of the market. A VIX of 12 means the market expects annual volatility of 12% — calm and orderly. A VIX of 28 means the market expects 28% annual volatility — turbulent, with large daily swings expected.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-sm not-prose">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">VIX Range</th>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">Market Condition</th>
                          <th className="p-3 text-left font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">Trading Implication</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { range: "Below 12", cond: "Extremely calm — complacency", impl: "Consider buying options (cheap premiums)" },
                          { range: "12–15", cond: "Low volatility — stable trend", impl: "Trend trading works well" },
                          { range: "15–20", cond: "Normal — moderate volatility", impl: "Standard risk management" },
                          { range: "20–25", cond: "Elevated anxiety", impl: "Reduce position sizes, tighten stops" },
                          { range: "Above 25", cond: "High fear — crisis mode", impl: "Extreme caution; option sellers avoid" },
                        ].map((r, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}>
                            <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{r.range}</td>
                            <td className="p-3 font-medium text-slate-600 dark:text-slate-400">{r.cond}</td>
                            <td className="p-3 font-medium text-blue-600 dark:text-blue-400">{r.impl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">How Professional Traders Use Morning Market Analysis</h2>
                  <p>
                    Professional traders don't guess — they prepare. Each morning, before the NSE opens, experienced traders run through a systematic checklist of global and domestic factors to form their "market bias" for the day. Here's how they do it:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 not-prose">
                    {[
                      { step: "Check US Markets Close", detail: "Did the S&P 500, Dow, and Nasdaq close positive or negative? By how much? Strong positive (+0.5% or more) suggests a bullish Indian open." },
                      { step: "Check Asian Markets", detail: "How are Nikkei and Hang Seng trading? If Asian markets are also up, the bullish signal is confirmed. If they've reversed (even after a positive US close), be cautious." },
                      { step: "Check Gift Nifty", detail: "Is Gift Nifty above or below yesterday's Nifty close? This is the most direct indicator of the likely Indian opening direction." },
                      { step: "Check India VIX", detail: "Is VIX elevated (above 20)? High VIX means expect wide intraday swings. Adjust position sizes accordingly." },
                      { step: "Check Crude and Gold", detail: "Is crude rising or falling? Is gold spiking (risk-off) or falling (risk-on)? These commodity moves signal the macro risk appetite." },
                      { step: "Form Your Bias", detail: "Based on all factors, decide: is today likely to be bullish, bearish, or neutral? Only trade in the direction of your bias." },
                      { step: "Set Your Plan", detail: "Define key levels (Nifty support/resistance using Pivot Calculator), max loss for the day, and which setups you'll look for. Trade the plan, not the emotion." },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{item.step}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Common Mistakes Beginners Make with Market Analysis</h2>
                  <div className="space-y-4 not-prose">
                    {[
                      { mistake: "Trading without a morning review", fix: "Always check the global context before the open. Blind trading in a globally negative environment is asking for losses." },
                      { mistake: "Over-relying on a single indicator", fix: "Don't act on Gift Nifty alone. Combine it with US markets, VIX, and commodities for a complete picture." },
                      { mistake: "Ignoring the VIX", fix: "In high-VIX environments, reduce position sizes by 50%. The market can swing violently in both directions." },
                      { mistake: "Treating news as trading signals", fix: "By the time news becomes public, it's priced in. Focus on the market's reaction to news, not the news itself." },
                      { mistake: "Holding through gap-down reversals", fix: "If the market gaps down but Gift Nifty was positive (reversal), something changed overnight. Always respect market reality over your pre-market bias." },
                      { mistake: "Confusing correlation with causation", fix: "US markets and Nifty are correlated, not causally linked. Sometimes they diverge sharply. Always wait for Indian market confirmation before entering trades." },
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-bold text-rose-600 dark:text-rose-400">❌ {item.mistake}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2 leading-relaxed">✅ {item.fix}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Read Futures Data</h2>
                  <p>
                    Futures contracts are agreements to buy or sell an asset at a predetermined price on a specified future date. Understanding futures data is essential for reading market direction and sentiment.
                  </p>
                  <p>
                    <strong>Futures Premium:</strong> When Nifty Futures trade above the spot Nifty (positive basis), it's called a premium. A healthy premium of 50–100 points suggests bullish market expectations for the near term. An unusually high premium might indicate excessive optimism.
                  </p>
                  <p>
                    <strong>Futures Discount:</strong> When Nifty Futures trade below spot (negative basis), it signals bearish expectations or high dividend expectations near expiry. A sharp discount often precedes a correction.
                  </p>
                  <p>
                    <strong>Open Interest (OI):</strong> OI tells you how many contracts are outstanding. Rising OI with rising prices = new long positions being built (bullish). Rising OI with falling prices = new short positions (bearish). Falling OI usually means traders are covering/closing positions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Trading Tips for Using This Dashboard Effectively</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                    {[
                      { tip: "Bookmark this page", detail: "Make this your first stop every morning. Consistency in your routine builds trading discipline." },
                      { tip: "Use the Sentiment Score", detail: "Only trade in the direction of the overall sentiment. If sentiment is Bearish, avoid fresh long positions early in the day." },
                      { tip: "Cross-reference with Pivot Calculator", detail: "Use our Pivot Calculator with yesterday's OHLC to set your target and stop-loss levels for the day." },
                      { tip: "Watch for convergence", detail: "The highest conviction setups come when Gift Nifty, US markets, and Asian markets all agree. Divergences signal a choppy day." },
                      { tip: "Check after 10:00 AM", detail: "The first 45 minutes (9:15–10:00 AM) are often volatile. Revisit the dashboard after 10:00 AM to confirm if the opening gap is holding." },
                      { tip: "Note VIX before options trades", detail: "Never sell options blindly. Check VIX first. High VIX = expensive premiums (good for sellers short-term but high risk)." },
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <p className="text-sm font-bold text-blue-800 dark:text-blue-300">#{i + 1} {item.tip}</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 flex gap-4 not-prose">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                    <strong>Disclaimer:</strong> This dashboard is for educational and informational purposes only. Market data is delayed (15–20 minutes). The Market Sentiment Engine uses deterministic rules and does not constitute financial advice. Always do your own research and consult a SEBI-registered financial advisor before making investment decisions. Past market patterns do not guarantee future results.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 11: FAQ ──────────────────────────────────────────── */}
          <section id="faq" aria-label="Frequently Asked Questions">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-900/20 flex items-center justify-center text-fuchsia-600">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Market Dashboard • Trading Education</p>
                </div>
              </div>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} q={faq.question} a={faq.answer} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* ─── CTA: Love our tools? ─────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-slate-900 to-[#020617] dark:from-[#020617] dark:to-slate-950 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform hidden sm:flex">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-black text-white mb-2">Love our tools?</h2>
                <p className="text-slate-400 font-medium text-lg">Your feedback helps us continuously improve.</p>
              </div>
            </div>
            <button
              onClick={() => { if (typeof window !== 'undefined') window.dispatchEvent(new Event('trigger-review-popup')); }}
              className="relative z-10 w-full md:w-auto shrink-0 px-10 py-5 bg-blue-600 text-white border border-blue-500/50 font-black rounded-full hover:bg-blue-500 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              Share Your Experience
            </button>
          </div>

        </main>
      </div>
    </>
  );
}
