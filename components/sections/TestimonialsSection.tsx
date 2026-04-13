"use client";

import { useState, useEffect } from "react";
import { MessageSquarePlus, Sparkles, Loader2 } from "lucide-react";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials?status=published");
      const data = await res.json();
      if (Array.isArray(data)) {
         setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    
    // Listen for new testimonials added by the popup
    window.addEventListener("testimonial-added", fetchTestimonials);
    return () => window.removeEventListener("testimonial-added", fetchTestimonials);
  }, []);

  const openReviewPopup = () => {
    window.dispatchEvent(new Event("trigger-review-popup"));
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
           <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-widest border border-blue-200 dark:border-blue-800/50">
                <Sparkles className="w-4 h-4" /> Wall of Love
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Trusted by innovators <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">around the globe.</span>
              </h2>
           </div>
           
           <button 
             onClick={openReviewPopup}
             className="shrink-0 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
           >
             <MessageSquarePlus className="w-5 h-5 text-blue-600" />
             Share Your Experience
           </button>
        </div>

        {/* Carousel Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}
        
      </div>
    </section>
  );
}
