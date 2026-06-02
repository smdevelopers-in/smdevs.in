"use client";

import React, { useState, useEffect } from "react";
import { 
  ListChecks, 
  Search, 
  CheckCircle, 
  Circle,
  Layout,
  Settings,
  FileText,
  Sparkles,
  ArrowRight,
  Download,
  Trash2
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

const CHECKLIST_DATA = {
  "On-Page SEO": {
    icon: Layout,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    items: [
      { id: "op1", label: "Include primary keyword in the page title." },
      { id: "op2", label: "Optimize meta description to encourage CTR while including keywords." },
      { id: "op3", label: "Use proper heading stricture: exactly one H1, followed by H2s and H3s." },
      { id: "op4", label: "Ensure URLs are short, descriptive, and keyword-rich." },
    ]
  },
  "Technical SEO": {
    icon: Settings,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    items: [
      { id: "ts1", label: "Ensure an XML Sitemap exists and is submitted to Google Search Console." },
      { id: "ts2", label: "Verify robots.txt is correctly configured and not blocking important bots." },
      { id: "ts3", label: "Optimize page speed (lazy load images, compress assets, caching)." },
      { id: "ts4", label: "Ensure page is 100% mobile responsive without viewport errors." },
    ]
  },
  "Content SEO": {
    icon: FileText,
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    items: [
      { id: "cs1", label: "Maintain optimal keyword density naturally without stuffing." },
      { id: "cs2", label: "Add strategic internal links to cornerstone or related pages." },
      { id: "cs3", label: "Add credible external links pointing to authoritative, trusted sources." },
      { id: "cs4", label: "Satisfy the search intent fully (Informational vs Transactional content)." },
    ]
  },
  "Advanced SEO": {
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    items: [
      { id: "as1", label: "Implement appropriate Schema markup (JSON-LD) for rich snippets." },
      { id: "as2", label: "Use descriptive, keyword-infused alt text for all critical images." },
      { id: "as3", label: "Configure Canonical tags to avoid duplicate content penalties." },
      { id: "as4", label: "Apply Open Graph & Twitter Card metadata for highly optimzed social sharing." }
    ]
  }
};

const TOTAL_ITEMS = Object.values(CHECKLIST_DATA).reduce((acc, cat) => acc + cat.items.length, 0);

const CHECKLIST_FAQS = [
  {
    question: "How does the SEO Checklist Generator work?",
    answer: "It breaks down Search Engine Optimization into four actionable categories. As you mark items off, your progress is automatically saved locally in your browser. You can return at any time to complete your audit."
  },
  {
    question: "Do I need to complete every item perfectly?",
    answer: "While aiming for 100% is ideal, completing even 80% of these checks significantly elevates your baseline SEO over competitors. Prioritize On-Page and Content SEO first."
  },
  {
    question: "Is this data stored on your servers?",
    answer: "No, this tool uses 100% client-side LocalStorage. Your target keywords, URLs, and checklist progression remain securely on your local device."
  },
  {
    question: "Can I use this for multiple separate websites?",
    answer: "Yes, currently it acts as a global master checklist but is architected to scale. Just clear the checklist using the top-right reset button to begin auditing a new keyword or domain."
  }
];

export default function SEOChecklistGeneratorPage() {
  const [target, setTarget] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Load initial state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("seo-master-checklist");
      const savedTarget = localStorage.getItem("seo-master-target");
      if (saved) setCheckedItems(JSON.parse(saved));
      if (savedTarget) {
        setTarget(savedTarget);
        setInitialized(true);
      }
    } catch (e) {}
  }, []);

  // Save to local storage upon change
  useEffect(() => {
    if (initialized || target) {
      localStorage.setItem("seo-master-checklist", JSON.stringify(checkedItems));
      localStorage.setItem("seo-master-target", target);
    }
  }, [checkedItems, target, initialized]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (target.trim().length > 0) {
      setInitialized(true);
    }
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to clear this checklist? All progress will be lost.")) {
      setCheckedItems({});
      setTarget("");
      setInitialized(false);
      localStorage.removeItem("seo-master-checklist");
      localStorage.removeItem("seo-master-target");
    }
  };

  const downloadReport = () => {
    let report = `SEO Checklist Report for: ${target}\n`;
    report += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    Object.entries(CHECKLIST_DATA).forEach(([catName, catData]) => {
      report += `--- ${catName.toUpperCase()} ---\n`;
      catData.items.forEach(item => {
        const isChecked = checkedItems[item.id] ? "[X]" : "[ ]";
        report += `${isChecked} ${item.label}\n`;
      });
      report += `\n`;
    });
    
    // Calculate total
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = Math.round((checkedCount / TOTAL_ITEMS) * 100);
    report += `TOTAL PROGRESS: ${progress}% (${checkedCount} / ${TOTAL_ITEMS})`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-checklist-${target.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'report'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / TOTAL_ITEMS) * 100);

  return (
    <ToolLayout
      title="SEO Checklist Tool Free"
      description="A foolproof, interactive SEO checklist designed to drastically improve rankings. Never miss a critical optimization step again."
      toolType="SEO"
      howToUse={[
        "Enter your target keyword or webpage URL to initialize a session.",
        "Review each standardized audit checkpoint across the four core disciplines.",
        "Click items as you complete them; your progress automatically saves locally.",
        "Aim for a 100% progress score, then export your completion report."
      ]}
      tips={[
        "On-Page SEO changes (Titles, Metas, H1s) yield the fastest initial ranking boosts.",
        "Technical SEO checks are mandatory if search engines aren't indexing your pages properly.",
        "Content SEO is all about matching search intent and establishing authority via links.",
        "Export the report as a '.txt' file to log historical audits for different pages."
      ]}
      faqs={CHECKLIST_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            Effective SEO is not a guessing game; it follows a rigorous methodology of standardized checks. The SEO Checklist condenses hundreds of known ranking factors into actionable, bite-sized tasks structured across the four main pillars of digital optimization.
          </p>
        </div>
      }
    >
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        {/* Setup State */}
        {!initialized && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 dark:shadow-none transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <ListChecks className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
               <div>
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-6">
                    <ListChecks className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Initialize Your Audit</h2>
                  <p className="text-slate-500 font-medium">Enter the keyword or URL you are optimizing to generate your personalized tracking board.</p>
               </div>

               <form onSubmit={startChecklist} className="space-y-4">
                  <div className="relative flex items-center">
                    <Search className="absolute left-6 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="e.g. 'best hiking boots' or 'https://example.com'"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-xl text-slate-900 dark:text-white transition-all shadow-inner"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 text-lg"
                  >
                    Generate Checklist <ArrowRight className="w-5 h-5" />
                  </button>
               </form>
            </div>
          </div>
        )}

        {/* Active Checklist State */}
        {initialized && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
            
            {/* Header & Progress Bar */}
            <div className="bg-slate-950 dark:bg-black border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
               
               <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">Active Audit Target</span>
                    <h2 className="text-3xl font-black text-white px-4 py-2 bg-white/5 border border-white/10 rounded-xl truncate max-w-lg inline-block">
                       {target}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={downloadReport} className="p-3 bg-white/10 hover:bg-blue-500/20 text-white rounded-xl transition-colors border border-white/5 hover:border-blue-500/30 font-bold text-sm flex items-center gap-2 group">
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-400" /> Export
                    </button>
                    <button onClick={resetProgress} className="p-3 bg-white/10 hover:bg-rose-500/20 text-white rounded-xl transition-colors border border-white/5 hover:border-rose-500/30 font-bold text-sm flex items-center gap-2 group">
                      <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-rose-400" /> Reset
                    </button>
                  </div>
               </div>

               <div className="relative z-10 space-y-3">
                  <div className="flex justify-between items-end">
                     <span className="text-sm font-black uppercase tracking-widest text-slate-400">Optimization Progress</span>
                     <span className="text-3xl font-black text-white">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                     <div 
                       className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000 relative"
                       style={{ width: `${progressPercent}%` }}
                     >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                     </div>
                  </div>
                  <p className="text-xs font-medium text-slate-500 text-right">
                    {checkedCount} of {TOTAL_ITEMS} items completed
                  </p>
               </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {Object.entries(CHECKLIST_DATA).map(([category, data], index) => {
                 const CategoryIcon = data.icon;
                 const categoryCheckedCount = data.items.filter(i => checkedItems[i.id]).length;
                 const isAllCompleted = categoryCheckedCount === data.items.length;

                 return (
                   <div key={category} className={`bg-white dark:bg-slate-900 border ${isAllCompleted ? 'border-emerald-200 dark:border-emerald-900/50 shadow-emerald-500/5' : 'border-slate-200 dark:border-slate-800'} rounded-[2.5rem] p-8 shadow-sm transition-colors`}>
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                         <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${data.bg} flex items-center justify-center ${data.color}`}>
                               {isAllCompleted ? <CheckCircle className="w-6 h-6" /> : <CategoryIcon className="w-6 h-6" />}
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-slate-900 dark:text-white">{category}</h3>
                               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                                  {categoryCheckedCount} / {data.items.length} completed
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         {data.items.map(item => {
                           const isChecked = checkedItems[item.id] || false;
                           return (
                             <button
                               key={item.id}
                               onClick={() => toggleItem(item.id)}
                               className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 group ${
                                 isChecked 
                                   ? 'bg-slate-50 border-transparent dark:bg-slate-950 text-slate-400 dark:text-slate-600'
                                   : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md'
                               }`}
                             >
                                <div className="mt-0.5 flex-shrink-0">
                                   {isChecked 
                                     ? <CheckCircle className="w-6 h-6 text-emerald-500 dark:text-emerald-600" />
                                     : <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
                                   }
                                </div>
                                <span className={`text-sm font-bold leading-relaxed ${isChecked ? 'line-through decoration-slate-300 dark:decoration-slate-700' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                  {item.label}
                                </span>
                             </button>
                           )
                         })}
                      </div>
                   </div>
                 )
               })}
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
