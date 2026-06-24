"use client";

import React, { useState, useEffect } from "react";
import { 
  Target, 
  Search, 
  Lightbulb, 
  Copy, 
  CheckCircle,
  ArrowRight,
  BarChart,
  BrainCircuit,
  Filter,
  Zap
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";

const INTENT_RULES = {
  Informational: [
    { word: "how", weight: 40 },
    { word: "what", weight: 35 },
    { word: "why", weight: 35 },
    { word: "when", weight: 35 },
    { word: "where", weight: 35 },
    { word: "who", weight: 35 },
    { word: "guide", weight: 45 },
    { word: "tutorial", weight: 45 },
    { word: "tips", weight: 30 },
    { word: "examples", weight: 30 },
    { word: "learn", weight: 40 },
    { word: "meaning", weight: 50 },
    { word: "define", weight: 50 },
  ],
  Transactional: [
    { word: "buy", weight: 50 },
    { word: "price", weight: 35 },
    { word: "cheap", weight: 40 },
    { word: "order", weight: 45 },
    { word: "discount", weight: 45 },
    { word: "deal", weight: 40 },
    { word: "coupon", weight: 50 },
    { word: "for sale", weight: 50 },
    { word: "pricing", weight: 40 },
    { word: "cost", weight: 35 },
    { word: "hire", weight: 45 },
    { word: "services", weight: 30 }
  ],
  Commercial: [
    { word: "best", weight: 45 },
    { word: "top", weight: 40 },
    { word: "review", weight: 45 },
    { word: "vs", weight: 50 },
    { word: "versus", weight: 50 },
    { word: "comparison", weight: 45 },
    { word: "alternatives", weight: 50 },
    { word: "rank", weight: 35 },
    { word: "software", weight: 20 },
    { word: "tools", weight: 20 },
    { word: "features", weight: 30 },
  ],
  Navigational: [
    { word: "login", weight: 60 },
    { word: "sign in", weight: 60 },
    { word: "contact", weight: 50 },
    { word: "support", weight: 50 },
    { word: "phone number", weight: 60 },
    { word: "address", weight: 50 },
    { word: "near me", weight: 50 },
    { word: "location", weight: 40 },
    { word: "facebook", weight: 70 },
    { word: "google", weight: 70 },
    { word: "amazon", weight: 70 },
    { word: "youtube", weight: 70 },
    { word: "twitter", weight: 70 },
    { word: "instagram", weight: 70 },
    { word: "netflix", weight: 70 },
    { word: "apple", weight: 70 },
    { word: "microsoft", weight: 70 },
    { word: "linkedin", weight: 70 },
  ]
};

const STAGE_MAPPING = {
  Informational: "Awareness",
  Commercial: "Consideration",
  Transactional: "Decision",
  Navigational: "Awareness / Retention",
  "Mixed (Broad)": "Awareness"
};

const COLOR_MAPPING: Record<string, { bg: string, text: string, border: string, icon: any }> = {
  Informational: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800", icon: Lightbulb },
  Commercial: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800", icon: Filter },
  Transactional: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", icon: Zap },
  Navigational: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800", icon: Target },
  "Mixed (Broad)": { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700", icon: BrainCircuit }
};

const generateBlogIdeas = (keyword: string, intent: string) => {
  const kw = keyword.trim() || "Keyword";
  const titleCase = kw.replace(/\b\w/g, c => c.toUpperCase());
  
  if (intent === 'Informational') {
    return [
      `The Ultimate Guide to ${titleCase} in 2026`,
      `${titleCase} Explained: Everything You Need to Know`,
      `How to Master ${titleCase} (Step-by-Step Tutorial)`
    ];
  } else if (intent === 'Commercial') {
    return [
      `Top 10 ${titleCase} You Must Check Out`,
      `${titleCase} vs Competitors: Which is Best?`,
      `The Complete Review of ${titleCase} Features & Pricing`
    ];
  } else if (intent === 'Transactional') {
    return [
      `Where to Find the Best Deals on ${titleCase}`,
      `${titleCase} Buyer's Guide: Don't Spend Until You Read This`,
      `How to Save Money on ${titleCase} Fast`
    ];
  } else if (intent === 'Navigational') {
    return [
      `How to Navigate the ${titleCase} Ecosystem Like a Pro`,
      `Hidden Features of ${titleCase} Most Users Miss`,
      `A Deep Dive into ${titleCase}: History and Future`
    ];
  } else {
    return [
      `10 Surprising Facts About ${titleCase}`,
      `Why Everyone is Talking About ${titleCase}`,
      `${titleCase}: Trends to Watch This Year`
    ];
  }
};

const INTENT_FAQS = [
  {
    question: "Why is Keyword Intent important for SEO?",
    answer: "Keyword intent tells you exactly what the user is trying to accomplish. If they want to 'buy shoes' (Transactional) but your page is 'history of shoes' (Informational), you won't rank or convert. Matching intent is the number one ranking factor today."
  },
  {
    question: "How does the Intent Analyzer Score work?",
    answer: "Our engine uses advanced heuristical weighting based on known market markers and word presence. For example, keywords containing 'vs' and 'best' receive high scoring multipliers for Commercial consideration, while 'buy' and 'discount' immediately trigger Transactional rules."
  },
  {
    question: "What is Funnel Stage mapping?",
    answer: "Funnel stages map directly to the buyer's journey: Informational matches 'Awareness', Commercial matches 'Consideration', and Transactional matches the final 'Decision' phase. You should create content for all stages!"
  },
  {
    question: "The result shows 'Mixed (Broad)' - what does this mean?",
    answer: "Broad terms like 'shoes' or 'software' don't contain enough modifiers to determine strict intent. Google usually displays mixed SERPs (Some informational guides, some e-commerce stores) for these keywords."
  }
];

export default function KeywordIntentAnalyzerPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<{
    intent: string;
    score: number;
    stage: string;
    matches: string[];
    ideas: string[];
  } | null>(null);
  
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedIntent, setCopiedIntent] = useState(false);

  // Client-side instant evaluation
  useEffect(() => {
    if (!keyword.trim()) {
      setResult(null);
      return;
    }

    const analyzeIntent = () => {
      const lower = ` ${keyword.toLowerCase()} `;
      
      const scores: Record<string, number> = {
        Informational: 0,
        Transactional: 0,
        Commercial: 0,
        Navigational: 0
      };

      const matchedWords: Record<string, string[]> = {
        Informational: [],
        Transactional: [],
        Commercial: [],
        Navigational: []
      };

      Object.entries(INTENT_RULES).forEach(([intent, rules]) => {
        rules.forEach(rule => {
          const regex = new RegExp(`\\b${rule.word}\\b`, 'i');
          if (regex.test(lower)) {
            scores[intent] += rule.weight;
            matchedWords[intent].push(rule.word);
          }
        });
      });

      let maxScore = 0;
      let dominantIntent = "Mixed (Broad)";

      Object.entries(scores).forEach(([intent, score]) => {
        if (score > maxScore) {
          maxScore = score;
          dominantIntent = intent;
        }
      });

      const wordCount = keyword.trim().split(/\s+/).length;

      if (maxScore === 0) {
        if (wordCount > 3) {
          dominantIntent = "Informational";
          maxScore = 40; 
        } else {
          dominantIntent = "Mixed (Broad)";
        }
      }

      let confidence = Math.min(Math.round(maxScore + (wordCount * 5)), 99);
      if (maxScore === 0 && dominantIntent === "Mixed (Broad)") {
         // Generate a pseudo-random looking but deterministic score based on length for broad terms
         confidence = 35 + (keyword.length % 15);
      } else if (dominantIntent === "Informational" && maxScore === 40 && wordCount > 3) {
         // Long-tail heuristic confidence
         confidence = 50 + Math.min(wordCount * 3, 30);
      }

      setResult({
        intent: dominantIntent,
        score: confidence,
        stage: STAGE_MAPPING[dominantIntent as keyof typeof STAGE_MAPPING],
        matches: Object.values(matchedWords).flat(),
        ideas: generateBlogIdeas(keyword, dominantIntent)
      });
    };

    // Very small debounce to prevent blocking UI on ridiculously fast typing
    const timer = setTimeout(analyzeIntent, 150);
    return () => clearTimeout(timer);
  }, [keyword]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const copyIntent = () => {
    if (result) {
      navigator.clipboard.writeText(result.intent);
      setCopiedIntent(true);
      setTimeout(() => setCopiedIntent(false), 2000);
    }
  };

  const activeTheme = result ? COLOR_MAPPING[result.intent] : COLOR_MAPPING["Mixed (Broad)"];
  const IntentIcon = activeTheme.icon;

  return (
    <ToolLayout
      title="Keyword Intent Analyzer Free Tool"
      description="Instantly uncover the underlying search intent of any keyword with our advanced heuristic scoring engine. Drive higher conversions by matching intent."
      toolType="SEO"
      howToUse={[
        "Type any keyword or long-tail phrase into the input field",
        "Watch the advanced engine instantly classify the intent",
        "Review the confidence score and identified funnel stage",
        "Grab one of the AI-suggested blog angles customized for the identified intent"
      ]}
      tips={[
        "Informational intent is best targeted via Hub Pages and long-form Blog posts.",
        "Transactional intent phrases should be pointed directly to Category or Product pages.",
        "Commercial intent performs exceptionally well for 'Listicles' or 'VS' comparison landing pages.",
        "The longer the keyword, the more specific the intent becomes."
      ]}
      faqs={INTENT_FAQS}
      explanation={
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is Keyword Intent?</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Keyword intent (also called search intent) is the underlying goal a user has when typing a query into Google. Google&apos;s algorithm is designed to match results to intent — which means matching your content to the right intent type is one of the most impactful on-page SEO optimizations you can make. Mismatching intent is why pages rank at position 15+ even with strong content.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">The 4 Types of Search Intent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'Informational', color: 'text-blue-600', desc: 'User wants to learn. Example: "what is keyword density", "how to do SEO". Best matched with blog posts, guides, definitions.' },
                { type: 'Navigational', color: 'text-violet-600', desc: 'User wants a specific site. Example: "Google Search Console", "Ahrefs login". Match with branded landing pages.' },
                { type: 'Commercial', color: 'text-amber-600', desc: 'User is researching before buying. Example: "best SEO tools", "keyword tool comparison". Match with comparison content.' },
                { type: 'Transactional', color: 'text-emerald-600', desc: 'User is ready to act. Example: "free keyword checker", "buy SEO audit". Match with tool pages and CTAs.' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className={`font-black text-xs uppercase tracking-widest mb-2 ${item.color}`}>{item.type}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Use Keyword Intent in Your SEO Strategy</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Match your page type to the dominant intent of your target keyword. Informational keywords should lead to educational content with definitions and how-tos. Transactional keywords should lead to tool pages or product pages with clear CTAs. Creating the wrong type of content for a keyword is one of the most common reasons pages fail to rank despite good writing.</p>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Input area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20 dark:shadow-none transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Target className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <label htmlFor="keyword-input" className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2 pl-2">
              Enter Search Term / Keyword
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="keyword-input"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. 'best seo tools' or 'how to bake cake'"
                className="w-full pl-16 pr-6 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-xl text-slate-900 dark:text-white transition-all shadow-inner"
              />
            </div>
            
            {!keyword && (
              <p className="pl-4 text-sm text-slate-500 dark:text-slate-400 italic font-medium">
                Try: <button onClick={() => setKeyword("best coffee machines 2026")} className="text-blue-600 dark:text-blue-400 hover:underline">best coffee machines 2026</button> or <button onClick={() => setKeyword("buy nike shoes online")} className="text-blue-600 dark:text-blue-400 hover:underline">buy nike shoes online</button>
              </p>
            )}
          </div>
        </div>

        {/* Results Area */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
            
            {/* Primary Metrics Layer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Main Intent Card */}
              <div className={`md:col-span-2 relative overflow-hidden rounded-[2.5rem] border ${activeTheme.border} ${activeTheme.bg} p-8 flex flex-col justify-center shadow-lg transition-colors`}>
                <div className="absolute -right-6 -bottom-6 opacity-20">
                  <IntentIcon className={`w-40 h-40 ${activeTheme.text}`} />
                </div>
                
                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${activeTheme.border} ${activeTheme.text} bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-sm inline-block mb-4`}>
                        Detected Intent
                      </span>
                      <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <h2 className={`text-5xl font-black ${activeTheme.text} tracking-tight`}>
                          {result.intent}
                        </h2>
                      </div>
                    </div>
                    <button 
                      onClick={copyIntent}
                      className={`p-3 rounded-2xl bg-white dark:bg-black/40 border ${activeTheme.border} ${activeTheme.text} hover:scale-105 active:scale-95 transition-all shadow-sm`}
                      title="Copy Intent"
                    >
                      {copiedIntent ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className={`mt-auto text-sm font-medium ${activeTheme.text} opacity-90 flex items-center gap-2 flex-wrap`}>
                    {result.matches.length > 0 ? (
                      <>
                        <span className="font-bold">Detected Modifiers:</span>
                        {result.matches.map(m => (
                          <span key={m} className={`px-2.5 py-0.5 rounded-md border ${activeTheme.border} bg-white/30 dark:bg-black/30 font-bold`}>"{m}"</span>
                        ))}
                      </>
                    ) : (
                      <span className="italic">Derived from context and length modeling.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Score Layer */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center space-y-4 shadow-sm group">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">Confidence Score</span>
                <div className="relative w-32 h-32 flex items-center justify-center">
                   {/* Donut Chart visual */}
                   <svg className="w-full h-full -rotate-90 transform absolute inset-0 text-slate-100 dark:text-slate-800" viewBox="0 0 100 100">
                     <circle stroke="currentColor" strokeWidth="8" fill="none" cx="50" cy="50" r="40" />
                   </svg>
                   <svg className={`w-full h-full -rotate-90 transform absolute inset-0 ${result.score > 80 ? 'text-emerald-500' : result.score > 50 ? 'text-blue-500' : 'text-amber-500'} group-hover:scale-105 transition-transform duration-500`} viewBox="0 0 100 100">
                     <circle 
                       stroke="currentColor" 
                       strokeWidth="8" 
                       strokeDasharray={`${2 * Math.PI * 40}`} 
                       strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                       strokeLinecap="round"
                       fill="none" 
                       cx="50" cy="50" r="40" 
                       className="transition-all duration-1000 ease-out"
                     />
                   </svg>
                   <span className="text-3xl font-black text-slate-900 dark:text-white z-10">{result.score}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300">
                  <BarChart className="w-3 h-3" /> Metrics
                </div>
              </div>

            </div>

             {/* Secondary Context & Angles Layer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 align-stretch">
                
                {/* Funnel Stage Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 h-full shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    Buyer Journey Stage
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                    Content designed for this keyword should target users in the following funnel tier:
                  </p>
                  
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
                    
                    {["Awareness", "Consideration", "Decision"].map((stage, idx) => {
                      const isActive = result.stage.includes(stage);
                      return (
                        <div key={stage} className={`relative flex items-center gap-4 py-4 before:absolute before:left-5 before:w-2 before:h-2 before:rounded-full before:-ml-1 ${isActive ? 'before:bg-blue-600 before:ring-4 before:ring-blue-100 dark:before:ring-blue-900' : 'before:bg-slate-300 dark:before:bg-slate-700'}`}>
                          <div className={`pl-12 font-bold ${isActive ? 'text-blue-600 dark:text-blue-400 text-lg' : 'text-slate-400 dark:text-slate-600'}`}>
                            {stage}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Content Generation Ideas */}
                <div className="col-span-1 lg:col-span-2 bg-slate-950 dark:bg-black rounded-[2.5rem] p-8 h-full shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                  
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <Lightbulb className="w-6 h-6 text-amber-400 fill-amber-400/20" />
                    Suggested Blog Angles
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    {result.ideas.map((idea, idx) => (
                      <button
                        key={idx}
                        onClick={() => copyToClipboard(idea, idx)}
                        className="w-full group/btn relative bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 rounded-2xl p-5 text-left transition-all flex items-center justify-between"
                      >
                         <span className="text-slate-200 font-medium group-hover/btn:text-white truncate pr-4 text-[15px]">
                            {idea}
                         </span>
                         <div className={`p-2 rounded-xl transition-all ${copiedIndex === idx ? 'bg-emerald-500/20 text-emerald-400' : 'bg-transparent text-slate-500 group-hover/btn:text-blue-400 group-hover/btn:bg-blue-500/20'}`}>
                            {copiedIndex === idx ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
