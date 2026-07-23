"use client";

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Market, MarketSnapshot, HistoricalRange } from '@/types/market';
import { formatPrice, formatChange, formatChangePercent } from '@/lib/market-calculations';

interface HistoricalTableProps {
  initialMarketId?: number;
  markets: Market[];
}

type RowData = MarketSnapshot & { display_name: string; symbol: string; date: string };

export function HistoricalTable({ initialMarketId, markets }: HistoricalTableProps) {
  const defaultMarketId = initialMarketId ?? markets.find(m => m.category === 'Indian Index')?.id ?? markets[0]?.id ?? 0;
  
  const [range, setRange] = useState<HistoricalRange>('30d');
  const [marketId, setMarketId] = useState<number>(defaultMarketId);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<RowData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      // Don't fetch until we have a valid marketId
      if (!marketId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/market/historical?marketId=${marketId}&range=${range}&page=${page}`);
        if (res.ok) {
          const json = await res.json();
          if (mounted) {
            setData(json.data || []);
            setTotalPages(json.totalPages || 1);
          }
        }
      } catch (err) {
        console.error('Failed to fetch historical data', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchData();
    return () => { mounted = false; };
  }, [marketId, range, page]);

  const ranges: { label: string; value: HistoricalRange }[] = [
    { label: 'Today', value: 'today' },
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '12 Months', value: '12m' }
  ];

  const selectedMarket = markets.find(m => m.id === marketId) || markets[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto hide-scrollbar">
          {ranges.map(r => (
            <button
              key={r.value}
              onClick={() => { setRange(r.value); setPage(1); }}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-black transition-all ${
                range === r.value 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        
        <select 
          value={marketId}
          onChange={(e) => { setMarketId(Number(e.target.value)); setPage(1); }}
          className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500"
        >
          {markets.map(m => (
            <option key={m.id} value={m.id}>{m.display_name} ({m.symbol})</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              {['Date', 'Open', 'High', 'Low', 'Close', 'Change', 'Change%', 'Trend'].map(h => (
                <th key={h} className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-slate-800 animate-pulse">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div></td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-12 text-center">
                  <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
                    <BarChart3 size={48} className="mb-4 opacity-50" />
                    <p className="font-bold">No historical data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const cp = row.change_percent ?? 0;
                const isPositive = cp > 0;
                const isNegative = cp < 0;
                const colorClass = isPositive ? 'text-emerald-600 dark:text-emerald-400' : isNegative ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400';
                const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
                
                return (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {formatPrice(row.open)}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {formatPrice(row.high)}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {formatPrice(row.low)}
                    </td>
                    <td className="p-4 text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">
                      {formatPrice(row.close)}
                    </td>
                    <td className={`p-4 text-sm font-bold whitespace-nowrap ${colorClass}`}>
                      {formatChange(row.change)}
                    </td>
                    <td className={`p-4 text-sm font-bold whitespace-nowrap ${colorClass}`}>
                      {formatChangePercent(row.change_percent)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <TrendIcon size={18} className={colorClass} strokeWidth={3} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <div className="text-xs font-bold text-slate-500">
            Page {page} of {totalPages}
          </div>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
