// ─── Market Types ─────────────────────────────────────────────────────────────

export type MarketCategory =
  | 'Indian Index'
  | 'Global Index'
  | 'Commodities'
  | 'Currency'
  | 'Volatility';

export type SentimentLevel =
  | 'Very Bullish'
  | 'Bullish'
  | 'Neutral'
  | 'Bearish'
  | 'Very Bearish';

export type MarketStatus = 'open' | 'closed' | 'pre-open' | 'holiday';
export type SignalType = 'bullish' | 'bearish' | 'neutral';
export type RefreshStatus = 'success' | 'partial' | 'failed';

// ─── Database Row Types ────────────────────────────────────────────────────────

export interface Market {
  id: number;
  symbol: string;
  display_name: string;
  category: MarketCategory;
  exchange: string | null;
  country: string | null;
  yahoo_symbol: string | null;
  upstox_symbol: string | null;
  source: string;
  created_at: string;
}

export interface MarketSnapshot {
  id: number;
  market_id: number;
  date: string;          // ISO date string 'YYYY-MM-DD'
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  previous_close: number | null;
  change: number | null;
  change_percent: number | null;
  sentiment: SignalType | null;
  updated_at: string;
}

export interface RefreshLog {
  id: number;
  source: string;
  status: RefreshStatus;
  message: string | null;
  instruments_updated: number;
  started_at: string | null;
  completed_at: string;
}

// ─── Combined Display Types ────────────────────────────────────────────────────

export interface MarketData {
  market: Market;
  snapshot: MarketSnapshot | null;
}

export interface MarketDataByCategory {
  indianIndex: MarketData[];
  globalIndex: MarketData[];
  commodities: MarketData[];
  currency: MarketData[];
  volatility: MarketData[];
}

// ─── Sentiment Engine ──────────────────────────────────────────────────────────

export interface SentimentFactor {
  name: string;
  value: string;
  signal: SignalType;
  reason: string;
  icon: string; // emoji
}

export interface SentimentResult {
  overall: SentimentLevel;
  score: number;
  factors: SentimentFactor[];
  summary: string;
}

// ─── API Response Types ────────────────────────────────────────────────────────

export interface MarketApiResponse {
  data: MarketDataByCategory;
  lastRefreshed: string | null;
  marketStatus: MarketStatus;
  sentiment: SentimentResult;
  error?: string;
}

export interface HistoricalApiResponse {
  snapshots: (MarketSnapshot & { display_name: string; symbol: string })[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface RefreshApiResponse {
  success: boolean;
  updated: number;
  errors: string[];
  completedAt: string;
}

// ─── Live Quote Type (from external APIs) ─────────────────────────────────────

export interface LiveQuote {
  symbol: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  previousClose: number | null;
  change: number | null;
  changePercent: number | null;
  source: 'upstox' | 'yahoo' | 'cache';
}

// ─── Insight Engine ───────────────────────────────────────────────────────────

export interface MarketInsight {
  id: string;
  trigger: string;       // e.g. "Gold Rising"
  implication: string;   // e.g. "Safe Haven Buying"
  sectors: string[];     // e.g. ["Precious Metals", "Jewellery"]
  sentiment: SignalType;
  icon: string;
  description: string;
}

// ─── Checklist ───────────────────────────────────────────────────────────────

export type ChecklistItemStatus = 'complete' | 'pending' | 'neutral';

export interface ChecklistItem {
  id: string;
  label: string;
  value: string;
  status: ChecklistItemStatus;
  detail: string;
  icon: string;
}

// ─── Historical Data ──────────────────────────────────────────────────────────

export type HistoricalRange = 'today' | '7d' | '30d' | '12m';
