"use client";

import { Mail, MessageSquare, MapPin, Globe, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
           <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-blue-500/10">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-500" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
             Get in Touch
           </h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
             Have a question, feedback, or a partnership inquiry? We'd love to hear from you. Drop us a message below.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8 h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              We aim to respond to all inquiries within 24-48 business hours. For specific tool support, please use the feedback forms available on individual tool pages.
            </p>
            
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Email Address</p>
                   <a href="mailto:smdevelopers016@gmail.com" className="text-lg font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                     smdevelopers016@gmail.com
                   </a>
                 </div>
               </div>
               
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Platform</p>
                   <p className="text-lg font-black text-slate-900 dark:text-white">
                     SM Developers (Global)
                   </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Send a Message</h2>
             
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message service is currently unlinked. Please use the direct email provided.'); }}>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">Name</label>
                 <input 
                   type="text" 
                   required
                   placeholder="Your Name" 
                   className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">Email</label>
                 <input 
                   type="email" 
                   required
                   placeholder="your@email.com" 
                   className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">Message</label>
                 <textarea 
                   rows={4}
                   required
                   placeholder="How can we help you?" 
                   className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all resize-none"
                 />
               </div>
               
               <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-xl active:scale-[0.98]">
                 <MessageSquare className="w-5 h-5" />
                 Send Message
               </button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
}
