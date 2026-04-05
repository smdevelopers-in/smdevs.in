import React from "react";
import { CheckCircle2, AlertCircle, Info, Tag } from "lucide-react";

interface ResultDisplayProps {
  error: string | null;
  schemaType: string | null;
  isInitial?: boolean;
}

export default function ResultDisplay({ error, schemaType, isInitial = false }: ResultDisplayProps) {
  if (isInitial) {
    return (
      <div className="h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center animate-pulse">
          <Info className="w-10 h-10 text-blue-600 dark:text-blue-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Validate</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
            Your results will appear here once you run the validation. We'll identify the schema type and highlight any issues.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full overflow-hidden bg-rose-50 dark:bg-rose-950/20 rounded-3xl border-2 border-rose-200 dark:border-rose-900/30 flex flex-col">
        <div className="px-6 py-4 bg-rose-100 dark:bg-rose-900/20 border-b border-rose-200 dark:border-rose-900/30 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-500" />
          <h3 className="font-bold text-rose-900 dark:text-rose-200">Validation Error</h3>
        </div>
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-rose-600 dark:text-rose-400 bg-white dark:bg-rose-900/40 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-rose-900/20 w-full">
            <p className="font-mono text-sm break-words">{error}</p>
          </div>
          <p className="text-rose-700/70 dark:text-rose-400/60 text-sm leading-relaxed max-w-xs">
            Please make sure your JSON is properly formatted and contains a valid <code>@type</code> property.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/30 flex flex-col">
      <div className="px-6 py-4 bg-emerald-100 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-900/30 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
        <h3 className="font-bold text-emerald-900 dark:text-emerald-200">Schema is Valid</h3>
      </div>
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            Detected Type
          </div>
          <div className="text-4xl md:text-5xl font-black text-emerald-900 dark:text-emerald-50 flex items-center gap-4">
            {schemaType || "Unknown"}
          </div>
        </div>
        <div className="bg-white dark:bg-emerald-900/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/20 shadow-sm w-full text-left">
          <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium leading-relaxed">
            The structured data was successfully parsed. Search engines should be able to identify this as a <strong>{schemaType}</strong> object.
          </p>
        </div>
      </div>
    </div>
  );
}
