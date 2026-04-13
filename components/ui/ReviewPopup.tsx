"use client";

import React, { useState, useEffect } from "react";
import { X, Star, CheckCircle2, Sparkles, Loader2, Send } from "lucide-react";

export default function ReviewPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    linkedinId: "",
    category: "Overall",
    designation: "",
    review: "",
    rating: 5,
    allowPublic: true
  });

  useEffect(() => {
    const handleTrigger = () => {
      const hasReviewed = localStorage.getItem("reviewPopupShown");
      if (!hasReviewed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("trigger-review-popup", handleTrigger);
    return () => window.removeEventListener("trigger-review-popup", handleTrigger);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          linkedinId: formData.linkedinId,
          category: formData.category,
          designation: formData.designation,
          review: formData.review,
          rating: formData.rating
        })
      });
      localStorage.setItem("reviewPopupShown", "true");
      setTimeout(() => {
         // trigger an event so page can refetch
         window.dispatchEvent(new Event("testimonial-added"));
      }, 500);
    } catch(err) {
      console.error(err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={() => setIsVisible(false)}
      />
      
      {/* Modal Container */}
      <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative w-full max-w-[500px] animate-in zoom-in-95 fade-in duration-300 z-10 font-sans">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-[100px] rounded-full point-events-none" />

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-20 bg-slate-800/50 hover:bg-slate-700/50 p-2 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white leading-tight">You're Amazing!</h2>
              <p className="text-slate-400 font-medium">Your feedback helps us build a better platform.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar relative z-10">
            <div className="flex flex-col items-center text-center space-y-4 mb-2">
              <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white leading-tight tracking-tight">Love our tools?</h2>
                <p className="text-slate-400 font-medium text-sm">Help us grow by sharing your experience.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium transition-all text-white placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">LinkedIn Username <span className="text-slate-600">(Optional)</span></label>
                  <input 
                    type="text"
                    value={formData.linkedinId}
                    onChange={(e) => setFormData({...formData, linkedinId: e.target.value})}
                    placeholder="e.g. john-doe"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium transition-all text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium transition-all text-white appearance-none"
                  >
                    <option value="Overall">Overall Platform</option>
                    <option value="SEO Tools">SEO Tools</option>
                    <option value="Trading Tools">Trading Tools</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                  <input 
                    required
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    placeholder="e.g. Content Creator, Trader"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium transition-all text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Review</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  placeholder="What makes our tools stand out?"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium transition-all text-white resize-none placeholder-slate-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 pb-1">
                <label className="text-xs font-bold text-slate-400">Rate your experience</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="transition-transform active:scale-90 hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${star <= formData.rating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-600'}`} 
                        fill={star <= formData.rating ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 mt-4 border border-indigo-500/50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Submit Testimonial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
