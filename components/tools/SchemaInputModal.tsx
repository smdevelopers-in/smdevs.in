"use client";

import React, { useState } from "react";
import { X, Code2, Play, Trash2 } from "lucide-react";

interface SchemaInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunTest: (schema: string) => void;
  initialValue?: string;
}

const EXAMPLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build a Schema Validator",
  "author": {
    "@type": "Person",
    "name": "SM Developers"
  },
  "datePublished": "2024-03-27",
  "description": "A comprehensive guide to building a frontend-only schema validator using Next.js and Tailwind CSS."
};

export default function SchemaInputModal({ isOpen, onClose, onRunTest, initialValue = "" }: SchemaInputModalProps) {
  const [input, setInput] = useState(initialValue);

  if (!isOpen) return null;

  const handleRun = () => {
    onRunTest(input);
    onClose();
  };

  const loadExample = () => {
    setInput(JSON.stringify(EXAMPLE_SCHEMA, null, 2));
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Input Schema</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON-LD schema here (e.g., { "@context": "..." })'
              className="w-full h-80 p-6 font-mono text-sm bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none shadow-sm text-slate-900 dark:text-white"
            />
            {input && (
              <button
                onClick={clearInput}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                title="Clear input"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={loadExample}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              Load Example Article Schema
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRun}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Run Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
