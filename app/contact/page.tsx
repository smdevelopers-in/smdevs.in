"use client";

import { Mail, MessageSquare, Globe, Sparkles, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(data.error || "Failed to send message. Please use direct email.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none z-0">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center space-y-6 mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-widest border border-blue-200 dark:border-blue-800/50 mb-4 shadow-sm">
             <Sparkles className="w-4 h-4" /> Priority Support
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
             Let's build something <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">extraordinary together.</span>
           </h1>
           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
             Whether you have a technical question, partnership inquiry, or just want to say hi—our core team is ready to respond.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Reach out directly</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                We're a globally distributed team. Use the form to shoot us a direct message, or reach out via our direct email for priority matters.
              </p>
            </div>
            
            <div className="space-y-8 pt-8">
               <div className="flex items-start gap-6 group">
                 <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300 shrink-0">
                    <Mail className="w-7 h-7 text-blue-600 dark:text-blue-500" />
                 </div>
                 <div className="space-y-1 pt-1">
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">Direct Email</p>
                   <a href="mailto:smdevelopers016@gmail.com" className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                     smdevelopers016@gmail.com
                   </a>
                   <p className="text-sm text-slate-500 font-medium">Average response time: &lt; 2 hours</p>
                 </div>
               </div>
               
               <div className="flex items-start gap-6 group">
                 <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300 shrink-0">
                    <Globe className="w-7 h-7 text-indigo-600 dark:text-indigo-500" />
                 </div>
                 <div className="space-y-1 pt-1">
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">Ecosystem</p>
                   <p className="text-xl font-bold text-slate-900 dark:text-white">
                     SM Developers Global
                   </p>
                   <p className="text-sm text-slate-500 font-medium">Available 24/7 online</p>
                 </div>
               </div>
            </div>
            
            <div className="mt-12 p-8 bg-blue-600 text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-blue-600/20">
               <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
               <h3 className="text-xl font-black mb-2 relative z-10">Looking for Tool Support?</h3>
               <p className="text-blue-100 font-medium text-sm mb-6 relative z-10 w-4/5">
                 Visit the specific tool page and click the feedback icon in the bottom right corner for lightning-fast bug resolution.
               </p>
            </div>
          </div>

          <div className="lg:col-span-7">
             <div className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10">
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Send a Message</h2>
                   <p className="text-slate-500 mb-10 font-medium">Fill out the form below and we'll get right back to you.</p>
                   
                   {isSuccess ? (
                     <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center">
                           <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Message Sent!</h3>
                          <p className="text-slate-600 dark:text-slate-400 font-medium">We've received your inquiry and will be in touch shortly.</p>
                        </div>
                     </div>
                   ) : (
                     <form className="space-y-6" onSubmit={handleSubmit}>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-2 flex items-center gap-2">
                              <User className="w-3 h-3 text-blue-500" /> Name
                           </label>
                           <input 
                             type="text" 
                             required
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             placeholder="John Doe" 
                             className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-2 flex items-center gap-2">
                              <Mail className="w-3 h-3 text-blue-500" /> Email
                           </label>
                           <input 
                             type="email" 
                             required
                             value={formData.email}
                             onChange={(e) => setFormData({...formData, email: e.target.value})}
                             placeholder="john@example.com" 
                             className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm"
                           />
                         </div>
                       </div>

                       <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest ml-2 flex items-center gap-2">
                            <MessageSquare className="w-3 h-3 text-blue-500" /> Message
                         </label>
                         <textarea 
                           rows={5}
                           required
                           value={formData.message}
                           onChange={(e) => setFormData({...formData, message: e.target.value})}
                           placeholder="Tell us about your project or inquiry..." 
                           className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm resize-none"
                         />
                       </div>
                       
                       {error && <p className="text-red-500 text-sm font-bold ml-2">{error}</p>}
                       
                       <button 
                         type="submit" 
                         disabled={isLoading}
                         className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black rounded-full flex items-center justify-center sm:justify-start gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-95 group"
                       >
                         {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Send Message"}
                         {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> }
                       </button>
                     </form>
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* SEO Content Section — fixes low word count */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-200 dark:border-slate-800">
          {[
            {
              title: "Tool Support",
              body: "For questions about any of our SEO tools or trading calculators, visit the specific tool page first. Each tool includes a detailed FAQ section and step-by-step usage guide that resolves the majority of common questions.",
              link: { label: "Browse SEO Tools", href: "/tools/seo" }
            },
            {
              title: "Partnerships & Integrations",
              body: "We welcome collaboration proposals from agencies, content creators, and developers. If you're interested in white-labeling our tools, building integrations, or co-creating content, reach out with partnership details in your message.",
              link: { label: "Browse Trading Tools", href: "/tools/trading" }
            },
            {
              title: "Bug Reports & Feedback",
              body: "Help us improve by reporting bugs, unexpected results, or UX issues. Include the tool name, your browser, and a description of the issue. We prioritize verified bug reports and typically ship fixes within 24–48 hours.",
              link: { label: "Read Documentation", href: "/docs" }
            }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.body}</p>
              <a href={item.link.href} className="inline-flex items-center gap-1 text-sm font-black text-blue-600 hover:text-blue-700 transition-colors">
                {item.link.label} →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">About SM Developers</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-4xl">
            SM Developers is a free, professional-grade toolkit for SEO professionals, content marketers, and active traders. We offer 20+ SEO tools including schema validators, meta tag generators, keyword analyzers, and SERP preview tools — alongside a suite of trading calculators covering position sizing, risk/reward ratios, pivot points, and options profit analysis. All tools are 100% free to use, require no registration, and run entirely in your browser. Our team is dedicated to making institutional-grade analytics accessible to everyone.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: "SEO Tools", href: "/tools/seo" },
              { label: "Trading Tools", href: "/tools/trading" },
              { label: "Documentation", href: "/docs" },
              { label: "Privacy Policy", href: "/privacy" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
