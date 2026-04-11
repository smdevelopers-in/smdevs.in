"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, ShieldCheck, ShieldAlert, BookOpen } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";
import ResultBox from "@/components/tools/ResultBox";


const ROBOTSTXTGENERATOR_FAQS = [
  {
    question: "What is the free Robots Txt Generator used for?",
    answer: "Our Robots Txt Generator helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Robots Txt Generator?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Robots Txt Generator match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Robots Txt Generator?",
    answer: "No installation is required! The Robots Txt Generator is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Robots Txt Generator?",
    answer: "For best results, we recommend using the Robots Txt Generator whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function RobotsTxtGeneratorPage() {
  const [userAgent, setUserAgent] = useState("*");
  const [allowAll, setAllowAll] = useState(true);
  const [disallowedPaths, setDisallowedPaths] = useState<string[]>(["/admin", "/private"]);
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [robotsTxt, setRobotsTxt] = useState("");

  useEffect(() => {
    let content = `User-agent: ${userAgent}\n`;
    
    if (allowAll) {
      content += "Allow: /\n";
    }

    disallowedPaths.forEach(path => {
      if (path.trim()) {
        content += `Disallow: ${path.trim()}\n`;
      }
    });

    if (sitemapUrl.trim()) {
      content += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }

    setRobotsTxt(content.trim());
  }, [userAgent, allowAll, disallowedPaths, sitemapUrl]);

  const addPath = () => setDisallowedPaths([...disallowedPaths, ""]);
  const removePath = (index: number) => setDisallowedPaths(disallowedPaths.filter((_, i) => i !== index));
  const updatePath = (index: number, value: string) => {
    const newPaths = [...disallowedPaths];
    newPaths[index] = value;
    setDisallowedPaths(newPaths);
  };

  return (
    <ToolLayout
      title="Robots.txt Generator"
      description="Create a custom robots.txt file to guide search engine crawlers. Control which parts of your site should be indexed and provide a link to your sitemap."
      toolType="SEO"
      howToUse={[
        "Specify the User-agent (use '*' for all search engines).",
        "Toggle whether to allow all crawling or specify disallowed paths.",
        "Add paths or directories that you want to hide from search results (e.g., /admin).",
        "Provide your sitemap URL to help search engines find your content faster."
      ]}
      tips={[
        "Use 'Disallow: /admin/' to hide your login pages from search results.",
        "Always provide a full URL to your sitemap (e.g., https://yourdomain.com/sitemap.xml).",
        "Never use robots.txt to hide sensitive data; it's a public file that anyone can read.",
        "Testing your robots.txt in Google Search Console is highly recommended before deployment."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            A Robots.txt file is a simple text file placed in your website's root directory that tells search engine crawlers (like Googlebot) which pages they can or cannot request from your site. It is part of the <strong>Robots Exclusion Protocol (REP)</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-amber-600 mb-2">Crawl Budget</h4>
                <p className="text-xs text-slate-500 font-medium">By disallowing low-value pages, you ensure crawlers spend more time on your high-value content.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Sitemap Discovery</h4>
                <p className="text-xs text-slate-500 font-medium">Linking your sitemap here is the fastest way for new crawlers to map your entire website.</p>
             </div>
          </div>
        </div>
      }
      faqs={ROBOTSTXTGENERATOR_FAQS}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Crawler Rules</h2>
          </div>

          <div className="space-y-6">
            <InputField
              label="User-agent"
              value={userAgent}
              onChange={setUserAgent}
              description="Target specific crawlers"
              placeholder="*"
            />

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                {allowAll ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                )}
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">Allow All Indexing</p>
                  <p className="text-[10px] text-slate-500 font-medium">Recommended for most websites</p>
                </div>
              </div>
              <button
                onClick={() => setAllowAll(!allowAll)}
                className={`w-12 h-6 rounded-full transition-all relative ${allowAll ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${allowAll ? "left-7" : "left-1"}`} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Disallowed Paths
              </label>
              {disallowedPaths.map((path, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => updatePath(index, e.target.value)}
                    placeholder="/private-folder"
                    className="flex-1 px-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                  />
                  <button
                    onClick={() => removePath(index)}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-500"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </div>
              ))}
              <button
                onClick={addPath}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add another path
              </button>
            </div>

            <InputField
              label="Sitemap URL"
              value={sitemapUrl}
              onChange={setSitemapUrl}
              placeholder="https://example.com/sitemap.xml"
            />
          </div>
        </div>

        {/* Results & Guide */}
        <div className="space-y-8">
          <ResultBox
            title="Generated robots.txt"
            content={robotsTxt}
            label="Plain Text"
          />

          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Tip</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              A robots.txt file is not a security measure. It's a "no trespassing" sign for honest search engines. Private data should still be secured behind authentication.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
