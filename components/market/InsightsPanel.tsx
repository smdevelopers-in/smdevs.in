import React from 'react';
import { MarketInsight, MarketDataByCategory } from '@/types/market';
import { AlertCircle } from 'lucide-react';

interface InsightsPanelProps {
  insights: MarketInsight[];
}

export function generateInsights(data: MarketDataByCategory): MarketInsight[] {
  const insights: MarketInsight[] = [];

  const allMarkets = Object.values(data).flat();
  const getSnapshot = (symbol: string) => allMarkets.find(m => m.market.symbol === symbol)?.snapshot;

  const gold = getSnapshot('GOLD');
  const crude = getSnapshot('CRUDEOIL');
  const dxy = getSnapshot('DXY');
  const vix = getSnapshot('INDIAVIX');
  const nifty = getSnapshot('NIFTY');

  if (gold && gold.change_percent > 1) {
    insights.push({
      id: 'gold-up',
      trigger: 'Gold Rising',
      implication: 'Safe Haven Buying',
      sectors: ['Precious Metals', 'Jewellery'],
      sentiment: 'bearish',
      icon: '🏆',
      description: 'Gold is up over 1%, indicating shift to safe haven assets.'
    });
  } else if (gold && gold.change_percent < -1) {
    insights.push({
      id: 'gold-down',
      trigger: 'Gold Falling',
      implication: 'Risk-On Sentiment',
      sectors: ['Equities', 'Banking'],
      sentiment: 'bullish',
      icon: '🌟',
      description: 'Gold is down, indicating risk-on sentiment in the market.'
    });
  }

  if (crude && crude.change_percent > 2) {
    insights.push({
      id: 'crude-up',
      trigger: 'Crude Rising',
      implication: 'Input Cost Pressure',
      sectors: ['Paints', 'Tyres', 'Aviation'],
      sentiment: 'bearish',
      icon: '🛢️',
      description: 'Crude oil is up over 2%, negative for crude-sensitive sectors.'
    });
  } else if (crude && crude.change_percent < -1) {
    insights.push({
      id: 'crude-down',
      trigger: 'Crude Falling',
      implication: 'Cost Relief',
      sectors: ['Paints', 'Tyres', 'Airlines'],
      sentiment: 'bullish',
      icon: '⛽',
      description: 'Crude oil is falling, positive for crude-sensitive sectors.'
    });
  }

  if (dxy && dxy.change_percent > 0.5) {
    insights.push({
      id: 'dxy-up',
      trigger: 'Dollar Strengthening',
      implication: 'Supports IT Exports, Weak Rupee',
      sectors: ['IT', 'Pharma Exports'],
      sentiment: 'neutral',
      icon: '💵',
      description: 'Dollar index is up, supporting export-oriented sectors.'
    });
  } else if (dxy && dxy.change_percent < -0.5) {
    insights.push({
      id: 'dxy-down',
      trigger: 'Dollar Weakening',
      implication: 'Import Relief',
      sectors: ['Import-Heavy Industries'],
      sentiment: 'neutral',
      icon: '📉',
      description: 'Dollar is weakening, providing relief to importers.'
    });
  }

  if (vix && vix.close_price > 20) {
    insights.push({
      id: 'vix-high',
      trigger: 'High Volatility Expected',
      implication: 'Options Premium Elevated',
      sectors: ['Options Traders'],
      sentiment: 'bearish',
      icon: '⚡',
      description: 'VIX is above 20, indicating high expected volatility.'
    });
  } else if (vix && vix.close_price < 14) {
    insights.push({
      id: 'vix-low',
      trigger: 'Low Volatility',
      implication: 'Calm Market Environment',
      sectors: ['Index Traders'],
      sentiment: 'bullish',
      icon: '🌊',
      description: 'VIX is below 14, indicating a calm market.'
    });
  }

  if (nifty && nifty.change_percent > 0.5) {
    insights.push({
      id: 'nifty-up',
      trigger: 'Nifty Strong Opening',
      implication: 'Broad Market Bullishness',
      sectors: ['Banking', 'Auto', 'FMCG'],
      sentiment: 'bullish',
      icon: '📈',
      description: 'Nifty is up over 0.5%, signaling broad bullishness.'
    });
  } else if (nifty && nifty.change_percent < -0.5) {
    insights.push({
      id: 'nifty-down',
      trigger: 'Nifty Weak Opening',
      implication: 'Selling Pressure',
      sectors: ['All Sectors'],
      sentiment: 'bearish',
      icon: '📉',
      description: 'Nifty is down over 0.5%, signaling selling pressure.'
    });
  }

  return insights;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  if (!insights || insights.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
        <AlertCircle size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Significant Insights</h3>
        <p className="text-slate-500 text-sm max-w-md">Market is currently stable with no major triggers or significant moves across key assets.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight) => {
        let borderClass = 'border-amber-200 dark:border-amber-900/40';
        let bgIconClass = 'bg-amber-100 dark:bg-amber-900/40 text-amber-600';
        
        if (insight.sentiment === 'bullish') {
          borderClass = 'border-emerald-200 dark:border-emerald-900/40';
          bgIconClass = 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600';
        } else if (insight.sentiment === 'bearish') {
          borderClass = 'border-rose-200 dark:border-rose-900/40';
          bgIconClass = 'bg-rose-100 dark:bg-rose-900/40 text-rose-600';
        }

        return (
          <div key={insight.id} className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 border ${borderClass} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${bgIconClass}`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-slate-900 dark:text-white">{insight.trigger}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">→ {insight.implication}</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              {insight.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {insight.sectors.map((sector, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full font-bold">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
