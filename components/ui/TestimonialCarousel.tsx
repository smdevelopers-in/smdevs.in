"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Linkedin, Quote } from "lucide-react";

export default function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
         <p className="text-slate-500 font-medium">No reviews yet. Be the first!</p>
      </div>
    );
  }

  // To display 3 cards smoothly, we'll shift the container manually.
  // We double the array if it's too short just to allow repeating logic easily, 
  // but let's stick to a straightforward infinite slide implementation.
  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div 
      className="relative w-full overflow-hidden" 
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={startTimer}
    >
       <div 
         className="flex transition-transform duration-700 ease-in-out gap-6"
         style={{ transform: `translateX(calc(-${index * (100 / Math.min(displayItems.length, 3))}% - ${index * 1.5}rem))` }}
       >
          {displayItems.map((t, idx) => (
             <div 
               key={`${t.id}-${idx}`} 
               className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl shadow-blue-500/5 snap-center flex flex-col justify-between"
             >
                <div className="space-y-6">
                   <div className="flex text-amber-400 gap-1">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                      ))}
                   </div>
                   <div className="relative">
                      <Quote className="absolute -top-3 -left-3 w-8 h-8 text-blue-500/10 dark:text-blue-500/20 rotate-180" />
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic line-clamp-4 relative z-10">
                         "{t.review}"
                      </p>
                   </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div>
                      <div className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
                         {t.name}
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                         {t.designation}
                      </div>
                   </div>
                   {t.linkedin_id && (
                      <a 
                        href={t.linkedin_id.includes('http') ? t.linkedin_id : `https://linkedin.com/in/${t.linkedin_id}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors shrink-0"
                        aria-label={`${t.name}'s LinkedIn Profile`}
                      >
                         <Linkedin className="w-5 h-5" fill="currentColor" />
                      </a>
                   )}
                </div>
             </div>
          ))}
       </div>
       
       {/* Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, dotIdx) => (
             <button
                key={dotIdx}
                onClick={() => setIndex(dotIdx)}
                className="p-3"
                aria-label={`Go to slide ${dotIdx + 1}`}
             >
                <div className={`w-2 h-2 rounded-full transition-all ${
                   index % testimonials.length === dotIdx 
                     ? "w-8 bg-blue-600" 
                     : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`} />
             </button>
          ))}
       </div>
    </div>
  );
}
