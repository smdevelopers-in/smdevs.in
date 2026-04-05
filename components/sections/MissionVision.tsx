import { Target, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/30">
      <div className="section-padding grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="glass p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden group border-border hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            To provide developers, learners, and creators with free, high-performance tools that simplify complex tasks and accelerate growth. We aim to break down the barriers of entry to professional instruments.
          </p>
          <Link href="#" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline group">
            Read More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Vision Card */}
        <div className="glass p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden group border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            To become the world's leading open-access platform for specialized utilities, fostering a community where innovation is limited only by imagination, not by the cost of the tools needed to create.
          </p>
          <Link href="#" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline group">
            Our Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
