"use client";

import React, { useState } from "react";
import { Play, BookOpen, Search, Info } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import ResultBox from "@/components/tools/ResultBox";
import SchemaInputModal from "@/components/tools/SchemaInputModal";

const SCHEMA_DESCRIPTIONS: Record<string, string> = {
  Article: "Used for news, blog posts, or investigative reports. Helps Google understand the headline, author, and date published.",
  FAQPage: "A page that contains a list of frequently asked questions and answers. Can lead to rich results in search.",
  Product: "Detailed information about a product, including price, availability, and review ratings.",
  WebPage: "A general web page schema. Often used when more specific types don't apply, providing site-wide context.",
  LocalBusiness: "Helps local search engines understand your physical location, business hours, and contact info.",
  Organization: "Specifies details about a company, like its name, logo, and social profile links.",
  BreadcrumbList: "Shows the page's position in the site hierarchy, which can appear as breadcrumbs in search results.",
};

const SCHEMA_TYPE_MAP: Record<string, string> = {
  Article: "Article Schema",
  FAQPage: "FAQ Schema",
  Product: "Product Schema",
  WebPage: "WebPage Schema",
  LocalBusiness: "Local Business Schema",
  Organization: "Organization Schema",
  BreadcrumbList: "Breadcrumb Schema",
};

const VALIDATOR_FAQS = [
  {
    question: "What is Schema Markup?",
    answer: "Schema markup (or structured data) is code that you place on your website to help search engines return more informative results for users. It translates your content into a format that Google specifically understands."
  },
  {
    question: "Why does my schema fail validation?",
    answer: "Common reasons include missing required properties (like an image for articles, or price for products), syntax errors like missing commas or brackets, or using the wrong data types."
  },
  {
    question: "How long does it take for Google to show rich snippets?",
    answer: "Once you implement valid schema and Google crawls your page, it can take anywhere from a few days to a few weeks. However, Google does not guarantee rich snippets will show even with valid schema."
  },
  {
    question: "Is JSON-LD the only format supported?",
    answer: "While Google supports Microdata and RDFa, they strongly recommend JSON-LD. It is much easier to implement and maintain as it lives within a script tag rather than wrapping your HTML elements."
  }
];

export default function SchemaValidatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputSchema, setInputSchema] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [schemaType, setSchemaType] = useState<string | null>(null);
  const [isInitial, setIsInitial] = useState(true);

  const runTest = (schema: string) => {
    setIsInitial(false);
    setInputSchema(schema);
    setError(null);
    setSchemaType(null);

    try {
      const parsed = JSON.parse(schema);
      if (!parsed["@type"]) {
        setError("Invalid schema: Missing @type property.");
        return;
      }

      const type = parsed["@type"];
      setSchemaType(type);
      setInputSchema(JSON.stringify(parsed, null, 2));

    } catch (e) {
      setError("The provided JSON is malformed. Please check for missing commas or brackets.");
    }
  };

  return (
    <ToolLayout
      title="Schema Validator"
      description="Validate and identify your structured data schema easily. Ensure your JSON-LD implementation is perfect for search engines."
      toolType="SEO"
      howToUse={[
        "Click the 'Run New Test' button to open the input modal.",
        "Paste your JSON-LD schema or load an example to test.",
        "Click 'Run Test' to see the analysis and detected schema type.",
        "Review any errors or warnings in the result section."
      ]}
      tips={[
        "Always use JSON-LD for your schema implementation—it's Google's highly recommended format.",
        "Ensure your schema properties (like price or author) exactly match the visible content on your page.",
        "FAQ schema can significantly increase your search result 'real estate' by showing questions directly under your link.",
        "Use the 'LocalBusiness' schema if you have a physical office to improve your ranking in local map results."
      ]}
      explanation={
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is Schema Markup?</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Schema markup (also called structured data) is a standardized vocabulary of code — based on Schema.org — that you add to your website&apos;s HTML. It tells search engines exactly what your content means, not just what it says. Google uses this information to generate <strong>rich results</strong> (star ratings, FAQs, breadcrumbs, product prices) in search listings, which dramatically increases click-through rates.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is a Schema Validator?</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">A schema validator (also called a schema checker or schema tester) checks your JSON-LD, Microdata, or RDFa markup against the Schema.org specification. It identifies syntax errors, missing required fields, and deprecated properties that would prevent Google from generating rich results for your pages.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Validate Schema Markup</h2>
            <ol className="space-y-2 text-slate-600 dark:text-slate-400 font-medium list-decimal pl-5">
              <li>Paste your JSON-LD structured data into the validator above.</li>
              <li>Click &ldquo;Validate Schema&rdquo; to run the check.</li>
              <li>Review any errors or warnings flagged by the tool.</li>
              <li>Fix the issues and re-validate until you get a clean pass.</li>
              <li>Add the validated code inside a <code>&lt;script type=&ldquo;application/ld+json&rdquo;&gt;</code> tag in your page &lt;head&gt;.</li>
            </ol>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">JSON-LD</h4>
              <p className="text-xs text-slate-500 font-medium">The recommended format. Written as a &lt;script&gt; block — easy to add and update without touching your HTML content.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-2">Rich Results</h4>
              <p className="text-xs text-slate-500 font-medium">Valid schema markup can unlock star ratings, FAQs, How-Tos, and Sitelinks in Google search — increasing organic CTR by up to 30%.</p>
            </div>
          </div>
        </div>
      }
      faqs={VALIDATOR_FAQS}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Status</h2>
            <p className="text-sm text-slate-500 font-medium">Click run to start validating</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group active:scale-95 whitespace-nowrap"
        >
          <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
          Run New Test
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source View */}
        <ResultBox
          title="Input Schema"
          content={inputSchema}
          label="JSON-LD"
        />

        {/* Analysis View */}
        <div className="space-y-6">
          <ResultBox
            title={isInitial ? "Waiting for Input" : error ? "Validation Failed" : "Schema is Valid"}
            content={error || (schemaType ? `Detected: ${SCHEMA_TYPE_MAP[schemaType] || schemaType}` : "No results yet")}
            type={isInitial ? "info" : error ? "error" : "success"}
          />

          {!isInitial && !error && schemaType && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Understanding this Schema</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {SCHEMA_DESCRIPTIONS[schemaType] || "This is a valid schema type defined by Schema.org. It helps search engines provide specific rich results for this content type."}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                Powered by Schema.org Standards
              </div>
            </div>
          )}
        </div>
      </div>

      <SchemaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRunTest={runTest}
        initialValue={inputSchema}
      />
    </ToolLayout>
  );
}
