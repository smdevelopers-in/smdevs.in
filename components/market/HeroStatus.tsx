"use client";

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { MarketStatus } from '@/types/market';

interface HeroStatusProps {
  lastRefreshed: string | null;
  marketStatus: MarketStatus;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function HeroStatus({ lastRefreshed, marketStatus, onRefresh, isRefreshing }: HeroStatusProps) {
  const getStatusConfig = () => {
    switch (marketStatus) {
      case 'open':
        return {
          bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
          dot: 'bg-emerald-500 animate-pulse',
          text: 'Market Open'
        };
      case 'pre-open':
        return {
          bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          dot: 'bg-amber-500 animate-pulse',
          text: 'Pre-Open'
        };
      case 'closed':
      default:
        return {
          bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
          dot: 'bg-slate-400',
          text: 'Market Closed'
        };
    }
  };

  const config = getStatusConfig();
  const formattedTime = lastRefreshed 
    ? new Date(lastRefreshed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Unknown';

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${config.bg}`}>
        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
        {config.text}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Last Updated: {formattedTime}
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:opacity-70"
      >
        <RefreshCw size={14} strokeWidth={3} className={isRefreshing ? 'animate-spin' : ''} />
        REFRESH
      </button>
    </div>
  );
}
