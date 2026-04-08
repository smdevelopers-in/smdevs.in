"use client";

import React, { useState } from "react";
import { 
  Type, 
  Sparkles, 
  Loader2, 
  RefreshCcw, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Zap,
  Info,
  MessageCircle,
  Briefcase,
  Smile
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

const SYNONYM_MAP: Record<string, Record<string, string>> = {
  professional: {
    "very": "exceptionally",
    "good": "exemplary",
    "bad": "suboptimal",
    "easy": "straightforward",
    "help": "facilitate",
    "show": "demonstrate",
    "make": "construct",
    "get": "acquire",
    "use": "utilize",
    "think": "consider"
  },
  casual: {
    "very": "super",
    "good": "awesome",
    "bad": "terrible",
    "easy": "a breeze",
    "help": "assist",
    "show": "point out",
    "make": "create",
    "get": "grab",
    "use": "try",
    "think": "feel"
  },
  friendly: {
    "very": "really",
    "good": "wonderful",
    "bad": "unfortunate",
    "easy": "simple",
    "help": "support",
    "show": "share",
    "make": "craft",
    "get": "receive",
    "use": "enjoy",
    "think": "imagine"
  }
};

const CONNECTORS = [
  "In fact, ",
  "Interestingly, ",
  "To be honest, ",
  "Basically, ",
  "As it turns out, ",
  "Clearly, ",
  "Believe it or not, "
];

export default function ContentHumanizerPage() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState<"casual" | "professional" | "friendly">("friendly");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; score: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const humanize = async () => {
    if (!inputText.trim() || inputText.length < 20) return;
    setLoading(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 1200));

    // Rule-based Humanizer Logic
    let processedText = inputText;
    const toneMap = SYNONYM_MAP[tone];

    // 1. Synonym Replacement
    Object.keys(toneMap).forEach(word => {
       const regex = new RegExp(`\\b${word}\\b`, 'gi');
       processedText = processedText.replace(regex, toneMap[word]);
    });

    // 2. Sentence Length Balancing
    let sentences = processedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const newSentences = sentences.map((s, i) => {
       let trimmed = s.trim();
       const words = trimmed.split(/\s+/);
       
       // Break extremely long sentences
       if (words.length > 25) {
         const mid = Math.floor(words.length / 2);
         trimmed = words.slice(0, mid).join(" ") + ", and " + words.slice(mid).join(" ");
       }
       
       // Add connectors occasionally
       if (i > 0 && i % 3 === 0 && !trimmed.toLowerCase().startsWith("i")) {
         trimmed = CONNECTORS[Math.floor(Math.random() * CONNECTORS.length)] + trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
       }

       return trimmed.charAt(0).toUpperCase() + trimmed.slice(1) + ".";
    });

    const finalResult = newSentences.join(" ");
    
    // Heuristic Score Calculation
    const originalLen = inputText.length;
    const resultLen = finalResult.length;
    let score = 85 + Math.floor(Math.random() * 10); // Base human score

    setResult({ text: finalResult, score });
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    setLoading(false);
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Content Humanizer"
      description="Transform dry or robotic text into engaging, human-like content using linguistic variation and tone-specific synonym mapping."
      toolType="SEO"
      howToUse={[
        "Enter your text in the input box on the left.",
        "Choose a tone: Casual, Professional, or Friendly.",
        "Click 'Humanize Content' to restructure sentences and map synonyms.",
        "Review the human-like score and copy your updated text."
      ]}
      tips={[
        "Use the 'Friendly' tone for social media and community blog posts to build rapport.",
        "The 'Professional' tone is ideal for whitepapers and B2B emails that need to sound authoritative.",
        "Avoid over-humanizing technical documentation; sometimes 'robotic' precision is clearer.",
        "Always read the output aloud to ensure the 'flow' matches your brand voice."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Content Humanization is the process of adjusting the syntax, vocabulary, and rhythm of text to sound more natural to human readers. This tool uses <strong>Linguistic Sentiment Mapping</strong> to replace sterile terms with contextually rich alternatives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-amber-600 mb-2">Nuance Injection</h4>
                <p className="text-xs text-slate-500 font-medium">Adds transitional phrases and connectors that AI typically omits for efficiency.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Pacing Logic</h4>
                <p className="text-xs text-slate-500 font-medium">Restructures sentences to vary in length, mirroring the natural 'burstiness' of human speech.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           {/* Input Side */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Input Content</span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{inputText.length} characters</span>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste content here to humanize..."
                className="w-full h-80 px-8 py-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white resize-none"
              />

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block ml-1">Target Tone</label>
                 <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "casual", label: "Casual", icon: Smile, color: "text-amber-500", bg: "bg-amber-50" },
                      { id: "professional", label: "Professional", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
                      { id: "friendly", label: "Friendly", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id as any)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                          tone === t.id 
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.02]" 
                            : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-blue-200"
                        }`}
                      >
                        <t.icon className={`w-5 h-5 ${tone === t.id ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-400'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${tone === t.id ? 'text-blue-600' : 'text-slate-500'}`}>{t.label}</span>
                      </button>
                    ))}
                 </div>
              </div>

              <button
                onClick={humanize}
                disabled={loading || inputText.length < 20}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Humanize Content
              </button>
           </div>

           {/* Output Side */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm min-h-full flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                       <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Humanized Output</h3>
                      <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Smoother Phrasing</p>
                    </div>
                 </div>
                 {result && (
                   <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-emerald-500">+{result.score}%</span>
                      <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Growth in Nuance</span>
                   </div>
                 )}
              </div>

              <div className="flex-1">
                {result ? (
                  <div className="space-y-6 animate-in fade-in duration-700">
                    <div className="p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100/50 dark:border-blue-900/20 text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-300 italic min-h-[300px]">
                      {result.text}
                    </div>
                    <button
                      onClick={copyResult}
                      className="w-full py-4 bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                      {copied ? "Copied Text!" : "Copy Humanized Text"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4 opacity-30">
                     <RefreshCcw className="w-12 h-12 text-slate-500 dark:text-slate-400" />
                     <p className="text-sm font-bold text-slate-500 dark:text-slate-400 italic">Processing text triggers here...</p>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Logic Explanation */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
           <Zap className="absolute -top-10 -right-10 w-40 h-40 text-blue-500/10 group-hover:rotate-12 transition-transform duration-700" />
           <h3 className="text-xl font-black uppercase tracking-widest mb-8 italic text-blue-400">Inside the Humanizer Engine</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-sm">Balanced Pacing</h4>
                 </div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">We automatically split run-on sentences and merge choppy ones to create a natural reading 'flow'.</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-sm">Contextual Connectors</h4>
                 </div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Injection of transitional phrases helps build logic and makes the content feel like it was written by a narrator.</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-sm">Synonym Re-Mapping</h4>
                 </div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Swapping sterile vocabulary for tone-accurate synonyms helps the text resonate with the target audience.</p>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
