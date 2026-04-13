import { ChevronRight, Home, HelpCircle, Lightbulb, Info, MessageSquarePlus, Sparkles } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import FAQSection, { FAQ } from "./FAQSection";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  howToUse?: string[];
  tips?: string[];
  explanation?: React.ReactNode;
  toolType?: "SEO" | "Trading" | "AI" | "Developer";
  faqs?: FAQ[];
}

export default function ToolLayout({
  title,
  description,
  children,
  howToUse,
  tips,
  explanation,
  toolType = "SEO",
  faqs
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Tool Header (Banner) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
          <div className="space-y-6">
            <Breadcrumbs 
              items={[
                { label: "Web Tools", href: "/#web-tools" },
                { label: `${toolType} Tools`, href: `/tools/${toolType.toLowerCase()}` },
                { label: title }
              ]} 
            />
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed text-lg lg:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="space-y-16">
          {/* Tool Logic / Children */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
            {children}
          </div>

          {/* Tips Section (Moved to Bottom) */}
          {tips && tips.length > 0 && (
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
              <Lightbulb className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
              <div className="flex items-center gap-4 mb-8 relative">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic">Expert Tips</h2>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Get the most out of this tool</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-amber-500 font-black">#0{index + 1}</span>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation Section (Moved to Bottom) */}
          {explanation && (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Why use this tool?</h2>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">In-depth Analysis & Guidance</p>
                </div>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {explanation}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {faqs && <FAQSection faqs={faqs} />}

          {/* Premium Share Your Experience CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-[#020617] dark:from-[#020617] dark:to-slate-950 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 backdrop-blur-md shadow-xl shadow-black/10 group-hover:scale-110 transition-transform hidden sm:flex">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-black text-white mb-2">Love our tools?</h2>
                <p className="text-slate-400 font-medium text-lg">Your feedback helps us continuously improve.</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if(typeof window !== 'undefined') window.dispatchEvent(new Event('trigger-review-popup'))
              }}
              className="relative z-10 w-full md:w-auto shrink-0 px-10 py-5 bg-blue-600 text-white border border-blue-500/50 font-black rounded-full hover:bg-blue-500 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              Share Your Experience
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
