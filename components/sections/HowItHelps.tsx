import { Clock, TrendingUp, Brain, GraduationCap } from "lucide-react";

const BENEFITS = [
  {
    title: "Save Valuable Time",
    description: "Our tools are optimized for speed and simplicity. No complex setups or registrations—just get in, solve your problem, and get out in seconds.",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Improve Your SEO",
    description: "Identify technical errors, validate schema, and analyze heading structures to ensure your content is perfectly optimized for search engines.",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    title: "Better Trading Decisions",
    description: "Use our precise calculators to manage risk and identify key market levels, helping you trade with confidence and clarity.",
    icon: Brain,
    color: "text-indigo-500",
  },
  {
    title: "Learn While You Use",
    description: "Every tool includes beginner-friendly explanations. Understand the 'why' behind the 'how' as you navigate through our platform.",
    icon: GraduationCap,
    color: "text-amber-500",
  },
];

export default function HowItHelps() {
  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/50">
      <div className="section-padding space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How SM Developers Helps You Succeed
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Our platform isn't just a collection of links. It's a comprehensive resource designed to provide real-world value across multiple domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="flex gap-6 p-8 bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-3xl hover:shadow-xl transition-shadow group">
              <div className={`shrink-0 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${benefit.color} group-hover:scale-110 transition-transform`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
