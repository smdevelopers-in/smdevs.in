import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalSnapshots, getLatestSnapshots } from '@/lib/market-db';
import type { HistoricalApiResponse } from '@/types/market';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const marketIdStr = searchParams.get('marketId');
    const range = searchParams.get('range');
    
    let days = parseInt(searchParams.get('days') || '30', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

    if (range) {
      switch (range) {
        case 'today': days = 1; break;
        case '7d': days = 7; break;
        case '30d': days = 30; break;
        case '12m': days = 365; break;
      }
    }

    if (!marketIdStr) {
      // Return overview of latest snapshots for all markets if no marketId
      const allLatest = await getLatestSnapshots();
      return NextResponse.json({ data: allLatest });
    }

    const marketId = parseInt(marketIdStr, 10);
    if (isNaN(marketId)) {
      return NextResponse.json({ error: 'Invalid marketId' }, { status: 400 });
    }

    const result = await getHistoricalSnapshots(marketId, days, page, limit);
    const response: HistoricalApiResponse = {
      snapshots: result.snapshots as any, // Cast since DB returns display_name and symbol mixed in
      totalCount: result.totalCount,
      page: result.page,
      totalPages: result.totalPages
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API /market/historical GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
