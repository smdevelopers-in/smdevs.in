"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Smartphone, Wrench, BookOpen, Users, Sparkles, TrendingUp, Search, Activity } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  {
    name: "Tools",
    href: "#",
    dropdown: [
      { name: "SEO Tools", href: "/tools/seo" },
      { name: "Trading Tools", href: "/tools/trading" },
      { name: "Other Tools", href: "/tools/others" },
    ]
  },
  {
    name: "Mobile Apps",
    href: "#",
    dropdown: [
      { name: "SEO Apps", href: "/tools/seo-app" },
      { name: "Trading Apps", href: "/tools/trading-app" },
    ]
  },
  {
    name: "Resources",
    href: "#",
    dropdown: [
      { name: "Blogs", href: "/resources/blogs" },
      { name: "Infographics", href: "/resources/infographics" },
    ]
  },
  {
    name: "Live Indices",
    href: "/tools/trading/market-dashboard",
    isLive: true,
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className={`fixed top-0 w-full ${isOpen ? "z-[9999] bg-white dark:bg-slate-950" : "z-[100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"} py-3 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="SM Developers Home">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            SM
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
            Devs<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative group py-2"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {'isLive' in link && link.isLive ? (
                <Link
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-sm font-black text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all group/live"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Activity className="w-3.5 h-3.5" />
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={(e) => link.dropdown && e.preventDefault()}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                  )}
                </Link>
              )}

              {/* Simple Dropdown */}
              {link.dropdown && activeDropdown === link.name && (
                <div className="absolute top-full left-0 pt-2 min-w-[220px] animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-1.5">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-all"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="hidden md:block px-8 py-3 rounded-2xl bg-blue-600 text-white text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
          >
            Home
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden fixed left-0 right-0 bottom-0 top-[64px] bg-white dark:bg-slate-950 z-[999] overflow-y-auto border-t border-slate-100 dark:border-slate-800">
          <div className="p-8 space-y-10">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="space-y-6">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                   {link.name}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {'isLive' in link && link.isLive ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-black text-emerald-700 dark:text-emerald-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <Activity className="w-4 h-4" />
                      {link.name}
                    </Link>
                  ) : link.dropdown ? link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-sm font-black text-slate-900 dark:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )) : (
                    <Link href={link.href} className="text-xl font-black text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>
                      {link.name}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-10 flex flex-col gap-4">
              <Link
                href="/tools/seo"
                className="w-full text-center py-5 rounded-2xl bg-blue-600 text-white font-black shadow-xl shadow-blue-500/20"
                onClick={() => setIsOpen(false)}
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

