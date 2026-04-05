import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText, 
  Database, 
  Globe, 
  UserCheck 
} from "lucide-react";

import Breadcrumbs from "@/components/tools/Breadcrumbs";

export const metadata = {
  title: "Privacy & Terms | SM Developers",
  description: "Our commitment to your privacy and rules for using our platform. Learn how SM Developers protects your data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 5, 2026";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-24 lg:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Privacy & <span className="text-blue-600">Terms</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
             Our commitment to your privacy and the rules for using our platform. Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Privacy & Terms" }]} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        
        {/* Core Principles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <EyeOff className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">No Tracking</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        We don't use invasive tracking scripts or sell your behavioral data.
                    </p>
                </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">Minimal Data</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        We only process the data necessary to provide the tool's functionality.
                    </p>
                </div>
            </div>
        </section>

        {/* Detailed Sections */}
        <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 space-y-12">
            
            <section className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Data Collection</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    SM Developers provides free utilities that do not require account registration for basic usage. We do not collect names, emails, or personal identifiers unless you explicitly contact us for support or subscribe to our optional newsletter.
                </p>
                <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-800 italic text-sm text-slate-500">
                    Example: When you use our SEO Structure Analyzer, we only process the URL you provide to generate the report. This data is not permanently stored or linked to your identity.
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                    <Lock className="w-5 h-5" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Data Usage</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Any data processed by our tools is used solely for the purpose of delivering the requested output. We use anonymized, aggregated traffic data to monitor the performance and stability of our servers.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                    <ShieldCheck className="w-5 h-5" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Security</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We implement industry-standard security measures, including SSL encryption (HTTPS), to ensure that any data transmitted between your browser and our servers is protected from interception.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-rose-600">
                    <UserCheck className="w-5 h-5" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Third-Party Services</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our platform may contain links to external sites. We are not responsible for the privacy practices of those repositories or websites. We recommend reviewing their policies before engaging with them.
                </p>
            </section>

            <section className="space-y-6 pt-12 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-indigo-600">
                    <ShieldCheck className="w-5 h-5" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Usage Policy (Terms)</h2>
                </div>
                <div className="space-y-6 text-slate-600 dark:text-slate-400">
                    <p className="leading-relaxed font-medium">
                        By accessing SM Developers, you agree to follow our code of conduct and usage rules.
                    </p>
                    <ul className="space-y-4 list-disc pl-5">
                        <li>
                            <strong className="text-slate-900 dark:text-white">Fair Use:</strong> Our tools are provided for individual and professional use. Automated scraping or "stress-testing" our APIs without permission is strictly prohibited.
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-white">Accuracy:</strong> While we aim for 100% precision (especially in our Trading Calculators), all outputs are for informational purposes only. Always verify critical results.
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-white">No Liability:</strong> SM Developers is not liable for any financial losses or SEO ranking changes resulting from the use of our free utilities.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center space-y-6">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white">Have questions?</h2>
                 <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    If you have any concerns regarding your privacy or our data handling practices, please contact our support team.
                 </p>
                 <a 
                    href="mailto:support@smdevelopers.io"
                    className="inline-flex px-8 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform"
                 >
                    Contact Support
                 </a>
            </section>

        </div>

        {/* Footer Meta */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Globe className="w-4 h-4 text-blue-500" /> GDPR Compliant Platform
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                © {new Date().getFullYear()} SM Developers Platform
            </div>
        </div>

      </main>
    </div>
  );
}
