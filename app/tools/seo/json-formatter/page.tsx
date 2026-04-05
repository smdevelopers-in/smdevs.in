"use client";

import React, { useState, useEffect } from "react";
import { FileOutput, CheckCircle2, AlertCircle, FileCode } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";
import ResultBox from "@/components/tools/ResultBox";

export default function JsonFormatterPage() {
  const [input, setInput] = useState('{"name":"SM Developers","tool":"JSON Formatter","features":["Fast","Offline","Beautiful"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  }, [input]);

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Clean up and validate your raw JSON data. Turn messy code into a beautiful, human-readable format instantly."
      toolType="SEO"
      howToUse={[
        "Paste your raw or minified JSON string into the input area.",
        "The tool will automatically validate your code as you type.",
        "If the JSON is valid, the prettified version will appear on the right.",
        "Review any syntax errors in the analysis box below the input."
      ]}
      tips={[
        "JSON (JavaScript Object Notation) is the standard for data exchange on the web.",
        "Use this tool to audit your technical SEO schema for syntax errors before publishing.",
        "A missing comma or bracket is the most common cause of JSON validation failure.",
        "Formatted JSON is much easier to collaborate on and review for structural consistency."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            JSON Formatter is a utility that parses raw, minified, or unorganized JSON data and restructures it with proper indentation and spacing (Prettifying). This makes the data human-readable without changing any of the underlying logic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-purple-600 mb-2">Syntax Validation</h4>
                <p className="text-xs text-slate-500 font-medium">Immediately identifies broken JSON structure and provides specific error messages.</p>
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2">Dev Experience</h4>
                <p className="text-xs text-slate-500 font-medium">Makes debugging API responses and configuration files 10x faster.</p>
             </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FileOutput className="w-6 h-6 text-purple-600 dark:text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Raw JSON</h2>
            </div>

            <InputField
              label="Input Source"
              type="textarea"
              value={input}
              onChange={setInput}
              placeholder='{ "key": "value" }'
            />
          </div>

          <div className={`p-6 rounded-[1.5rem] border-2 flex items-center gap-4 transition-all ${
            error ? "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30" :
                    "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
              error ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
            }`}>
              {error ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div>
              <p className={`font-bold text-sm ${error ? "text-rose-900 dark:text-rose-200" : "text-emerald-900 dark:text-emerald-200"}`}>
                {error ? "Invalid JSON Syntax" : "Perfect Syntax"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {error ? error : "Code is ready for production"}
              </p>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-6">
          <ResultBox
            title="Formatted Result"
            content={output}
            label={output ? "Beautified" : "Waiting..."}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
