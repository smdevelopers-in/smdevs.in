import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Globe, ShieldCheck, Heart } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "SEO Tools",
    links: [
      { name: "Schema Generator", href: "/tools/seo/schema-generator" },
      { name: "Structure Analyzer", href: "/tools/seo/seo-structure-analyzer" },
      { name: "Keyword Suggestion", href: "/tools/seo/keyword-suggestion" },
      { name: "Meta Tag Generator", href: "/tools/seo/meta-tag-generator" },
    ]
  },
  {
    title: "Trading Tools",
    links: [
      { name: "Pivot Calculator", href: "/tools/trading/pivot-calculator" },
      { name: "Position Sizer", href: "/tools/trading/position-size" },
      { name: "Risk Reward", href: "/tools/trading/risk-reward" },
      { name: "Profit/Loss", href: "/tools/trading/profit-loss" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Premium Plans", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Support", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Submit Feedback", href: "#", id: "global-feedback-trigger" },
    ]
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                SM
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">
                Developers<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-lg font-medium leading-relaxed max-w-sm">
              Empowering the next generation of creators with professional-grade SEO, Trading, and Development utilities. Built for speed, precision, and privacy.
            </p>
            <div className="flex items-center gap-4">
              {[Github, Twitter, Mail, Linkedin].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        id={link.id}
                        className="text-sm font-bold hover:text-blue-500 transition-colors flex items-center gap-1 group"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all px-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Status bar / Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-[2rem] bg-slate-900/50 border border-slate-900 mb-16">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-black uppercase tracking-widest text-white">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-3 md:justify-center">
             <Globe className="w-4 h-4 text-blue-500" />
             <span className="text-xs font-black uppercase tracking-widest text-white">Serving Global Users</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
             <span className="text-xs font-black uppercase tracking-widest text-white">GDPR & Privacy Compliant</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-900">
          <div className="text-xs font-bold tracking-wide">
            © {currentYear} SM Developers Platform. A product of SM Digital.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="#" className="hover:text-blue-500 transition-colors">Usage Policy</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Cookie Audit</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Security</Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by SM Developers
          </div>
        </div>
      </div>
    </footer>
  );
}
