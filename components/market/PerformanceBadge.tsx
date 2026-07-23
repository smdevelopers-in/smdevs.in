import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import React from 'react';

interface PerformanceBadgeProps {
  signal: 'bullish' | 'bearish' | 'neutral';
  changePercent?: number | null;
  size?: 'sm' | 'md';
}

export function PerformanceBadge({ signal, changePercent, size = 'sm' }: PerformanceBadgeProps) {
  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';
  const iconSize = isSm ? 12 : 14;

  let bgClass, textClass, borderClass, Icon, text;
  
  switch (signal) {
    case 'bullish':
      bgClass = 'bg-emerald-100 dark:bg-emerald-900/30';
      textClass = 'text-emerald-700 dark:text-emerald-400';
      borderClass = 'border border-emerald-200 dark:border-emerald-800';
      Icon = TrendingUp;
      text = 'Bullish';
      break;
    case 'bearish':
      bgClass = 'bg-rose-100 dark:bg-rose-900/30';
      textClass = 'text-rose-700 dark:text-rose-400';
      borderClass = 'border border-rose-200 dark:border-rose-800';
      Icon = TrendingDown;
      text = 'Bearish';
      break;
    default:
      bgClass = 'bg-amber-100 dark:bg-amber-900/30';
      textClass = 'text-amber-700 dark:text-amber-400';
      borderClass = 'border border-amber-200 dark:border-amber-800';
      Icon = Minus;
      text = 'Neutral';
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-widest ${bgClass} ${textClass} ${borderClass} ${sizeClasses}`}>
      <Icon size={iconSize} strokeWidth={3} />
      <span>{text}</span>
      {changePercent != null && (
        <span className="ml-1">
          {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      )}
    </div>
  );
}
