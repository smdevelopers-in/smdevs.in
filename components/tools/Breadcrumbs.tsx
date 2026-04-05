"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-3 text-xs font-bold" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="text-slate-400 hover:text-blue-600 transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-white font-black truncate max-w-[150px] md:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
