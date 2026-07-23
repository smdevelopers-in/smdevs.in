import { sql } from '@vercel/postgres';
import { Market, MarketData, MarketDataByCategory, MarketSnapshot, RefreshStatus, RefreshLog, LiveQuote, SignalType } from '@/types/market';
import { getTodayIST } from './market-calculations';

const DEFAULT_MARKETS = [
  // Indian Index
  { symbol: '^NSEI', display_name: 'Nifty 50', category: 'Indian Index', exchange: 'NSE', country: 'India', yahoo_symbol: '^NSEI', upstox_symbol: 'NSE_INDEX|Nifty 50' },
  { symbol: '^NSEBANK', display_name: 'Bank Nifty', category: 'Indian Index', exchange: 'NSE', country: 'India', yahoo_symbol: '^NSEBANK', upstox_symbol: 'NSE_INDEX|Nifty Bank' },
  { symbol: 'GIFT_NIFTY', display_name: 'Gift Nifty', category: 'Indian Index', exchange: 'NSE', country: 'India', yahoo_symbol: '^NSEI', upstox_symbol: null },
  { symbol: 'NIFTY_FUT', display_name: 'Nifty Futures', category: 'Indian Index', exchange: 'NSE', country: 'India', yahoo_symbol: '^NSEI', upstox_symbol: null },
  { symbol: 'BANKNIFTY_FUT', display_name: 'BankNifty Futures', category: 'Indian Index', exchange: 'NSE', country: 'India', yahoo_symbol: '^NSEBANK', upstox_symbol: null },
  // Volatility
  { symbol: '^INDIAVIX', display_name: 'India VIX', category: 'Volatility', exchange: 'NSE', country: 'India', yahoo_symbol: '^INDIAVIX', upstox_symbol: 'NSE_INDEX|India VIX' },
  // Global Index
  { symbol: '^DJI', display_name: 'Dow Jones', category: 'Global Index', exchange: 'DJI', country: 'USA', yahoo_symbol: '^DJI', upstox_symbol: null },
  { symbol: '^IXIC', display_name: 'Nasdaq', category: 'Global Index', exchange: 'NASDAQ', country: 'USA', yahoo_symbol: '^IXIC', upstox_symbol: null },
  { symbol: '^GSPC', display_name: 'S&P 500', category: 'Global Index', exchange: 'NYSE', country: 'USA', yahoo_symbol: '^GSPC', upstox_symbol: null },
  { symbol: '^N225', display_name: 'Nikkei 225', category: 'Global Index', exchange: 'TSE', country: 'Japan', yahoo_symbol: '^N225', upstox_symbol: null },
  { symbol: '^HSI', display_name: 'Hang Seng', category: 'Global Index', exchange: 'HKEX', country: 'Hong Kong', yahoo_symbol: '^HSI', upstox_symbol: null },
  { symbol: '^GDAXI', display_name: 'DAX', category: 'Global Index', exchange: 'XETRA', country: 'Germany', yahoo_symbol: '^GDAXI', upstox_symbol: null },
  { symbol: '^FTSE', display_name: 'FTSE 100', category: 'Global Index', exchange: 'LSE', country: 'UK', yahoo_symbol: '^FTSE', upstox_symbol: null },
  // Commodities
  { symbol: 'GC=F', display_name: 'Gold', category: 'Commodities', exchange: 'COMEX', country: 'Global', yahoo_symbol: 'GC=F', upstox_symbol: null },
  { symbol: 'SI=F', display_name: 'Silver', category: 'Commodities', exchange: 'COMEX', country: 'Global', yahoo_symbol: 'SI=F', upstox_symbol: null },
  { symbol: 'CL=F', display_name: 'Crude Oil WTI', category: 'Commodities', exchange: 'NYMEX', country: 'Global', yahoo_symbol: 'CL=F', upstox_symbol: null },
  { symbol: 'NG=F', display_name: 'Natural Gas', category: 'Commodities', exchange: 'NYMEX', country: 'Global', yahoo_symbol: 'NG=F', upstox_symbol: null },
  { symbol: 'HG=F', display_name: 'Copper', category: 'Commodities', exchange: 'COMEX', country: 'Global', yahoo_symbol: 'HG=F', upstox_symbol: null },
  // Currency
  { symbol: 'USDINR=X', display_name: 'USD/INR', category: 'Currency', exchange: 'FOREX', country: 'Global', yahoo_symbol: 'USDINR=X', upstox_symbol: null },
  { symbol: 'EURINR=X', display_name: 'EUR/INR', category: 'Currency', exchange: 'FOREX', country: 'Global', yahoo_symbol: 'EURINR=X', upstox_symbol: null },
  { symbol: 'GBPINR=X', display_name: 'GBP/INR', category: 'Currency', exchange: 'FOREX', country: 'Global', yahoo_symbol: 'GBPINR=X', upstox_symbol: null },
  { symbol: 'JPYINR=X', display_name: 'JPY/INR', category: 'Currency', exchange: 'FOREX', country: 'Global', yahoo_symbol: 'JPYINR=X', upstox_symbol: null },
  { symbol: 'DX-Y.NYB', display_name: 'Dollar Index', category: 'Currency', exchange: 'ICE', country: 'Global', yahoo_symbol: 'DX-Y.NYB', upstox_symbol: null },
];

