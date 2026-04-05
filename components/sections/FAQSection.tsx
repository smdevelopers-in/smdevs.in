"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "Are these tools really free to use?",
    answer: "Yes, absolutely! Every tool on SM Developers is 100% free with no subscriptions, hidden fees, or premium paywalls. Our mission is to provide accessible utilities for everyone.",
  },
  {
    question: "Do I need technical knowledge to use the SEO tools?",
    answer: "Not at all. While our tools provide professional-grade data, they are designed with beginners in mind. Most tools include helpful explanations and actionable suggestions to guide you through the process.",
  },
  {
    question: "Are the results from the SEO Analyzer accurate?",
    answer: "Yes. Our SEO Structure Analyzer uses high-performance parsing logic (powered by Cheerio) to audit the actual HTML content of your page, ensuring 100% accuracy based on modern SEO standards.",
  },
  {
    question: "Who can benefit from SM Developers?",
    answer: "Our platform is built for a wide range of users, including bloggers looking to improve their rankings, traders seeking precise calculators, students learning web technicals, and developers needing quick utilities.",
  },
  {
    question: "Do I need to create an account or login?",
    answer: "No. We value your privacy and time. Most of our tools work instantly without requiring any registration, login, or personal information.",
  },
  {
    question: "Can beginners use the trading calculators?",
    answer: "Yes. Our trading tools, like the Pivot Calculator, provide clear outputs and simple interfaces that make complex market math accessible even if you are just starting your trading journey.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/50">
      <div className="section-padding max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <HelpCircle className="w-3 h-3" /> Common Questions
           </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Everything you need to know about our platform and how our tools operate.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="group border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-blue-500/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-8 pb-8 text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
