import Link from "next/link";
import { Home, Search, TrendingUp, Smartphone, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Large 404 Display */}
        <div className="relative">
          <h1 className="text-[10rem] md:text-[14rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30 animate-bounce">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Page Not Found
              </h2>
            </div>
          </div>
        </div>

        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Navigation CTAs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Home", href: "/", icon: Home, color: "bg-blue-600 shadow-blue-500/20" },
            { name: "SEO Tools", href: "/tools/seo", icon: Search, color: "bg-indigo-600 shadow-indigo-500/20" },
            { name: "Trading", href: "/tools/trading", icon: TrendingUp, color: "bg-emerald-600 shadow-emerald-500/20" },
            { name: "Mobile Apps", href: "/tools/trading-app", icon: Smartphone, color: "bg-rose-600 shadow-rose-500/20" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Take Me Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
