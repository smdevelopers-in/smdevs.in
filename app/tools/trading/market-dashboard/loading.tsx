import { Suspense } from 'react';
import Breadcrumbs from '@/components/tools/Breadcrumbs';
import RelatedTradingTools from '@/components/tools/RelatedTradingTools';
import LoadingSkeleton from '@/components/market/LoadingSkeleton';

// ─── Skeleton fallback while data loads ──────────────────────────────────────
export default function MarketDashboardLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 animate-pulse">
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="h-14 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="flex gap-3 mt-4">
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
      <LoadingSkeleton />
    </div>
  );
}
