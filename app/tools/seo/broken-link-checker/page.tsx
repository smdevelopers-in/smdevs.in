"use client";

import React, { useState } from "react";
import { Link2, AlertCircle, CheckCircle2, Loader2, Globe, ExternalLink } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";

interface LinkResult {
  url: string;
  status: number;
  working: boolean;
  type: "Internal" | "External";
  error?: string;
}

interface AnalysisResults {
  total: number;
  working: number;
  broken: number;
  links: LinkResult[];
}

export default function BrokenLinkCheckerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkLinks = async () => {
    if (!url) return;
    
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("/api/check-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to check links.");
      }

      setResults(data);
      window.dispatchEvent(new CustomEvent("trigger-review-popup"));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Broken Link Checker"
      description="Scan your webpage for broken links (404s). Improve your site's SEO and user experience by identifying and fixing dead ends."
      toolType="SEO"
      howToUse={[
        "Enter the full URL of the page you want to scan.",
        "Click 'Check Links' to start the analysis.",
        "Review the summary to see how many links are working or broken.",
        "Use the table to identify specific URLs that need attention.",
        "Note: Only the first 30 links are checked in this MVP version."
      ]}
      tips={[
        "Broken links (404s) frustrate users and stop search engine crawlers in their tracks.",
        "Regularly audit your 'Resources' or 'Blog' pages where external links are most likely to decay (Link Rot).",
        "If an external link is broken, try to find a replacement or use the 'Wayback Machine' to see the original content.",
        "Redirect broken internal links to the most relevant live page using a 301 redirect."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            A Broken Link (also known as a Dead Link) is a hyperlink that points to a webpage or server that is no longer available. This usually results in a <strong>404 Not Found</strong> error.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-rose-600 mb-2">User Experience</h4>
                <p className="text-xs text-slate-500 font-medium">Broken links create a 'dead end', leading to higher bounce rates and loss of trust.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Crawl Budget</h4>
                <p className="text-xs text-slate-500 font-medium">Search engines have a limited 'crawl budget'. Wasting it on 404s prevents your good pages from being indexed.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-12">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <InputField
                label="Target URL"
                value={url}
                onChange={setUrl}
                placeholder="https://example.com/page"
                description="Include http:// or https://"
              />
            </div>
            <button
              onClick={checkLinks}
              disabled={loading || !url}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900/40 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap h-[56px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Check Links
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-bold">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">Total Links</span>
                <p className="text-4xl font-black text-slate-900 dark:text-white">{results.total}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-2">Working</span>
                <p className="text-4xl font-black text-emerald-600">{results.working}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-2">Broken</span>
                <p className="text-4xl font-black text-rose-600">{results.broken}</p>
              </div>
            </div>

            {/* Links Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">URL / Destination</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Type</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {results.links.map((link, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${link.working ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20"}`}>
                              <Globe className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                               <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm font-bold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5"
                              >
                                {link.url}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                              {link.error && <span className="text-[10px] text-rose-500 font-bold">{link.error}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                            link.type === "Internal" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30" : "bg-slate-100 text-slate-600 dark:bg-slate-800"
                          }`}>
                            {link.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 text-sm font-bold ${link.working ? "text-emerald-600" : "text-rose-600"}`}>
                            {link.working ? (
                              <><CheckCircle2 className="w-4 h-4" /> Working</>
                            ) : (
                              <><AlertCircle className="w-4 h-4" /> Broken</>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-mono text-sm font-black ${link.status >= 400 ? "text-rose-500" : link.status >= 300 ? "text-amber-500" : "text-emerald-500"}`}>
                            {link.status || "---"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed italic">
                Note: Some links may return non-success codes due to server-side user-agent restrictions or bot protection, even if they are working in a browser.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
