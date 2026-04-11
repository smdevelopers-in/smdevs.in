import React, { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first one by default

  if (!faqs || faqs.length === 0) return null;

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm mt-16">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
          <MessageCircleQuestion className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Learn more about this tool</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
             <div 
               key={index} 
               className={`border ${isOpen ? "border-fuchsia-500 shadow-md shadow-fuchsia-100 dark:shadow-fuchsia-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"} rounded-2xl overflow-hidden transition-all duration-300`}
             >
               <button
                 className={`w-full flex items-center justify-between p-5 text-left ${isOpen ? "bg-fuchsia-50 dark:bg-fuchsia-900/10" : "bg-white dark:bg-slate-900"} transition-colors`}
                 onClick={() => setOpenIndex(isOpen ? null : index)}
               >
                 <span className={`font-bold ${isOpen ? "text-fuchsia-600 dark:text-fuchsia-400" : "text-slate-900 dark:text-white"}`}>
                   {faq.question}
                 </span>
                 <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-fuchsia-600 dark:text-fuchsia-400" : "text-slate-400"}`} />
               </button>
               
               <div 
                 className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
               >
                 <div className="overflow-hidden">
                   <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-fuchsia-50 dark:bg-fuchsia-900/10 border-t border-fuchsia-100 dark:border-fuchsia-900/30">
                     {faq.answer}
                   </div>
                 </div>
               </div>
             </div>
          );
        })}
      </div>
    </div>
  );
}
