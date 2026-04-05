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
    <nav className="flex items-center gap-2 text-xs font-bold py-6 border-t border-white/5" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-slate-600 font-normal mx-1">/</span>
          {item.href ? (
            <Link href={item.href} className="text-slate-400 hover:text-white transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-black truncate max-w-[150px] md:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
