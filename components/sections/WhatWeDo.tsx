import { Blocks, Rocket, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    title: "Build free tools",
    description: "We develop high-quality, open-source tools to help developers and creators succeed without barriers.",
    icon: Blocks,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Help learners grow",
    description: "Our platform provides resources and simple-to-use tools that make learning complex concepts easier.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Simplify complex tasks",
    description: "From JSON formatting to trading analysis, we automate the boring stuff so you can focus on building.",
    icon: Rocket,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Open access for everyone",
    description: "No subscriptions, no hidden fees. Just powerful tools available to everyone, everywhere, at any time.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/50">
      <div className="section-padding space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            What <span className="text-blue-600">SM Developers</span> Offers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We provide a specialized platform where beginners, bloggers, and traders can solve complex problems instantly using our intuitive, high-performance tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
