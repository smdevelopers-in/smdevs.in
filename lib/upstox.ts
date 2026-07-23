import { LiveQuote } from '@/types/market';

export const UPSTOX_INSTRUMENT_KEYS: Record<string, string> = {
  '^NSEI': 'NSE_INDEX|Nifty 50',
  '^NSEBANK': 'NSE_INDEX|Nifty Bank',
  '^INDIAVIX': 'NSE_INDEX|India VIX',
};

export function isUpstoxConfigured(): boolean {
  return !!process.env.UPSTOX_ACCESS_TOKEN;
}

export async function fetchUpstoxQuotes(yahooSymbols: string[]): Promise<Map<string, LiveQuote | null>> {
  const map = new Map<string, LiveQuote | null>();
  
  if (!isUpstoxConfigured() || yahooSymbols.length === 0) {
    return map;
  }

  try {
    const keys = yahooSymbols
      .map(sym => UPSTOX_INSTRUMENT_KEYS[sym])
      .filter(Boolean);
      
    if (keys.length === 0) return map;

    const url = `https://api.upstox.com/v2/market-quote/quotes?instrument_key=${encodeURIComponent(keys.join(','))}`;
    const token = process.env.UPSTOX_ACCESS_TOKEN;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      console.error('Upstox API error:', res.status, res.statusText);
      return map;
    }

    const json = await res.json();
    const data = json.data;

    if (!data) return map;

    for (const yahooSymbol of yahooSymbols) {
      const instrKey = UPSTOX_INSTRUMENT_KEYS[yahooSymbol];
      const quoteData = instrKey ? data[instrKey] : null;

      if (quoteData) {
        map.set(yahooSymbol, {
          symbol: yahooSymbol,
          open: quoteData.ohlc?.open || null,
          high: quoteData.ohlc?.high || null,
          low: quoteData.ohlc?.low || null,
          close: quoteData.last_price || null,
          previousClose: quoteData.ohlc?.close || null,
          change: quoteData.net_change || null,
          changePercent: quoteData.change_pct || null,
          source: 'upstox',
        });
      } else {
        map.set(yahooSymbol, null);
      }
    }
  } catch (error) {
    console.error('Error fetching from Upstox API:', error);
  }

  return map;
}

export async function fetchUpstoxQuote(yahooSymbol: string): Promise<LiveQuote | null> {
  const quotes = await fetchUpstoxQuotes([yahooSymbol]);
  return quotes.get(yahooSymbol) || null;
}
