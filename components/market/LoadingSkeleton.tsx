import React from 'react';

export function MarketCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16 animate-pulse"></div>
      </div>
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-5 animate-pulse"></div>
      <div className="flex gap-2 mb-5">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-16 animate-pulse"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-16 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
        </div>
        <div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <section className="space-y-6 mb-12">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
        <div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2 animate-pulse"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MarketCardSkeleton />
        <MarketCardSkeleton />
        <MarketCardSkeleton />
        <MarketCardSkeleton />
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <div className="mb-12">
      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl w-64 mb-4 animate-pulse"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-96 max-w-full mb-6 animate-pulse"></div>
      <div className="flex gap-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-24 animate-pulse"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse-container">
      <HeroSkeleton />
      <div className="space-y-12">
        <SectionSkeleton />
        <SectionSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-[2.5rem] animate-pulse"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-[2.5rem] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
