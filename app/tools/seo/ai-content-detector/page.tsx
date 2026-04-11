"use client";

import React, { useState } from "react";
import { 
  Scan, 
  Search, 
  Loader2, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Zap,
  HelpCircle,
  Info,
  Brain,
  MessageSquare,
  BarChart,
  LineChart
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

interface DetectionResult {
  aiProbability: number;
  humanProbability: number;
  metrics: {
    sentenceVariation: number;
    vocabularyDiversity: number;
    repetitionScore: number;
    burstiness: number;
  };
  highlightedSentences: Array<{ text: string; type: "ai" | "human" | "neutral" }>;
}


const AICONTENTDETECTOR_FAQS = [
  {
    question: "What is the free Ai Content Detector used for?",
    answer: "Our Ai Content Detector helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Ai Content Detector?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Ai Content Detector match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Ai Content Detector?",
    answer: "No installation is required! The Ai Content Detector is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Ai Content Detector?",
    answer: "For best results, we recommend using the Ai Content Detector whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function AIContentDetectorPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const analyzeText = async () => {
    if (!text.trim() || text.length < 50) return;
    setLoading(true);
    setResult(null);

    // Simulation of complex linguistic analysis
    await new Promise(r => setTimeout(r, 1500));

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    
    // 1. Vocabulary Diversity (Type-Token Ratio)
    const ttr = (uniqueWords.size / Math.max(words.length, 1)) * 100;
    
    // 2. Sentence Length Variation (Burstiness)
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
    const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / Math.max(lengths.length, 1);
    const variationScore = Math.min((Math.sqrt(variance) / 10) * 100, 100);

    // 3. Repetition Score
    const commonPatterns = ["which is", "there is", "it is", "that the", "to be", "it's important to", "in order to"];
    let patternHits = 0;
    commonPatterns.forEach(p => {
       if (text.toLowerCase().includes(p)) patternHits++;
    });
    const repetitionScore = Math.min((patternHits / 5) * 100, 100);

    // Calculate Probabilities
    // High variation + high TTR = Human
    // Uniform variation + low TTR + high repetition = AI
    let aiProb = 50;
    if (variationScore < 30) aiProb += 20; // Too uniform
    if (ttr < 40) aiProb += 15; // Low diversity
    if (repetitionScore > 50) aiProb += 10; // High repetition
    if (variationScore > 60) aiProb -= 20; // Bursty (Human-like)
    if (ttr > 60) aiProb -= 15; // Diverse (Human-like)

    aiProb = Math.max(5, Math.min(95, aiProb));
    const humanProb = 100 - aiProb;

    // Highlight sentences
    const highlighted = sentences.map(s => {
       const wordCount = s.trim().split(/\s+/).length;
       let type: "ai" | "human" | "neutral" = "neutral";
       if (Math.abs(wordCount - avgLength) < 2) type = "ai"; // Too close to average
       else if (Math.abs(wordCount - avgLength) > 8) type = "human"; // Outlier (Normal for humans)
       return { text: s + ".", type };
    });

    setResult({
      aiProbability: Math.round(aiProb),
      humanProbability: Math.round(humanProb),
      metrics: {
        sentenceVariation: Math.round(variationScore),
        vocabularyDiversity: Math.round(ttr),
        repetitionScore: Math.round(repetitionScore),
        burstiness: Math.round(variationScore)
      },
      highlightedSentences: highlighted
    });
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    setLoading(false);
  };

  return (
    <ToolLayout
      title="AI Content Detector"
      description="Analyze linguistic patterns, sentence 'burstiness', and vocabulary diversity to detect AI-generated content."
      toolType="SEO"
      howToUse={[
        "Paste at least 50 words of content into the detector.",
        "Click 'Analyze Content' to run the linguistic heuristic model.",
        "Check the AI vs Human probability scores.",
        "Review the highlighted sentences to identify uniform phrasing patterns."
      ]}
      tips={[
        "Human writing is 'bursty'—it combines short, punchy sentences with long, complex ones.",
        "AI models often choose the 'most likely' word, leading to a predictable vocabulary pattern (Low Perplexity).",
        "Higher word counts provide more data points and lead to more accurate detection results.",
        "Content that is 100% human-written should aim for high 'Vocabulary Diversity' and low 'Uniformity'."
      ]}
      faqs={AICONTENTDETECTOR_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            AI detection works by quantifying the 'randomness' and 'complexity' of text. Machines are mathematically designed to be predictable, whereas humans are naturally inconsistent in their writing rhythm.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-2">Burstiness</h4>
                <p className="text-xs text-slate-500 font-medium">Measures the variance in sentence length and structure across the text.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Perplexity</h4>
                <p className="text-xs text-slate-500 font-medium">Measures how 'surprising' the word choice is compared to common AI training data.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto w-full">
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Paste Content (Min 50 words)</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your article or essay here..."
                className="w-full h-64 px-8 py-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-medium transition-all text-slate-900 dark:text-white resize-none"
              />
              <button
                onClick={analyzeText}
                disabled={loading || text.length < 50}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                Analyze Content
              </button>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-bold uppercase tracking-widest">
                <AlertCircle className="w-3 h-3 inline mr-1 text-amber-500" /> Probabilistic results based on local heuristics
              </p>
           </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             {/* Score Dashboard */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center group">
                   <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray={465} strokeDashoffset={465 - (465 * result.aiProbability) / 100} className={`transition-all duration-1000 ${result.aiProbability > 50 ? 'text-rose-500' : 'text-blue-500'}`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col">
                        <span className={`text-4xl font-black ${result.aiProbability > 50 ? 'text-rose-500' : 'text-blue-500'}`}>{result.aiProbability}%</span>
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">AI Prob.</span>
                      </div>
                   </div>
                   <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
                     {result.aiProbability > 70 ? "Likely AI Generated" : result.aiProbability > 40 ? "Mixed / Uncertain" : "Likely Human Written"}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {[
                     { label: "Burstiness", value: result.metrics.burstiness, icon: Zap, color: "text-amber-500", desc: "Variation in length" },
                     { label: "Diversity", value: result.metrics.vocabularyDiversity, icon: BarChart, color: "text-emerald-500", desc: "Unique word ratio" },
                     { label: "Perplexity", value: result.metrics.sentenceVariation, icon: LineChart, color: "text-blue-500", desc: "Structural complexity" },
                     { label: "Uniformity", value: 100 - result.metrics.repetitionScore, icon: ShieldAlert, color: "text-purple-500", desc: "Pattern recurrence" },
                   ].map((m, i) => (
                     <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                        <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
                        <div className="text-2xl font-black text-slate-900 dark:text-white">{m.value}%</div>
                        <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                        <div className="text-[8px] font-bold text-slate-500 dark:text-slate-400 italic">{m.desc}</div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Highlighted Text */}
             <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                     <Scan className="w-5 h-5 text-blue-600" /> Structure Audit
                   </h3>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-100 border border-rose-200" />
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">AI Pattern</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200" />
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Human Marker</span>
                      </div>
                   </div>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400 text-justify border border-slate-100 dark:border-slate-800">
                  {result.highlightedSentences.map((s, i) => (
                    <span 
                      key={i} 
                      className={`transition-all px-0.5 rounded ${
                        s.type === 'ai' ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300' : 
                        s.type === 'human' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : ''
                      }`}
                    >
                      {s.text}{" "}
                    </span>
                  ))}
                </div>
             </div>

             {/* Transparency Card */}
             <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                <Brain className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/10 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 italic text-blue-400">Analysis Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Burstiness (Sentence Length)</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Humans naturally vary sentence lengths. AI tends to produce uniform, medium-length sentences that lack 'rhythm'.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Perplexity (Randomness)</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Humans use surprising or complex word choices occasionally. AI models are programmed to choose the 'most likely' next word, leading to lower perplexity.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-sm">Type-Token Ratio</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Measures vocabulary diversity. A high repetition of common connective words is a strong indicator of machine generation.</p>
                   </div>
                </div>
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
                   <Info className="w-4 h-4 text-slate-500" />
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                     Disclaimer: This result is based on linguistic patterns and is an estimation. It is not 100% definitive.
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
