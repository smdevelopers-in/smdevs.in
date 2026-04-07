"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListOrdered } from "lucide-react";

interface TOCProps {
  items: { id: string; text: string; level: number }[];
}

export default function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <ListOrdered size={16} className="text-blue-600" /> Contents
      </h3>
      <ul className="space-y-3 font-medium text-sm max-h-[calc(100vh-24rem)] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((toc, i) => {
          const isActive = activeId === toc.id;
          return (
            <li 
              key={i} 
              style={{ paddingLeft: `${(toc.level - 1) * 0.75}rem` }}
              className="relative"
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600 h-full' : 'bg-transparent h-0'}`} 
                style={{ left: `calc(${(toc.level - 1) * 0.75}rem - 0.75rem)` }}
              />
              <a 
                href={`#${toc.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(toc.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(toc.id);
                }}
                className={`block transition-all duration-300 line-clamp-2 ${
                  isActive 
                    ? "text-blue-600 font-bold translate-x-1" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {toc.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
