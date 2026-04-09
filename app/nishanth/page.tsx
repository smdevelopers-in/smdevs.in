import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star, 
  TrendingUp, 
  Zap, 
  Code,
  LineChart,
  CheckCircle2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nishanth M | Digital Marketing & SEO Specialist",
  description: "Results-driven Digital Marketing & SEO Specialist with a proven track record of scaling organic traffic, technical SEO, and building AI-driven content strategies.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function NishanthProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* Dynamic Header Background */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40 z-0"></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen opacity-50 animate-blob animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
              <div className="px-6 py-2 bg-slate-900 rounded-full text-indigo-200 font-semibold text-sm tracking-wide uppercase shadow-lg">
                Available for New Opportunities
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-300 tracking-tight mb-6">
              Nishanth M
            </h1>
            <p className="text-xl md:text-2xl text-indigo-200 font-medium max-w-3xl leading-relaxed mb-10">
              Digital Marketing & SEO Specialist orchestrating algorithm mastery and AI-driven growth strategies to scale brands massively.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-slate-300">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Tamil Nadu, India
              </span>
              <a href="mailto:nishanth@smdevs.in" className="flex items-center gap-2 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/10 group">
                <Mail className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                Email Me
              </a>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
                <Phone className="w-4 h-4 text-indigo-400" />
                +91 Contact
              </span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/10 group">
                <Linkedin className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
              <a href="https://smdevs.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/10 group">
                <Globe className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                smdevs.in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800 transition-all hover:border-indigo-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Star className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Professional Summary</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                Results-driven Digital Marketing & SEO Specialist with 4+ years of experience in executing data-driven SEO strategies, increasing organic traffic, and managing client projects. Proven track record of scaling organic traffic from 3K to 300K+, improving search visibility, and driving lead generation. Skilled in technical SEO, AI-powered SEO strategies, content marketing, and web analytics to deliver measurable business growth.
              </p>
            </div>

            {/* Experience Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Work Experience</h2>
              </div>
              
              <div className="space-y-12">
                {/* Job 1 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[39px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="md:grid md:grid-cols-[1fr_3fr] gap-8">
                    <div className="mb-4 md:mb-0 relative z-10 flex md:flex-col md:text-right items-start md:items-end gap-3 md:gap-1">
                      <div className="absolute -left-[41px] md:hidden top-1 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900"></div>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full whitespace-nowrap">Dec 2025 – Present</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Incruiter</span>
                    </div>
                    <div className="relative">
                      <div className="hidden md:block absolute -left-[45px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900"></div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">SEO Specialist</h3>
                      <ul className="space-y-3">
                        {[
                          "Conducted comprehensive SEO audits (Achieved 100/100 Ahrefs score) identifying technical issues and content gaps",
                          "Performed keyword research, mapping, and competitor analysis using Ahrefs & GSC to improve rankings and AI search visibility (AI citations)",
                          "Implemented technical SEO improvements including schema, crawlability fixes, sitemap validation, indexing, and resolving errors",
                          "Optimized homepage, product pages, and blogs (titles, meta, headings, FAQs, internal linking, site structure)",
                          "Revamped 20+ blogs with topic clustering and created new content to improve topical authority",
                          "Built 350+ backlinks and secured 30+ collaborations, increasing domain authority significantly",
                          "Created SEO roadmap, funnels, and optimized new pages for lead generation and conversions"
                        ].map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                            <ChevronRight className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job 2 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[39px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="md:grid md:grid-cols-[1fr_3fr] gap-8">
                    <div className="mb-4 md:mb-0 relative z-10 flex md:flex-col md:text-right items-start md:items-end gap-3 md:gap-1">
                      <div className="absolute -left-[41px] md:hidden top-1 w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">Oct 2024 – Nov 2025</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Zimyo</span>
                    </div>
                    <div className="relative">
                      <div className="hidden md:block absolute -left-[45px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-indigo-500 transition-colors"></div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Senior Executive – Marketing</h3>
                      <ul className="space-y-3">
                        {[
                          "Increased organic traffic from 119K → 316K/month",
                          "Achieved 98 SEMrush audit score, highest in organization",
                          "Developed AI-driven SEO content strategies for scalable blog production",
                          "Implemented Hreflang tags for Middle East & Southeast Asia websites",
                          "Managed Google Ads campaigns aligned with SEO strategy",
                          "Maintained and optimized 4+ websites (WordPress, frontend, Core Web Vitals)",
                          "Automated workflows using Zapier and integrated Bitrix CRM"
                        ].map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job 3 */}
                <div className="relative pl-8 md:pl-0">
                  <div className="md:grid md:grid-cols-[1fr_3fr] gap-8">
                    <div className="mb-4 md:mb-0 relative z-10 flex md:flex-col md:text-right items-start md:items-end gap-3 md:gap-1">
                      <div className="absolute -left-[41px] md:hidden top-1 w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">Aug 2022 – Sept 2024</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">BlewMinds Consulting</span>
                    </div>
                    <div className="relative">
                      <div className="hidden md:block absolute -left-[45px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"></div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Analyst – Technology Consulting</h3>
                      <ul className="space-y-3">
                        {[
                          "Increased organic traffic from 3K → 80K/month",
                          "Managed multiple client SEO projects ensuring timely execution",
                          "Led technical SEO audits improving site health and performance",
                          "Managed AWS EC2 servers, Razorpay integration, and automation tools",
                          "Collaborated with teams to align SEO strategies with business goals"
                        ].map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects & Personal Brand */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Projects & Personal Brand</h2>
              </div>
              
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/30 group hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                       SEO Tools Platform <Globe className="w-5 h-5 text-purple-500" />
                    </h3>
                    <a href="https://smdevs.in" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 mt-1">
                      https://smdevs.in <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                   <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />Built and manage a platform offering high-performance SEO tools and utilities</li>
                   <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />Used for testing real-time SEO strategies, automation, and optimization techniques</li>
                   <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />Demonstrates hands-on expertise in SEO, web development, and product thinking</li>
                </ul>
              </div>

               <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid gap-4 grid-cols-1 md:grid-cols-2">
                 {[
                   { name: "NXG Secure", desc: "SEO optimization, improving technical structure and on-page performance" },
                   { name: "PeopleBridge", desc: "SEO strategy, keyword optimization, and content improvements" },
                   { name: "SaaSHunt AI", desc: "SEO and content strategy for SaaS-focused platform" },
                   { name: "PaintMinds", desc: "Handled technical SEO and website performance optimization" },
                   { name: "Srisharada Vedalayam", desc: "Optimized website structure and improved search visibility" }
                 ].map((proj, idx) => (
                    <div key={idx} className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-1">{proj.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{proj.desc}</p>
                    </div>
                 ))}
               </div>
            </div>

          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Key Achievements */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Key Achievements</h2>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-white mb-1">316K+</div>
                  <div className="text-indigo-100 text-sm font-medium">Monthly Organic Traffic Scaled (from 3K)</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-white mb-1">100/100</div>
                  <div className="text-indigo-100 text-sm font-medium">Ahrefs Audit Score Achieved</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-white mb-1">350+</div>
                  <div className="text-indigo-100 text-sm font-medium">Backlinks built & +6 DA increase in 1 mo.</div>
                </div>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2 text-indigo-50 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-white/70 shrink-0" />
                    Ranked in Featured Snippets, PAA & AI Overviews
                  </li>
                  <li className="flex items-start gap-2 text-indigo-50 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-white/70 shrink-0" />
                    Executed international SEO (Hreflang)
                  </li>
                </ul>
              </div>
            </div>

            {/* AI & Advanced SEO */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                  <Zap className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">AI & Advanced SEO</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "AI-assisted SEO content creation",
                  "Prompt engineering for SEO workflows",
                  "Semantic SEO & entity-based optimization",
                  "Topic clustering & topical authority",
                  "Optimization for AI Overviews (SGE)",
                  "Automation workflows (Zapier/Scripts)",
                  "Advanced crawl optimization"
                ].map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></div>
                    <span className="text-sm font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Tools */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <LineChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Skills & Tools</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">SEO Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {["SEMrush", "Ahrefs", "Ubersuggest", "Surfer SEO", "GSC", "GA4", "GTM"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-md text-sm border border-emerald-100 dark:border-emerald-800/30">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technical / Dev</h3>
                  <div className="flex flex-wrap gap-2">
                    {["WordPress", "HTML/CSS", "JavaScript", "PHP", "AWS EC2", "Core Web Vitals", "Razorpay"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-sm border border-slate-200 dark:border-slate-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Automation & AI</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Zapier", "Bitrix CRM", "SendGrid", "ChatGPT", "AI SEO Tools"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md text-sm border border-blue-100 dark:border-blue-800/30">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Certs */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Education</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">B.E. Computer Science Engineering</h4>
                  <p className="text-sm text-slate-500">Tamilnadu College of Engineering • 2016 - 2020</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Certifications</h2>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Google Cloud Certified – Professional Cloud Architect</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Google Analytics (GA4) Certification</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
