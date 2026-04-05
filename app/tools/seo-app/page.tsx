"use client";

import React from "react";
import { Smartphone, Sparkles, Zap, Shield, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SEOAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-bold text-xs uppercase tracking-widest animate-fade-in">
             <Smartphone size={14} /> Mobile Experience
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            SEO Tools in <span className="text-blue-600">Your Pocket.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            We're building the most powerful SEO analysis companion for iOS and Android. 
            Perform site audits, keyword research, and track rankings anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
              Join Waitlist <ArrowRight size={18} />
            </button>
            <Link href="/tools/seo" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 transition-all">
              Use Web Version
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { icon: Search, title: "On-the-go Audits", desc: "Instantly analyze any URL's SEO performance from your phone." },
            { icon: Zap, title: "Real-time Alerts", desc: "Get notified when your keywords drop or rankings change." },
            { icon: Shield, title: "Safe & Secure", desc: "Enterprise-grade security for all your project data." }
          ].map((f, i) => (
            <div key={i} className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{f.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Development Status */}
        <div className="p-12 rounded-[3.5rem] bg-indigo-600 text-white relative overflow-hidden text-center space-y-6">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32" />
           <Sparkles className="mx-auto w-12 h-12 animate-pulse fill-white" />
           <h2 className="text-3xl font-black leading-tight">Coming Soon to App Store & Play Store</h2>
           <p className="text-indigo-100 font-medium max-w-2xl mx-auto">
             Our team is working hard to bring the full SM Developers SEO suite to mobile. 
             Sign up to be the first to know when we launch!
           </p>
        </div>
      </div>
    </div>
  );
}
