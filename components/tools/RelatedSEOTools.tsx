import Link from "next/link";
import { ArrowRight, FileSearch, Code2, Search, FileText, Map, FileOutput, Eye, Link2, Layout, BarChart3, Share2, ShieldCheck, Brain, Target, ListChecks } from "lucide-react";

const ALL_SEO_TOOLS = [
  { name: "Schema Validator", description: "Validate JSON-LD structured data and fix errors instantly.", href: "/tools/seo/schema-validator", icon: FileSearch, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
  { name: "Schema Generator", description: "Generate JSON-LD markup for Articles, FAQs, Products and more.", href: "/tools/seo/schema-generator", icon: Code2, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" },
  { name: "Meta Tag Generator", description: "Create SEO-optimized meta titles and descriptions.", href: "/tools/seo/meta-tag-generator", icon: Search, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
  { name: "Robots.txt Generator", description: "Guide search engines on how to crawl your website.", href: "/tools/seo/robots-txt-generator", icon: FileText, color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
  { name: "XML Sitemap Generator", description: "Generate a clean XML sitemap for search engine indexing.", href: "/tools/seo/sitemap-generator", icon: Map, color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400" },
  { name: "SERP Preview", description: "Preview your Google snippet before publishing.", href: "/tools/seo/serp-preview", icon: Eye, color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" },
  { name: "Open Graph Generator", description: "Create Open Graph tags to optimize social media sharing.", href: "/tools/seo/open-graph-generator", icon: Share2, color: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400" },
  { name: "On-Page SEO Checker", description: "Audit any URL for on-page SEO issues instantly.", href: "/tools/seo/on-page-seo-checker", icon: Layout, color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" },
  { name: "AI Content Detector", description: "Detect AI-generated content with linguistic analysis.", href: "/tools/seo/ai-content-detector", icon: Brain, color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" },
  { name: "Keyword Density Checker", description: "Analyze keyword frequency and on-page content balance.", href: "/tools/seo/keyword-density-checker", icon: BarChart3, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" },
  { name: "Broken Link Checker", description: "Find 404 errors and broken links on any page.", href: "/tools/seo/broken-link-checker", icon: Link2, color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" },
  { name: "Link Profile Analyzer", description: "Map all internal and external links on any webpage.", href: "/tools/seo/link-profile-analyzer", icon: FileOutput, color: "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400" },
  { name: "Keyword Intent Analyzer", description: "Identify search intent: informational, navigational, or transactional.", href: "/tools/seo/keyword-intent-analyzer", icon: Target, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
  { name: "SEO Checklist Generator", description: "Get a personalized on-page SEO audit checklist.", href: "/tools/seo/seo-checklist-generator", icon: ListChecks, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
  { name: "Authority Score Checker", description: "Estimate any website's domain authority score.", href: "/tools/seo/authority-score", icon: ShieldCheck, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
  { name: "Content Humanizer", description: "Transform AI-generated text into natural human writing.", href: "/tools/seo/content-humanizer", icon: FileSearch, color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
  { name: "Keyword Suggestion Tool", description: "Generate long-tail keyword ideas for any topic.", href: "/tools/seo/keyword-suggestion", icon: Search, color: "bg-lime-50 dark:bg-lime-900/20 text-lime-600 dark:text-lime-400" },
  { name: "Keyword Volume Estimator", description: "Estimate monthly search volume for any keyword.", href: "/tools/seo/keyword-volume-estimator", icon: BarChart3, color: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400" },
  { name: "Advanced SEO Analyzer", description: "Full technical and on-page SEO audit for any website.", href: "/tools/seo/seo-structure-analyzer", icon: Layout, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" },
  { name: "JSON Formatter", description: "Format, validate, and beautify JSON data online.", href: "/tools/seo/json-formatter", icon: Code2, color: "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400" },
];

interface RelatedSEOToolsProps {
  /** Hrefs of tools to EXCLUDE (i.e., the current page) */
  exclude?: string[];
  /** Max tools to show. Defaults to 4. */
  limit?: number;
}

export default function RelatedSEOTools({ exclude = [], limit = 4 }: RelatedSEOToolsProps) {
  const shown = ALL_SEO_TOOLS.filter((t) => !exclude.includes(t.href)).slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Related SEO Tools</h2>
          <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            More free tools to boost your rankings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {shown.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center justify-between">
                  {tool.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <Link
          href="/tools/seo"
          className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All SEO Tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
