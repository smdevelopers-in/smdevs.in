import { NextRequest, NextResponse } from 'next/server';
import { 
  ensureMarketTablesExist, 
  getLatestSnapshotsByCategory, 
  getAllMarkets, 
  upsertSnapshots, 
  logRefreshStart, 
  logRefreshComplete, 
  getLastRefreshLog 
} from '@/lib/market-db';
import { fetchMultipleYahooQuotes } from '@/lib/yahoo-finance';
import { fetchUpstoxQuotes, isUpstoxConfigured } from '@/lib/upstox';
import { calculateSentiment } from '@/lib/market-sentiment';
import { getMarketStatus } from '@/lib/market-calculations';
import type { MarketApiResponse, LiveQuote } from '@/types/market';

export async function GET(req: NextRequest) {
  try {
    await ensureMarketTablesExist();
    const data = await getLatestSnapshotsByCategory();
    
    // Flatten snapshots for sentiment calculation
    const snapshots = [
      ...data.indianIndex,
      ...data.globalIndex,
      ...data.commodities,
      ...data.currency,
      ...data.volatility
    ];
    
    const sentiment = calculateSentiment(snapshots);
    const lastLog = await getLastRefreshLog();
    const marketStatus = getMarketStatus();

    const response: MarketApiResponse = {
      data,
      lastRefreshed: lastLog?.completed_at || null,
      marketStatus,
      sentiment
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('API /market GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureMarketTablesExist();
    const logId = await logRefreshStart('api');
    
    if (!logId) {
      return NextResponse.json({ success: false, error: 'Failed to start refresh log' }, { status: 500 });
    }

    const markets = await getAllMarkets();
    const upstoxSymbols: string[] = [];
    const yahooSymbols: string[] = [];
    const marketIdByYahooSymbol = new Map<string, number>();

    const hasUpstox = isUpstoxConfigured();

    markets.forEach(m => {
      if (m.yahoo_symbol) {
        marketIdByYahooSymbol.set(m.yahoo_symbol, m.id);
        
        if (hasUpstox && (m.category === 'Indian Index' || m.category === 'Volatility')) {
          upstoxSymbols.push(m.yahoo_symbol);
        } else {
          yahooSymbols.push(m.yahoo_symbol);
        }
      }
    });

    const quotesToUpsert = new Map<number, LiveQuote>();
    const errors: string[] = [];

    // Fetch from Upstox
    if (upstoxSymbols.length > 0) {
      const upstoxResults = await fetchUpstoxQuotes(upstoxSymbols);
      for (const [sym, quote] of Array.from(upstoxResults.entries())) {
        const mId = marketIdByYahooSymbol.get(sym);
        if (mId) {
          if (quote) {
            quotesToUpsert.set(mId, quote);
          } else {
            // Fallback to Yahoo if Upstox fails
            yahooSymbols.push(sym);
          }
        }
      }
    }

    // Fetch from Yahoo
    if (yahooSymbols.length > 0) {
      const yahooResults = await fetchMultipleYahooQuotes(yahooSymbols);
      for (const [sym, quote] of Array.from(yahooResults.entries())) {
        const mId = marketIdByYahooSymbol.get(sym);
        if (mId) {
          if (quote) {
            quotesToUpsert.set(mId, quote);
          } else {
            errors.push(`Failed to fetch quote for ${sym}`);
          }
        }
      }
    }

    await upsertSnapshots(quotesToUpsert);
    await logRefreshComplete(logId, errors.length === 0 ? 'success' : 'partial', errors.join(', '), quotesToUpsert.size);
    // Note: client uses cache:'no-store' so no server-side revalidation needed

    return NextResponse.json({
      success: true,
      updated: quotesToUpsert.size,
      errors,
      completedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('API /market POST error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
