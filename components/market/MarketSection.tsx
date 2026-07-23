import React from 'react';

interface MarketSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  children: React.ReactNode;
  badge?: string;
}

export function MarketSection({
  title,
  subtitle,
  icon,
  iconBgColor = 'bg-blue-50 dark:bg-blue-900/20',
  iconColor = 'text-blue-600',
  children,
  badge
}: MarketSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgColor} ${iconColor}`}>
            {icon}
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {subtitle}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>
        </div>
        {badge && (
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/40">
            {badge}
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}
