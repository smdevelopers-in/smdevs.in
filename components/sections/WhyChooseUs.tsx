import { Heart, Globe, Zap, TrendingUp, CheckCircle } from "lucide-react";

const REASONS = [
  {
    title: "Free to use",
    description: "Our core belief is that powerful tools should be accessible to everyone at zero cost.",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Built for everyone",
    description: "Whether you're a student, a senior dev, or a trader, our UI is intuitive and simple.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Fast and simple",
    description: "Optimized for speed. No bloat, no complex setups. Just click and use.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Continuously growing",
    description: "We add new tools and features every week based on user feedback and needs.",
    icon: TrendingUp,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/50">
      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Why Use <span className="gradient-text">SM Developers</span>?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            We build tools that solve real problems. Whether you're a blogger looking to rank higher or a trader managing risk, our platform is optimized for your success.
          </p>
          <div className="space-y-4">
            {[
              "100% Free: No subscriptions or hidden fees",
              "Privacy First: No login or registration required",
              "Beginner Friendly: Simple, clear, and easy to use",
              "Instant Results: Fast, lightweight, and efficient",
              "Continuous Learning: Built to help you understand SEO & Trading",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-200 italic">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REASONS.map((reason, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-primary/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-2xl ${reason.bg} ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <reason.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{reason.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