export async function ensureMarketTablesExist() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS markets (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(30) NOT NULL UNIQUE,
        display_name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        exchange VARCHAR(30),
        country VARCHAR(30),
        yahoo_symbol VARCHAR(50),
        upstox_symbol VARCHAR(100),
        source VARCHAR(20) DEFAULT 'yahoo',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS market_snapshots (
        id SERIAL PRIMARY KEY,
        market_id INTEGER REFERENCES markets(id),
        date DATE NOT NULL,
        open DECIMAL(18,4),
        high DECIMAL(18,4),
        low DECIMAL(18,4),
        close DECIMAL(18,4),
        previous_close DECIMAL(18,4),
        change_value DECIMAL(18,4),
        change_percent DECIMAL(10,4),
        sentiment VARCHAR(20),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(market_id, date)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS refresh_logs (
        id SERIAL PRIMARY KEY,
        source VARCHAR(50),
        status VARCHAR(20),
        message TEXT,
        instruments_updated INTEGER DEFAULT 0,
        started_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ
      );
    `;

    await seedDefaultMarketsIfEmpty();
  } catch (error) {
    console.error('Error ensuring market tables exist:', error);
  }
}

export async function seedDefaultMarketsIfEmpty() {
  try {
    const { rows } = await sql`SELECT COUNT(*) as count FROM markets`;
    if (rows[0].count === '0') {
      for (const m of DEFAULT_MARKETS) {
        await sql`
          INSERT INTO markets (symbol, display_name, category, exchange, country, yahoo_symbol, upstox_symbol)
          VALUES (${m.symbol}, ${m.display_name}, ${m.category}, ${m.exchange}, ${m.country}, ${m.yahoo_symbol}, ${m.upstox_symbol})
        `;
      }
    }
  } catch (error) {
    console.error('Error seeding default markets:', error);
  }
}

export async function getAllMarkets(): Promise<Market[]> {
  try {
    const { rows } = await sql<Market>`
      SELECT * FROM markets 
      ORDER BY category, id ASC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching markets:', error);
    return [];
  }
}

export async function getLatestSnapshots(): Promise<MarketData[]> {
  try {
    const { rows } = await sql`
      WITH RankedSnapshots AS (
        SELECT *, ROW_NUMBER() OVER(PARTITION BY market_id ORDER BY date DESC) as rn
        FROM market_snapshots
      )
      SELECT 
        m.id as m_id, m.symbol as m_symbol, m.display_name as m_display_name, 
        m.category as m_category, m.exchange as m_exchange, m.country as m_country, 
        m.yahoo_symbol as m_yahoo_symbol, m.upstox_symbol as m_upstox_symbol, 
        m.source as m_source, m.created_at as m_created_at,
        s.id as s_id, s.date as s_date, s.open as s_open, s.high as s_high, 
        s.low as s_low, s.close as s_close, s.previous_close as s_previous_close, 
        s.change_value as s_change_value, s.change_percent as s_change_percent, 
        s.sentiment as s_sentiment, s.updated_at as s_updated_at
      FROM markets m
      LEFT JOIN RankedSnapshots s ON m.id = s.market_id AND s.rn = 1
      ORDER BY m.category, m.id ASC
    `;

    return rows.map(row => ({
      market: {
        id: row.m_id,
        symbol: row.m_symbol,
        display_name: row.m_display_name,
        category: row.m_category as any,
        exchange: row.m_exchange,
        country: row.m_country,
        yahoo_symbol: row.m_yahoo_symbol,
        upstox_symbol: row.m_upstox_symbol,
        source: row.m_source,
        created_at: row.m_created_at,
      },
      snapshot: row.s_id ? {
        id: row.s_id,
        market_id: row.m_id,
        date: typeof row.s_date === 'string' ? row.s_date : (row.s_date as Date).toISOString().split('T')[0],
        open: parseFloat(row.s_open) || null,
        high: parseFloat(row.s_high) || null,
        low: parseFloat(row.s_low) || null,
        close: parseFloat(row.s_close) || null,
        previous_close: parseFloat(row.s_previous_close) || null,
        change: parseFloat(row.s_change_value) || null,
        change_percent: parseFloat(row.s_change_percent) || null,
        sentiment: row.s_sentiment as SignalType | null,
        updated_at: typeof row.s_updated_at === 'string' ? row.s_updated_at : (row.s_updated_at as Date).toISOString(),
      } : null,
    }));
  } catch (error) {
    console.error('Error fetching latest snapshots:', error);
    return [];
  }
}

