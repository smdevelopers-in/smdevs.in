"use client";

import React from "react";
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import CopyButton from "./CopyButton";

interface ResultBoxProps {
  title: string;
  content: string;
  type?: "success" | "error" | "info" | "code";
  language?: string;
  label?: string;
}

export default function ResultBox({
  title,
  content,
  type = "code",
  language = "json",
  label,
}: ResultBoxProps) {
  const isCode = type === "code";

  return (
    <div className={`overflow-hidden rounded-3xl border-2 transition-all ${
      type === "success" ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30" :
      type === "error" ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30" :
      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
    } shadow-sm`}>
      <div className={`px-6 py-4 flex items-center justify-between border-b transition-colors ${
        type === "success" ? "bg-emerald-100/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30" :
        type === "error" ? "bg-rose-100/50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900/30" :
        "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
      }`}>
        <div className="flex items-center gap-3">
          {type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" /> :
           type === "error" ? <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-500" /> :
           <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-500" />}
          <h3 className={`font-bold ${
            type === "success" ? "text-emerald-900 dark:text-emerald-200" :
            type === "error" ? "text-rose-900 dark:text-rose-200" :
            "text-slate-900 dark:text-white"
          }`}>
            {title}
          </h3>
          {label && (
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 ml-2">
              {label}
            </span>
          )}
        </div>
        {content && <CopyButton text={content} />}
      </div>

      <div className="p-6">
        {isCode ? (
          <div className="relative group">
            <pre className="p-6 bg-slate-950 rounded-2xl overflow-auto custom-scrollbar border border-slate-800 shadow-inner max-h-[500px]">
              <code className={`block font-mono text-sm leading-relaxed text-blue-400`}>
                {content}
              </code>
            </pre>
          </div>
        ) : (
          <div className="space-y-4">
            <p className={`text-lg leading-relaxed ${
              type === "info" ? "text-slate-600 dark:text-slate-300 font-medium" :
              type === "success" ? "text-emerald-800 dark:text-emerald-300 font-bold" :
              "text-rose-800 dark:text-rose-300 font-bold"
            }`}>
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
