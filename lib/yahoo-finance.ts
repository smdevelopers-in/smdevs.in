import { LiveQuote } from '@/types/market';

export const YAHOO_SYMBOLS: Record<string, string> = {
  // Indian
  '^NSEI': '^NSEI',
  '^NSEBANK': '^NSEBANK',
  '^INDIAVIX': '^INDIAVIX',
  // Global
  '^DJI': '^DJI',
  '^IXIC': '^IXIC',
  '^GSPC': '^GSPC',
  '^N225': '^N225',
  '^HSI': '^HSI',
  '^GDAXI': '^GDAXI',
  '^FTSE': '^FTSE',
  // Commodities
  'GC=F': 'GC=F',
  'SI=F': 'SI=F',
  'CL=F': 'CL=F',
  'NG=F': 'NG=F',
  'HG=F': 'HG=F',
  // Currency
  'USDINR=X': 'USDINR=X',
  'EURINR=X': 'EURINR=X',
  'GBPINR=X': 'GBPINR=X',
  'JPYINR=X': 'JPYINR=X',
  'DX-Y.NYB': 'DX-Y.NYB',
};

export async function fetchYahooQuote(yahooSymbol: string): Promise<LiveQuote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=5d`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    const result = data.chart?.result?.[0];
    
    if (!result || !result.meta) {
      return null;
    }

    const meta = result.meta;
    const close = meta.regularMarketPrice || null;
    const previousClose = meta.previousClose || meta.chartPreviousClose || null;
    const open = meta.regularMarketOpen || null;
    const high = meta.regularMarketDayHigh || null;
    const low = meta.regularMarketDayLow || null;
    
    let change = null;
    let changePercent = null;
    
    if (close !== null && previousClose !== null && previousClose !== 0) {
      change = close - previousClose;
      changePercent = (change / previousClose) * 100;
    }

    return {
      symbol: yahooSymbol,
      open,
      high,
      low,
      close,
      previousClose,
      change,
      changePercent,
      source: 'yahoo',
    };
  } catch (error) {
    console.error(`Error fetching Yahoo quote for ${yahooSymbol}:`, error);
    return null;
  }
}

export async function fetchMultipleYahooQuotes(symbols: string[]): Promise<Map<string, LiveQuote | null>> {
  const map = new Map<string, LiveQuote | null>();
  const uniqueSymbols = Array.from(new Set(symbols));
  
  const results = await Promise.allSettled(
    uniqueSymbols.map(sym => fetchYahooQuote(sym).then(quote => ({ sym, quote })))
  );

  for (const res of results) {
    if (res.status === 'fulfilled') {
      map.set(res.value.sym, res.value.quote);
    }
  }

  return map;
}