export async function getLatestSnapshotsByCategory(): Promise<MarketDataByCategory> {
  const allData = await getLatestSnapshots();
  const result: MarketDataByCategory = {
    indianIndex: [],
    globalIndex: [],
    commodities: [],
    currency: [],
    volatility: [],
  };

  for (const item of allData) {
    switch (item.market.category) {
      case 'Indian Index': result.indianIndex.push(item); break;
      case 'Global Index': result.globalIndex.push(item); break;
      case 'Commodities': result.commodities.push(item); break;
      case 'Currency': result.currency.push(item); break;
      case 'Volatility': result.volatility.push(item); break;
    }
  }

  return result;
}

export async function getHistoricalSnapshots(
  marketId: number, 
  days: number = 30, 
  page: number = 1, 
  limit: number = 20
) {
  try {
    const offset = (page - 1) * limit;
    const { rows } = await sql`
      SELECT 
        s.id, s.market_id, s.date, s.open, s.high, s.low, s.close, 
        s.previous_close, s.change_value, s.change_percent, s.sentiment, s.updated_at,
        m.display_name, m.symbol
      FROM market_snapshots s
      JOIN markets m ON s.market_id = m.id
      WHERE s.market_id = ${marketId}
        AND s.date >= (CURRENT_DATE - ${days} * INTERVAL '1 day')
      ORDER BY s.date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const { rows: countRows } = await sql`
      SELECT COUNT(*) as count 
      FROM market_snapshots 
      WHERE market_id = ${marketId} 
        AND date >= (CURRENT_DATE - ${days} * INTERVAL '1 day')
    `;

    const totalCount = parseInt(countRows[0].count, 10);

    return {
      snapshots: rows.map(r => ({
        ...r,
        change: parseFloat(r.change_value),
        change_percent: parseFloat(r.change_percent),
      })),
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  } catch (error) {
    console.error('Error fetching historical snapshots:', error);
    return { snapshots: [], totalCount: 0, page: 1, totalPages: 0 };
  }
}

export async function upsertSnapshot(marketId: number, quote: LiveQuote) {
  try {
    const today = getTodayIST();
    await sql`
      INSERT INTO market_snapshots (
        market_id, date, open, high, low, close, previous_close, change_value, change_percent, updated_at
      ) VALUES (
        ${marketId}, ${today}, ${quote.open}, ${quote.high}, ${quote.low}, ${quote.close}, 
        ${quote.previousClose}, ${quote.change}, ${quote.changePercent}, NOW()
      )
      ON CONFLICT (market_id, date) DO UPDATE SET
        open = EXCLUDED.open,
        high = EXCLUDED.high,
        low = EXCLUDED.low,
        close = EXCLUDED.close,
        previous_close = EXCLUDED.previous_close,
        change_value = EXCLUDED.change_value,
        change_percent = EXCLUDED.change_percent,
        updated_at = NOW()
    `;
  } catch (error) {
    console.error('Error upserting snapshot:', error);
  }
}

export async function upsertSnapshots(quotes: Map<number, LiveQuote>) {
  try {
    for (const [marketId, quote] of Array.from(quotes.entries())) {
      await upsertSnapshot(marketId, quote);
    }
  } catch (error) {
    console.error('Error batch upserting snapshots:', error);
  }
}

export async function logRefreshStart(source: string): Promise<number | null> {
  try {
    const { rows } = await sql`
      INSERT INTO refresh_logs (source, status)
      VALUES (${source}, 'started')
      RETURNING id
    `;
    return rows[0].id;
  } catch (error) {
    console.error('Error logging refresh start:', error);
    return null;
  }
}

export async function logRefreshComplete(id: number, status: RefreshStatus, message: string, count: number) {
  try {
    await sql`
      UPDATE refresh_logs
      SET status = ${status}, message = ${message}, instruments_updated = ${count}, completed_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error logging refresh complete:', error);
  }
}

export async function getLastRefreshLog(): Promise<RefreshLog | null> {
  try {
    const { rows } = await sql<RefreshLog>`
      SELECT * FROM refresh_logs
      WHERE completed_at IS NOT NULL
      ORDER BY completed_at DESC
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching last refresh log:', error);
    return null;
  }
}
