"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SentimentResult } from '@/types/market';
import { PerformanceBadge } from './PerformanceBadge';

interface SentimentCardProps {
  sentiment: SentimentResult;
}

export function SentimentCard({ sentiment }: SentimentCardProps) {
  const [expanded, setExpanded] = useState(true);

  const score = sentiment.score ?? sentiment.factors?.filter(f => f.signal === 'bullish').length ?? 0;
  const totalFactors = sentiment.factors?.length ?? 7;
  const percentage = (score / totalFactors) * 100;

  const getSentimentColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'very bullish': return 'text-emerald-600 dark:text-emerald-500';
      case 'bullish': return 'text-emerald-500 dark:text-emerald-400';
      case 'bearish': return 'text-rose-500 dark:text-rose-400';
      case 'very bearish': return 'text-rose-600 dark:text-rose-500';
      case 'neutral':
      default: return 'text-amber-500 dark:text-amber-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all">
      <div className="mb-8">
        <h2 className={`text-4xl md:text-6xl font-black mb-4 ${getSentimentColor(sentiment.overall)}`}>
          {sentiment.overall}
        </h2>
        <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          Score: {score}/{totalFactors} factors
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
          {sentiment.summary}
        </p>
      </div>

      <div className="mb-8">
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex relative">
          <div className="h-full bg-rose-500 w-[14.28%]" />
          <div className="h-full bg-rose-400 w-[14.28%]" />
          <div className="h-full bg-rose-300 w-[14.28%]" />
          <div className="h-full bg-amber-400 w-[14.28%]" />
          <div className="h-full bg-emerald-300 w-[14.28%]" />
          <div className="h-full bg-emerald-400 w-[14.28%]" />
          <div className="h-full bg-emerald-500 w-[14.28%]" />
          
          <div 
            className="absolute top-0 bottom-0 w-1.5 bg-slate-900 dark:bg-white rounded-full shadow-sm transition-all duration-500"
            style={{ left: `calc(${percentage}% - 3px)` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>Bearish</span>
          <span>Neutral</span>
          <span>Bullish</span>
        </div>
      </div>

      <div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>Market Factors Analysis</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {expanded && sentiment.factors && (
          <div className="mt-4 space-y-3">
            {sentiment.factors.map((factor, idx) => {
              let colorClasses = 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/20';
              if (factor.signal === 'bullish') colorClasses = 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/20';
              if (factor.signal === 'bearish') colorClasses = 'border-rose-200 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-900/20';
              
              return (
                <div key={idx} className={`p-4 rounded-2xl border flex gap-3 items-start ${colorClasses}`}>
                  <div className="text-xl">{factor.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{factor.name}</h4>
                      <PerformanceBadge signal={factor.signal} size="sm" />
                    </div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {factor.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
