import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white dark:bg-slate-900/50">
      <div className="section-padding relative">
        <div className="bg-slate-900 dark:bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden shadow-2xl">
          {/* Background Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32 blur-3xl animate-pulse delay-1000" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Trusted by 10,000+ users
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Ready to Optimize Your Strategy?
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join thousands of bloggers, developers, and traders who are already solving problems faster with SM Developers. No login, no complexity—just results.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/seo"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
            >
              Explore Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Documentation
            </Link>
          </div>

          <p className="text-white/40 text-sm font-medium">
            No registration required for most tools. Completely free forever.
          </p>
        </div>
      </div>
    </section>
  );
}
