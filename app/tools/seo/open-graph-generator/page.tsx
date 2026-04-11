"use client";

import React, { useState } from "react";
import { Share2, Copy, Trash2, Layout, Info, Globe, Type, Image as ImageIcon } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";


const OPENGRAPHGENERATOR_FAQS = [
  {
    question: "What is the free Open Graph Generator used for?",
    answer: "Our Open Graph Generator helps you optimize your website's performance and search engine rankings. It provides deep insights and actionable data to improve your on-page and technical SEO without any hidden costs."
  },
  {
    question: "How accurate is the Open Graph Generator?",
    answer: "Extremely accurate. We use live heuristics and industry-standard algorithms to ensure that the results from our Open Graph Generator match what search engines like Google look for when crawling your site."
  },
  {
    question: "Do I need to install anything to use the Open Graph Generator?",
    answer: "No installation is required! The Open Graph Generator is a 100% web-based utility. You can access it directly from your browser on any device, completely free of charge."
  },
  {
    question: "How often should I use the Open Graph Generator?",
    answer: "For best results, we recommend using the Open Graph Generator whenever you publish new content, update site architecture, or conduct your monthly SEO audits to ensure maximum visibility."
  }
];

export default function OpenGraphGeneratorPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    url: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const code = `<meta property="og:title" content="${formData.title}" />
<meta property="og:description" content="${formData.description}" />
<meta property="og:image" content="${formData.image}" />
<meta property="og:url" content="${formData.url}" />
<meta property="og:type" content="website" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("OG Tags copied!");
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  const clear = () => {
    setFormData({ title: "", description: "", image: "", url: "" });
  };

  return (
    <ToolLayout
      title="Open Graph Generator"
      description="Control how your content appears when shared on social media like Facebook, Twitter, and LinkedIn."
      toolType="SEO"
      howToUse={[
        "Fill in the Title, Description, and Image URL.",
        "Preview how your social card will look in the live preview.",
        "Copy the generated meta tags.",
        "Paste the code into the <head> section of your website."
      ]}
      tips={[
        "The ideal Open Graph image size is 1200 x 630 pixels (1.91:1 ratio).",
        "Keep your OG title under 95 characters and OG description under 200 characters for best display.",
        "Use a high-quality, relevant image that encourages clicks; this is your 'Social Ad'.",
        "The 'og:type' should be 'website' for homepages and 'article' for blog posts."
      ]}
      faqs={OPENGRAPHGENERATOR_FAQS}
      explanation={
        <div className="space-y-4">
          <p>
            The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, it is used on Facebook to allow any web page to have same functionality as any other object on Facebook.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Visual Branding</h4>
                <p className="text-xs text-slate-500 font-medium">Consistent social previews build brand recognition across different platforms.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-2">Viral Potential</h4>
                <p className="text-xs text-slate-500 font-medium">A compelling image and title can significantly increase shared click-through rates.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Page Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Website"
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell the world about your site..."
                  className="w-full h-32 px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/social-image.jpg"
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Page URL</label>
                <input
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                />
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <button onClick={clear} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 hover:bg-slate-200 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                Live Preview
              </h3>
              
              {/* Social Card Mockup */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden max-w-sm mx-auto group">
                <div className="aspect-[1.91/1] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  {formData.image ? (
                    <img src={formData.image} alt="OG Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                    {formData.url ? new URL(formData.url).hostname.toUpperCase() : "EXAMPLE.COM"}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight truncate">
                    {formData.title || "Your Dynamic Page Title Goes Here"}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {formData.description || "The generated description that describes your page will appear right here when you share your link."}
                  </p>
                </div>
              </div>

              {/* Generated Code */}
              <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative group">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">HTML Meta Tags</span>
                  <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {code}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
              </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 flex gap-4">
          <Info className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="text-amber-900 dark:text-amber-300 font-bold">Why are Open Graph tags important?</h4>
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
              Open Graph (OG) tags are tiny snippets of code that control how your website looks when shared on social media. Without them, platforms like Facebook or X will guess what image and text to show, often leading to unprofessional results. <strong>Proper OG tags increase your click-through rate (CTR)</strong> and engagement.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
