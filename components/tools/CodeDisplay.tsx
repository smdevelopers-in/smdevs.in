import React from "react";

interface CodeDisplayProps {
  code: string;
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  if (!code) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No schema provided</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
          Click the "Run Test" button to paste your JSON-LD schema and see the results.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl group">
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">JSON-LD</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed text-blue-400 custom-scrollbar">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
