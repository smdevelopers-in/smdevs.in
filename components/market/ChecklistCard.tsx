"use client";

import React from 'react';
import { BarChart3, CheckCircle2, Clock, Minus } from 'lucide-react';
import { ChecklistItem } from '@/types/market';

interface ChecklistCardProps {
  items: ChecklistItem[];
}

export function ChecklistCard({ items }: ChecklistCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
          <BarChart3 size={24} strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Daily Routine</div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Morning Trading Checklist</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          let cardClasses = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';
          let Badge = null;
          let StatusIcon = null;

          if (item.status === 'complete') {
            cardClasses = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100';
            Badge = <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">COMPLETE</span>;
            StatusIcon = <CheckCircle2 size={16} className="text-emerald-500" />;
          } else if (item.status === 'pending') {
            cardClasses = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
            Badge = <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-black">PENDING</span>;
            StatusIcon = <Clock size={16} className="text-amber-500" />;
          } else {
            Badge = <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-black">N/A</span>;
            StatusIcon = <Minus size={16} className="text-slate-400" />;
          }

          return (
            <div key={idx} className={`p-4 rounded-2xl border flex gap-3 items-start ${cardClasses}`}>
              <div className="text-xl mt-0.5">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-sm">{item.label}</h4>
                  {Badge}
                </div>
                <p className="text-xs font-medium opacity-80">
                  {item.detail}
                </p>
              </div>
              <div className="mt-1">
                {StatusIcon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
