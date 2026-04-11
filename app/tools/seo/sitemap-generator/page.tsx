"use client";

import React, { useState, useEffect } from "react";
import { Map, Download, Globe, FileCode } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";
import ResultBox from "@/components/tools/ResultBox";


const SITEMAPGENERATOR_FAQS = [
  {
    question: "What is the free Sitemap Generator used for?",
    answer: "Our Sitemap Generator helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Sitemap Generator?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Sitemap Generator match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Sitemap Generator?",
    answer: "No installation is required! The Sitemap Generator is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Sitemap Generator?",
    answer: "For best results, we recommend using the Sitemap Generator whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/contact");
  const [sitemapXml, setSitemapXml] = useState("");

  useEffect(() => {
    const urlList = urls.split("\n").filter(u => u.trim().startsWith("http"));
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urlList.forEach(url => {
      xml += `  <url>\n    <loc>${url.trim()}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n    <priority>0.80</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    setSitemapXml(xml);
  }, [urls]);

  const downloadSitemap = () => {
    const element = document.createElement("a");
    const file = new Blob([sitemapXml], { type: "application/xml" });
    element.href = URL.createObjectURL(file);
    element.download = "sitemap.xml";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <ToolLayout
      title="Sitemap Generator"
      description="Create a clean XML sitemap to help search engines index your website more efficiently. Simply paste your URLs and get a production-ready sitemap."
      toolType="SEO"
      howToUse={[
        "Enter your website URLs in the input field, one per line.",
        "Ensure all URLs include the protocol (http:// or https://).",
        "The XML sitemap will be generated instantly as you type.",
        "Download the sitemap.xml file and upload it to your website's root directory."
      ]}
      tips={[
        "A sitemap is like a map for search engines. It ensures no page is missed during crawling.",
        "Only include 'Canonical' (original) URLs in your sitemap to avoid indexing duplicate content.",
        "Update your sitemap whenever you add a new blog post or service page to speed up indexing.",
        "Submit your sitemap URL directly to Google Search Console for real-time tracking."
      ]}
      faqs={SITEMAPGENERATOR_FAQS}
      explanation={ 
        <div className="space-y-4">
          <p>
            An XML Sitemap is a list of your website's URLs. It serves as a roadmap that tells search engines what content is available and how to reach it. It can also provide valuable metadata, such as when the page was last updated.
          </p>
          <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-[2rem] border border-rose-100 dark:border-rose-800 mt-6">
             <h4 className="text-sm font-black text-rose-600 uppercase tracking-widest mb-2">Index Coverage</h4>
             <p className="text-xs text-rose-900 dark:text-rose-300 font-medium leading-relaxed">
               For large websites or those with complex navigation, sitemaps are essential. They help search engines discover pages that might not be discoverable through normal internal linking, ensuring your <strong>Index Coverage</strong> remains 100%.
             </p>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* URL Inputs */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <Globe className="w-6 h-6 text-rose-600 dark:text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">URL List</h2>
          </div>

          <InputField
            label="Website URLs"
            type="textarea"
            value={urls}
            onChange={setUrls}
            placeholder="https://example.com/"
            description="One URL per line"
          />

          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <FileCode className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Quick Tips</p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 leading-relaxed font-medium">
              <li>• Always include the full URL with https://</li>
              <li>• Standard sitemaps support up to 50,000 URLs</li>
              <li>• Use a robots.txt file to point to this sitemap</li>
            </ul>
          </div>
        </div>

        {/* Sitemap Output */}
        <div className="space-y-6">
          <ResultBox
            title="Sitemap Preview"
            content={sitemapXml}
            label="XML"
          />
          
          <button
            onClick={downloadSitemap}
            className="w-full py-4 bg-rose-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-rose-700 transition-all shadow-xl active:scale-[0.98]"
          >
            <Download className="w-5 h-5" /> Download Sitemap.xml
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
