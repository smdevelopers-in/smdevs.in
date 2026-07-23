"use client";

import React from 'react';
import { PerformanceBadge } from './PerformanceBadge';
import { Market, MarketSnapshot } from '@/types/market';
import { formatChange, formatChangePercent, formatPrice, getSignal } from '@/lib/market-calculations';

interface MarketCardProps {
  market: Market;
  snapshot: MarketSnapshot | null;
  compact?: boolean;
}

export function MarketCard({ market, snapshot, compact = false }: MarketCardProps) {
  if (!snapshot) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
        <div className="flex gap-2 mb-5">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-16"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-16"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const { change, change_percent, close, previous_close, high, low } = snapshot;
  const signal = getSignal(change_percent);
  const isIndianOrGlobalIndex = market.category === 'Indian Index' || market.category === 'Global Index';
  
  const cp = change_percent ?? 0;
  let changeColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
  if (cp > 0) {
    changeColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
  } else if (cp < 0) {
    changeColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20';
  }

  const decimals = market.category === 'Currency' ? 4 : 2;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{market.display_name}</h3>
        <PerformanceBadge signal={signal} size="sm" />
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-black text-slate-900 dark:text-white">
          {formatPrice(close, decimals)}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-5">
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${changeColor}`}>
          {formatChange(change)}
        </span>
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${changeColor}`}>
          {formatChangePercent(change_percent)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Prev Close</div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {formatPrice(previous_close, decimals)}
          </div>
        </div>
        {isIndianOrGlobalIndex && high != null && low != null && (
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">High / Low</div>
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {formatPrice(high)} / {formatPrice(low)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

