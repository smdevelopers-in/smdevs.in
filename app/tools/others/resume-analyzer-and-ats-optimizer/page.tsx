"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload, FileText, Clipboard, Briefcase, Shield, Eye, BarChart3,
  CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp,
  Download, Zap, Star, Target, TrendingUp, Users, Award,
  Lightbulb, AlertTriangle, ArrowRight, RefreshCw, Lock,
  Flame, BookOpen, HelpCircle, MessageSquare, Activity
} from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import FAQSection from "@/components/tools/FAQSection";

// ─────────────────────────────────────────────
// KEYWORD DICTIONARY
// ─────────────────────────────────────────────
const TECH_KEYWORDS = [
  "javascript", "typescript", "python", "java", "c++", "c#", "rust", "go", "ruby", "php",
  "react", "next.js", "vue", "angular", "node.js", "express", "django", "flask", "spring",
  "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "ci/cd", "git", "github",
  "sql", "postgresql", "mysql", "mongodb", "redis", "graphql", "rest", "api",
  "machine learning", "deep learning", "tensorflow", "pytorch", "nlp", "data science",
  "agile", "scrum", "devops", "microservices", "linux", "bash", "html", "css", "sass",
  "figma", "sketch", "jira", "confluence", "jenkins", "webpack", "tailwind", "bootstrap",
];

const MARKETING_KEYWORDS = [
  "seo", "sem", "ppc", "google ads", "facebook ads", "social media", "content marketing",
  "email marketing", "crm", "hubspot", "salesforce", "analytics", "google analytics",
  "conversion rate", "funnel", "branding", "copywriting", "marketing strategy",
  "lead generation", "a/b testing", "roi", "kpi", "market research", "growth hacking",
];

const MANAGEMENT_KEYWORDS = [
  "leadership", "team management", "project management", "stakeholder", "budget",
  "strategic planning", "cross-functional", "mentoring", "coaching", "performance review",
  "risk management", "change management", "operations", "process improvement",
  "product management", "roadmap", "okrs", "kpis", "vendor management",
];

const FINANCE_KEYWORDS = [
  "financial modeling", "valuation", "excel", "bloomberg", "financial analysis",
  "forecasting", "budgeting", "accounting", "gaap", "ifrs", "audit", "tax",
  "investment banking", "equity research", "portfolio management", "risk assessment",
  "financial reporting", "p&l", "balance sheet", "cash flow",
];

const ALL_KEYWORDS = [...new Set([...TECH_KEYWORDS, ...MARKETING_KEYWORDS, ...MANAGEMENT_KEYWORDS, ...FINANCE_KEYWORDS])];

const SECTION_PATTERNS: Record<string, RegExp[]> = {
  contact: [/\b(?:email|phone|mobile|tel|linkedin|github|twitter|address|location)\b/i, /@[\w.]+\.\w+/, /\+?[\d\s\-().]{10,}/],
  linkedin: [/linkedin\.com\/in\//i, /\blinkedin\b/i],
  summary: [/\b(?:summary|objective|profile|about|overview|professional summary|career objective)\b/i],
  skills: [/\b(?:skills|technical skills|core competencies|expertise|proficiencies|technologies)\b/i],
  experience: [/\b(?:experience|work experience|employment|work history|professional experience|career)\b/i],
  education: [/\b(?:education|academic|university|college|degree|bachelor|master|phd|b\.?s\.?|m\.?s\.?)\b/i],
  projects: [/\b(?:projects|portfolio|personal projects|academic projects|side projects)\b/i],
  certifications: [/\b(?:certifications?|certificates?|certified|accreditations?|credentials?|licenses?)\b/i],
  achievements: [/\b(?:achievements?|accomplishments?|awards?|honors?|recognition)\b/i],
};

// ─────────────────────────────────────────────
// PARSER UTILITIES
// ─────────────────────────────────────────────
function extractTextFromDocx(binary: string): string {
  // DOCX is a ZIP; extract raw XML text and strip tags
  const xmlMatch = binary.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
  if (!xmlMatch) return binary.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return xmlMatch.map(tag => tag.replace(/<[^>]+>/g, "")).join(" ");
}

function cleanText(raw: string): string {
  return raw
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    .replace(/\s{3,}/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─────────────────────────────────────────────
// ANALYSIS ENGINE
// ─────────────────────────────────────────────
interface SectionStatus { present: boolean; strength: "strong" | "needs-improvement" | "weak"; note: string; }
interface KeywordResult { found: string[]; missing: string[]; coverage: number; }
interface Achievement { text: string; hasMetric: boolean; }
interface ImprovementItem { issue: string; impact: "high" | "medium" | "low"; fix: string; }

interface AnalysisResult {
  atsScore: number;
  qualityScore: number;
  recruiterScore: number;
  readabilityScore: number;
  interviewScore: number;
  wordCount: number;
  pageCount: number;
  sections: Record<string, SectionStatus>;
  keywords: KeywordResult;
  achievements: Achievement[];
  achievementScore: number;
  readability: { avgSentenceLength: number; passiveCount: number; repetitions: string[]; score: number };
  recruiterScan: { firstImpression: string; notices: string[]; misses: string[]; topSections: string[]; ignoredSections: string[] };
  roadmap: { p1: ImprovementItem[]; p2: ImprovementItem[]; p3: ImprovementItem[] };
  roast: string[];
  jdMatch?: { score: number; matched: string[]; missing: string[]; experienceMatch: boolean; certMatch: boolean; improvements: string[] };
  isImagePdf: boolean;
}

function analyzeResume(text: string, jd?: string): AnalysisResult {
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const pageCount = Math.max(1, Math.ceil(wordCount / 400));

  // ── Section Detection ──
  const sectionResults: Record<string, SectionStatus> = {};
  for (const [key, patterns] of Object.entries(SECTION_PATTERNS)) {
    const present = patterns.some(p => p.test(text));
    let strength: "strong" | "needs-improvement" | "weak" = "weak";
    let note = "";
    if (present) {
      if (key === "contact") {
        const emailOk = /@[\w.]+\.\w+/.test(text);
        const phoneOk = /\+?[\d\s\-().]{10,}/.test(text);
        strength = emailOk && phoneOk ? "strong" : "needs-improvement";
        note = !emailOk ? "Missing email address" : !phoneOk ? "Missing phone number" : "Contact info complete";
      } else if (key === "linkedin") {
        strength = /linkedin\.com\/in\//i.test(text) ? "strong" : "needs-improvement";
        note = strength === "strong" ? "LinkedIn URL present" : "LinkedIn mentioned but URL not found";
      } else if (key === "summary") {
        const summaryLen = (text.match(/\b(?:summary|objective|profile)\b[\s\S]{0,400}/i) || [""])[0].split(/\s+/).length;
        strength = summaryLen > 30 ? "strong" : summaryLen > 15 ? "needs-improvement" : "weak";
        note = strength === "strong" ? "Strong summary present" : "Summary is too short";
      } else if (key === "experience") {
        const hasYears = /\b(20\d\d|19\d\d)\b/.test(text);
        const hasBullets = /^[\-•*]\s/m.test(text);
        strength = hasYears && hasBullets ? "strong" : hasYears || hasBullets ? "needs-improvement" : "weak";
        note = !hasYears ? "Missing employment dates" : !hasBullets ? "Use bullet points" : "Experience well-formatted";
      } else if (key === "skills") {
        const skillKeywords = ALL_KEYWORDS.filter(k => lower.includes(k));
        strength = skillKeywords.length > 8 ? "strong" : skillKeywords.length > 3 ? "needs-improvement" : "weak";
        note = `${skillKeywords.length} recognized skills detected`;
      } else if (key === "education") {
        const hasDegree = /\b(?:bachelor|master|phd|b\.?s|m\.?s|b\.?e|m\.?e|b\.?tech|m\.?tech)\b/i.test(text);
        strength = hasDegree ? "strong" : "needs-improvement";
        note = hasDegree ? "Degree detected" : "Specify your degree level";
      } else if (key === "projects") {
        strength = "needs-improvement";
        note = "Projects section found — add measurable outcomes";
      } else if (key === "certifications") {
        strength = "strong";
        note = "Certifications boost ATS compatibility";
      } else if (key === "achievements") {
        const hasMetrics = /\d+%|\$[\d,]+|increased|reduced|grew|saved|generated/i.test(text);
        strength = hasMetrics ? "strong" : "needs-improvement";
        note = hasMetrics ? "Metrics-backed achievements found" : "Add numbers to your achievements";
      } else {
        strength = "needs-improvement";
        note = "Section detected — review content depth";
      }
    } else {
      note = `${key.charAt(0).toUpperCase() + key.slice(1)} section not detected`;
    }
    sectionResults[key] = { present, strength, note };
  }

  // ── Keyword Analysis ──
  const foundKeywords = ALL_KEYWORDS.filter(k => lower.includes(k));
  const missingKeywords = ALL_KEYWORDS
    .filter(k => !lower.includes(k))
    .slice(0, 20);
  const keywordCoverage = Math.min(100, Math.round((foundKeywords.length / 30) * 100));
  const keywords: KeywordResult = { found: foundKeywords, missing: missingKeywords.slice(0, 12), coverage: keywordCoverage };

  // ── Achievement Detection ──
  const achievementRegex = /\b(?:increased|decreased|reduced|improved|grew|generated|saved|delivered|launched|led|managed|built|created|developed|achieved|exceeded|optimized)[^.!?\n]{0,200}/gi;
  const metricRegex = /\d+%|(?:\$|₹|€|£)[\d,.]+[km]?|\b\d+[km]?\s*(?:users|customers|clients|revenue|sales|views|visits|employees|team members)\b|\brank(?:ed)?[^.]{0,30}(?:first|1st|top|\#1)|\b(?:first|1st|top)\s+(?:in|of)/i;
  const rawAchievements = text.match(achievementRegex) || [];
  const achievements: Achievement[] = rawAchievements.slice(0, 8).map(a => ({
    text: a.trim().slice(0, 140),
    hasMetric: metricRegex.test(a),
  }));
  const metricCount = achievements.filter(a => a.hasMetric).length;
  const achievementScore = achievements.length === 0 ? 20
    : Math.min(100, 30 + (metricCount / Math.max(1, achievements.length)) * 70);

  // ── Readability ──
  const avgSentenceLength = sentences.length > 0 ? Math.round(wordCount / sentences.length) : 20;
  const passiveRegex = /\b(?:was|were|been|is|are|am|be)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passiveRegex) || [];
  const passiveCount = passiveMatches.length;

  const wordFreq: Record<string, number> = {};
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (clean.length > 4) wordFreq[clean] = (wordFreq[clean] || 0) + 1;
  });
  const repetitions = Object.entries(wordFreq).filter(([, c]) => c >= 4).map(([w]) => w).slice(0, 6);
  const readabilityScore = Math.max(20, Math.min(100,
    100
    - Math.max(0, avgSentenceLength - 18) * 2
    - passiveCount * 3
    - repetitions.length * 5
  ));

  // ── Score Calculations ──
  const sectionCount = Object.values(sectionResults).filter(s => s.present).length;
  const strongSections = Object.values(sectionResults).filter(s => s.strength === "strong").length;
  const formatScore = pageCount <= 2 ? 20 : pageCount <= 3 ? 10 : 0;
  const atsScore = Math.min(100, Math.round(
    (sectionCount / 9) * 35
    + (strongSections / 9) * 25
    + (keywordCoverage / 100) * 25
    + formatScore / 100 * 15
  ));

  const qualityScore = Math.min(100, Math.round(
    atsScore * 0.4
    + achievementScore * 0.3
    + readabilityScore * 0.3
  ));

  const contactOk = sectionResults.contact?.present;
  const linkedInOk = sectionResults.linkedin?.present;
  const summaryOk = sectionResults.summary?.strength === "strong";
  const recruiterScore = Math.min(100, Math.round(
    (contactOk ? 30 : 0)
    + (linkedInOk ? 20 : 0)
    + (summaryOk ? 25 : 10)
    + (atsScore * 0.25)
  ));

  const interviewScore = Math.min(100, Math.round(
    atsScore * 0.35
    + qualityScore * 0.3
    + recruiterScore * 0.2
    + achievementScore * 0.15
  ));

  // ── Recruiter Scan Simulation ──
  const recruiterNotices: string[] = [];
  const recruiterMisses: string[] = [];
  if (sectionResults.summary?.strength === "strong") recruiterNotices.push("Strong professional summary");
  if (sectionResults.contact?.present) recruiterNotices.push("Contact information is visible");
  if (foundKeywords.length > 8) recruiterNotices.push("Relevant technical/industry keywords");
  if (sectionResults.experience?.strength === "strong") recruiterNotices.push("Clear work experience with dates");
  if (!sectionResults.summary?.present) recruiterMisses.push("No professional summary — first impression lost");
  if (!sectionResults.linkedin?.present) recruiterMisses.push("No LinkedIn profile URL");
  if (achievements.filter(a => a.hasMetric).length === 0) recruiterMisses.push("No measurable achievements (numbers/percentages)");
  if (passiveCount > 5) recruiterMisses.push("Too many passive voice statements");

  const impression = atsScore >= 75
    ? "Strong first impression. Your resume is well-structured and recruiter-friendly."
    : atsScore >= 55
    ? "Decent structure, but several key areas need improvement to stand out."
    : "Your resume needs significant improvement to pass ATS filters and catch recruiter attention.";

  const topSections = Object.entries(sectionResults).filter(([, s]) => s.strength === "strong").map(([k]) => k);
  const ignoredSections = Object.entries(sectionResults).filter(([, s]) => !s.present || s.strength === "weak").map(([k]) => k);

  // ── Improvement Roadmap ──
  const p1: ImprovementItem[] = [];
  const p2: ImprovementItem[] = [];
  const p3: ImprovementItem[] = [];

  if (!sectionResults.contact?.present || sectionResults.contact.strength !== "strong")
    p1.push({ issue: "Incomplete contact information", impact: "high", fix: "Add full name, email, phone number, city, and LinkedIn URL at the top." });
  if (!sectionResults.summary?.present)
    p1.push({ issue: "Missing professional summary", impact: "high", fix: "Add a 3–5 sentence summary highlighting your role, years of experience, and key skills." });
  if (achievements.filter(a => a.hasMetric).length < 2)
    p1.push({ issue: "Weak or missing measurable achievements", impact: "high", fix: "Quantify your impact: 'Increased revenue by 32%', 'Reduced churn by 18%', 'Led a team of 12'." });
  if (keywordCoverage < 40)
    p1.push({ issue: "Low keyword density for ATS", impact: "high", fix: "Add relevant industry keywords from the job description into your skills and experience sections." });

  if (!sectionResults.linkedin?.present)
    p2.push({ issue: "LinkedIn URL missing", impact: "medium", fix: "Add your LinkedIn profile URL: linkedin.com/in/yourprofile" });
  if (passiveCount > 5)
    p2.push({ issue: "Excessive passive voice", impact: "medium", fix: "Replace passive statements with active ones: 'Was responsible for managing' → 'Managed'" });
  if (repetitions.length > 3)
    p2.push({ issue: `Repetitive language (${repetitions.slice(0, 3).join(", ")})`, impact: "medium", fix: "Use varied action verbs: led, built, engineered, developed, launched, scaled, optimized." });
  if (pageCount > 2)
    p2.push({ issue: `Resume is ${pageCount} pages long`, impact: "medium", fix: "Trim to 1–2 pages. Focus on the last 10 years. Remove outdated or irrelevant roles." });

  if (!sectionResults.certifications?.present)
    p3.push({ issue: "No certifications listed", impact: "low", fix: "Add relevant certifications (AWS, Google, PMP, etc.) to boost ATS keyword matching." });
  if (!sectionResults.projects?.present)
    p3.push({ issue: "No projects section", impact: "low", fix: "Add 2–3 key projects with links (GitHub, live URL) and outcomes." });
  if (avgSentenceLength > 22)
    p3.push({ issue: "Long sentences reduce readability", impact: "low", fix: "Keep bullet points under 20 words. Use fragments — ATS handles them well." });

  // ── Resume Roast ──
  const roast: string[] = [];
  if (!sectionResults.summary?.present)
    roast.push("Your resume dives straight into experience with no introduction — recruiters need a 6-second hook first. Add a summary.");
  if (achievements.filter(a => a.hasMetric).length === 0)
    roast.push("Every achievement here is action-only. 'Managed SEO campaigns' tells me nothing. 'Grew organic traffic by 145% in 6 months' tells me everything.");
  if (repetitions.length > 2)
    roast.push(`You've used "${repetitions[0]}" so many times it's lost all meaning. Recruiters scan fast — varied language keeps them engaged.`);
  if (passiveCount > 6)
    roast.push("The passive voice is working overtime here. 'Was responsible for' is the resume equivalent of saying 'things happened near me.'");
  if (!sectionResults.linkedin?.present)
    roast.push("No LinkedIn URL in 2026? That's like bringing a business card with no contact info. Add it — it's a trust signal.");
  if (keywordCoverage < 30)
    roast.push("This resume might struggle with ATS systems. The keyword match is low — sprinkle in relevant industry terms throughout.");
  if (pageCount > 2)
    roast.push(`At ${pageCount} pages, this resume is a commitment. Trim it — recruiters spend an average of 7 seconds on initial review.`);
  if (roast.length === 0)
    roast.push("Overall solid work! Your resume is well-structured. Focus on quantifying more achievements and refreshing your keywords to match target JDs.");

  // ── JD Match ──
  let jdMatch: AnalysisResult["jdMatch"] = undefined;
  if (jd && jd.trim().length > 50) {
    const jdLower = jd.toLowerCase();
    const jdKeywords = ALL_KEYWORDS.filter(k => jdLower.includes(k));
    const matched = jdKeywords.filter(k => lower.includes(k));
    const missingJD = jdKeywords.filter(k => !lower.includes(k));
    const jdScore = jdKeywords.length === 0 ? 50 : Math.round((matched.length / jdKeywords.length) * 100);
    const experienceMatch = /\b\d+\+?\s*years?\s*(?:of\s*)?experience\b/i.test(jd)
      ? /\b\d+\+?\s*years?\s*(?:of\s*)?experience\b/i.test(text) : true;
    const certMatch = /\b(?:certif|certified|pmp|aws|gcp|azure|cpa|cfa)\b/i.test(jd)
      ? /\b(?:certif|certified|pmp|aws|gcp|azure|cpa|cfa)\b/i.test(text) : true;

    const improvements: string[] = [];
    if (missingJD.length > 0) improvements.push(`Add these missing skills from the JD: ${missingJD.slice(0, 5).join(", ")}`);
    if (!experienceMatch) improvements.push("Your stated years of experience may not match the JD requirement");
    if (!certMatch) improvements.push("Consider adding certifications mentioned in the JD");
    if (jdScore < 60) improvements.push("Tailor your skills section to mirror exact keywords from the JD");

    jdMatch = { score: jdScore, matched, missing: missingJD.slice(0, 10), experienceMatch, certMatch, improvements };
  }

  return {
    atsScore, qualityScore, recruiterScore, readabilityScore: Math.round(readabilityScore),
    interviewScore, wordCount, pageCount, sections: sectionResults, keywords, achievements,
    achievementScore: Math.round(achievementScore),
    readability: { avgSentenceLength, passiveCount, repetitions, score: Math.round(readabilityScore) },
    recruiterScan: { firstImpression: impression, notices: recruiterNotices, misses: recruiterMisses, topSections, ignoredSections },
    roadmap: { p1, p2, p3 },
    roast,
    jdMatch,
    isImagePdf: wordCount < 50,
  };
}

// ─────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────
function ScoreGauge({ label, score, color }: { label: string; score: number; color: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = circ * (score / 100);
  const colorMap: Record<string, string> = {
    blue: "text-blue-500", emerald: "text-emerald-500", violet: "text-violet-500",
    amber: "text-amber-500", rose: "text-rose-500"
  };
  const trackMap: Record<string, string> = {
    blue: "text-blue-100 dark:text-blue-950", emerald: "text-emerald-100 dark:text-emerald-950",
    violet: "text-violet-100 dark:text-violet-950", amber: "text-amber-100 dark:text-amber-950",
    rose: "text-rose-100 dark:text-rose-950"
  };
  const bgMap: Record<string, string> = {
    blue: "from-blue-50 dark:from-blue-950/30", emerald: "from-emerald-50 dark:from-emerald-950/30",
    violet: "from-violet-50 dark:from-violet-950/30", amber: "from-amber-50 dark:from-amber-950/30",
    rose: "from-rose-50 dark:from-rose-950/30"
  };
  const grade = score >= 80 ? "Excellent" : score >= 65 ? "Good" : score >= 50 ? "Fair" : "Needs Work";

  return (
    <div className={`flex flex-col items-center p-6 bg-gradient-to-b ${bgMap[color]} to-white dark:to-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all`}>
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle className={trackMap[color]} stroke="currentColor" strokeWidth="10" fill="none" cx="50" cy="50" r={r} />
          <circle
            className={colorMap[color]}
            stroke="currentColor" strokeWidth="10" fill="none" cx="50" cy="50" r={r}
            strokeDasharray={`${circ}`}
            strokeDashoffset={`${circ - dash}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900 dark:text-white">{score}</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-black text-slate-800 dark:text-white text-center">{label}</p>
      <span className={`mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${
        score >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        : score >= 65 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : score >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
      }`}>{grade}</span>
    </div>
  );
}

function SectionBadge({ name, status }: { name: string; status: SectionStatus }) {
  const statusConfig = {
    strong: { icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800", label: "Strong" },
    "needs-improvement": { icon: AlertCircle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", label: "Improve" },
    weak: { icon: XCircle, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800", label: "Weak" },
  };
  const s = status.present ? statusConfig[status.strength] : statusConfig.weak;
  const Icon = s.icon;
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${s.bg} transition-all hover:scale-[1.02]`}>
      <Icon className={`w-5 h-5 shrink-0 ${s.color}`} />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-slate-900 dark:text-white">{displayName}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{status.note}</p>
      </div>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.color} bg-white dark:bg-black/20 border ${s.bg.split(" ").find(c => c.startsWith("border")) || ""}`}>
        {status.present ? s.label : "Missing"}
      </span>
    </div>
  );
}

function ImprovementCard({ item, priority }: { item: ImprovementItem; priority: string }) {
  const [open, setOpen] = useState(false);
  const impactColors = { high: "text-rose-600 bg-rose-50 dark:bg-rose-900/20", medium: "text-amber-600 bg-amber-50 dark:bg-amber-900/20", low: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" };
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <span className={`text-xs font-black px-2 py-1 rounded-lg ${impactColors[item.impact]}`}>{item.impact.toUpperCase()}</span>
        <span className="flex-1 font-bold text-slate-900 dark:text-white text-sm">{item.issue}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="p-5 pt-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-2 mt-4">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.fix}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────
const RESUME_FAQS = [
  {
    question: "What is an ATS (Applicant Tracking System)?",
    answer: "An ATS is software used by employers to automatically screen, rank, and filter job applications before a human recruiter sees them. Over 98% of Fortune 500 companies use ATS software. Resumes that don't meet ATS criteria are filtered out automatically — often without any human review."
  },
  {
    question: "How accurate is the ATS scoring?",
    answer: "Our scoring engine uses heuristic keyword analysis, section detection, formatting signals, and achievement pattern recognition — the same criteria professional ATS systems evaluate. While no tool can perfectly replicate a specific employer's ATS (they vary), our scores give you a strong directional benchmark that reflects industry best practices."
  },
  {
    question: "Is my resume stored on your servers?",
    answer: "Absolutely not. Your resume is processed 100% in your browser using JavaScript. The file is read into memory, analyzed, and the results are displayed — nothing is ever uploaded to our servers, stored in a database, or transmitted anywhere. Your data stays completely private."
  },
  {
    question: "How does JD (Job Description) matching work?",
    answer: "When you paste a job description, our engine extracts the key technical and domain-specific keywords from it. It then compares these against your resume text and calculates a match percentage. It also checks for experience level alignment and certification mentions. The JD Match Score helps you tailor your resume for each specific application."
  },
  {
    question: "Can beginners use this tool?",
    answer: "Yes! This tool is designed for job seekers at all levels — from fresh graduates to senior professionals. The Improvement Roadmap and Resume Roast sections provide actionable, plain-language advice. You don't need any technical knowledge to use or understand the results."
  },
  {
    question: "What file formats are supported?",
    answer: "We support PDF and DOCX file uploads, as well as direct text pasting. For best results with text extraction from PDFs, ensure your PDF is text-based (not a scanned image). DOCX files are parsed by extracting the underlying XML text content. For complex layouts, pasting the text directly gives the most accurate analysis."
  },
];

// ─────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────
const SCHEMA_PRODUCT = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Resume Analyzer & ATS Optimizer",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free Resume Analyzer that checks ATS compatibility, keyword match, readability, recruiter visibility, and generates an improvement roadmap.",
  "url": "https://smdevs.in/tools/others/resume-analyzer-and-ats-optimizer",
  "provider": { "@type": "Organization", "name": "SM Developers", "url": "https://smdevs.in" }
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ResumeAnalyzerPage() {
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    const ext = file.name.split(".").pop()?.toLowerCase();
    const reader = new FileReader();

    if (ext === "docx") {
      reader.onload = (e) => {
        const binary = e.target?.result as string;
        const text = extractTextFromDocx(binary);
        setResumeText(cleanText(text));
      };
      reader.readAsBinaryString(file);
    } else {
      // PDF — read as text (works for text-based PDFs)
      reader.onload = (e) => {
        const raw = e.target?.result as string;
        const cleaned = cleanText(raw);
        setResumeText(cleaned);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".pdf") || file.name.endsWith(".docx"))) processFile(file);
  }, [processFile]);

  const handleAnalyze = () => {
    if (!resumeText.trim() || resumeText.trim().length < 30) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeResume(resumeText, jdText);
      setResult(res);
      setIsAnalyzing(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 1200);
  };

  const handleReset = () => {
    setResult(null);
    setResumeText("");
    setJdText("");
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolLayout
      title="Resume Analyzer & ATS Optimizer"
      description="Analyze your resume's ATS compatibility, keyword match, readability, and recruiter visibility. Get a detailed improvement roadmap — 100% free, no signup, private."
      toolType="SEO"
      tips={[
        "Always tailor your resume for each job — paste the JD to get a targeted keyword gap analysis.",
        "ATS systems rank resumes by keyword density. Mirror the exact phrasing from the job description.",
        "Recruiters spend 6–7 seconds on initial resume review. Your summary and top skills must be immediately visible.",
        "Quantify every achievement: 'Managed team' → 'Led a team of 8 engineers, delivering 3 products in 6 months'.",
        "Keep your resume to 1–2 pages. Longer resumes often score lower in ATS systems.",
        "Use a clean, single-column format. Avoid tables, graphics, and headers/footers — ATS can't read them.",
      ]}
      faqs={RESUME_FAQS}
      explanation={
        <div className="space-y-4">
          <p>Our Resume Analyzer uses a multi-signal heuristic engine to evaluate your resume across five critical dimensions: ATS compatibility, overall quality, recruiter visibility, readability, and interview probability. All processing happens in your browser — your data never leaves your device.</p>
          <p>The analysis simulates how modern ATS software reads your resume: detecting section structure, extracting keywords, evaluating formatting quality, and scoring measurable achievements. The JD Match engine extends this by comparing your resume against a specific job description to identify gaps and tailoring opportunities.</p>
        </div>
      }
    >
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT) }} />

      <div className="space-y-8 print:space-y-6">

        {/* ── Privacy Banner ── */}
        <div className="flex items-center gap-4 p-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl print:hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-black text-emerald-800 dark:text-emerald-300 text-sm">Your resume is analyzed instantly and never stored on our servers.</p>
            <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium mt-0.5">100% client-side processing • No uploads • No database • No tracking</p>
          </div>
        </div>

        {/* ── Input Section ── */}
        {!result && (
          <div className="space-y-6 print:hidden">
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
              {(["upload", "paste"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`px-6 py-3 rounded-xl text-sm font-black transition-all capitalize ${
                    inputMode === mode
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {mode === "upload" ? "📎 Upload Resume" : "📋 Paste Text"}
                </button>
              ))}
            </div>

            {/* Upload Zone */}
            {inputMode === "upload" && (
              <div
                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${
                  dragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : fileName
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10"
                    : "border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} id="resume-upload" />
                {fileName ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-emerald-700 dark:text-emerald-400 text-lg">{fileName}</p>
                      <p className="text-emerald-600 dark:text-emerald-500 text-sm font-medium mt-1">
                        {resumeText.trim() ? `~${resumeText.trim().split(/\s+/).length} words extracted` : "Extracting text..."}
                      </p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); handleReset(); }} className="text-sm text-slate-500 hover:text-slate-700 font-bold underline">
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 dark:text-white text-lg">Drop your resume here</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Supports PDF and DOCX — or click to browse</p>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">Max 5MB • Never stored or uploaded</p>
                  </div>
                )}
              </div>
            )}

            {/* Paste Text */}
            {inputMode === "paste" && (
              <div className="space-y-3">
                <label htmlFor="resume-text" className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                  Paste Resume Text
                </label>
                <textarea
                  id="resume-text"
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  placeholder="Paste your full resume text here (copy-paste from your PDF or Word doc)..."
                  rows={14}
                  className="w-full p-6 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-mono text-sm text-slate-800 dark:text-slate-200 resize-y transition-all leading-relaxed"
                />
                <p className="text-xs text-slate-400 font-medium pl-2">{resumeText.trim().split(/\s+/).filter(Boolean).length} words</p>
              </div>
            )}

            {/* Job Description */}
            <div className="space-y-3">
              <label htmlFor="jd-text" className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Paste Job Description
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">Optional — Enables JD Match</span>
              </label>
              <textarea
                id="jd-text"
                value={jdText}
                onChange={e => setJdText(e.target.value)}
                placeholder="Paste the job description here to get a JD match score, keyword gap analysis, and tailored recommendations..."
                rows={6}
                className="w-full p-6 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-mono text-sm text-slate-800 dark:text-slate-200 resize-y transition-all leading-relaxed"
              />
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!resumeText.trim() || resumeText.trim().length < 30 || isAnalyzing}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black text-lg hover:from-blue-500 hover:to-violet-500 hover:-translate-y-0.5 active:scale-95 transition-all shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
              id="analyze-button"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Analyze My Resume
                </>
              )}
            </button>

            {resumeText.trim().length < 30 && resumeText.trim().length > 0 && (
              <p className="text-center text-sm text-amber-600 dark:text-amber-400 font-medium">
                ⚠️ Please paste more text — need at least a few sentences for accurate analysis
              </p>
            )}
          </div>
        )}

        {/* ── Results ── */}
        {result && (
          <div ref={resultsRef} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Image PDF Warning */}
            {result.isImagePdf && (
              <div className="flex items-start gap-4 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl print:hidden">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-amber-800 dark:text-amber-300 text-sm">Low text content detected</p>
                  <p className="text-amber-700 dark:text-amber-400 text-xs font-medium mt-0.5">Your PDF may be image-based. For best results, copy-paste text from your resume directly using the "Paste Text" mode.</p>
                </div>
              </div>
            )}

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Analysis Complete</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{result.wordCount} words • ~{result.pageCount} page{result.pageCount !== 1 ? "s" : ""} • {result.jdMatch ? "JD Match enabled" : "Standard analysis"}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
                <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-500 transition-all">
                  <RefreshCw className="w-4 h-4" /> New Analysis
                </button>
              </div>
            </div>

            {/* ── Score Dashboard ── */}
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                Score Dashboard
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <ScoreGauge label="ATS Score" score={result.atsScore} color="blue" />
                <ScoreGauge label="Resume Quality" score={result.qualityScore} color="emerald" />
                <ScoreGauge label="Recruiter Visibility" score={result.recruiterScore} color="violet" />
                <ScoreGauge label="Readability" score={result.readabilityScore} color="amber" />
                <ScoreGauge label="Interview Probability" score={result.interviewScore} color="rose" />
              </div>
            </div>

            {/* ── Resume Heatmap ── */}
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-violet-600" />
                </div>
                Resume Section Heatmap
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(result.sections).map(([name, status]) => (
                  <SectionBadge key={name} name={name} status={status} />
                ))}
              </div>
            </div>

            {/* ── Keyword Analysis ── */}
            <div className="bg-slate-950 dark:bg-black rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-lg font-black text-white mb-2 flex items-center gap-3 relative z-10">
                <Target className="w-5 h-5 text-blue-400" />
                Keyword Analysis
              </h3>
              <p className="text-slate-400 text-sm font-medium mb-6 relative z-10">
                Keyword Coverage: <span className="text-blue-400 font-black">{result.keywords.coverage}%</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" /> Strong Keywords ({result.keywords.found.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.found.slice(0, 18).map(k => (
                      <span key={k} className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-400">{k}</span>
                    ))}
                    {result.keywords.found.length > 18 && <span className="px-3 py-1 text-xs font-bold text-slate-500">+{result.keywords.found.length - 18} more</span>}
                    {result.keywords.found.length === 0 && <span className="text-sm text-slate-500 font-medium italic">No recognized keywords found</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5" /> Missing Keywords (sample)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.missing.map(k => (
                      <span key={k} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-bold text-rose-400">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Achievement Detector ── */}
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                Achievement Detector
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000" style={{ width: `${result.achievementScore}%` }} />
                </div>
                <span className="font-black text-amber-600 dark:text-amber-400 text-lg w-12 text-right">{result.achievementScore}%</span>
              </div>
              {result.achievements.length === 0 ? (
                <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl">
                  <p className="font-bold text-amber-700 dark:text-amber-400">No achievements detected</p>
                  <p className="text-sm text-amber-600 dark:text-amber-500 font-medium mt-1">Add action-verb bullet points with measurable outcomes to your experience section.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {result.achievements.map((a, i) => (
                    <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${a.hasMetric ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800"}`}>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.hasMetric ? "bg-emerald-500" : "bg-amber-400"}`}>
                        {a.hasMetric ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <AlertCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{a.text}...</p>
                        <p className={`text-xs font-black mt-1 ${a.hasMetric ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                          {a.hasMetric ? "✓ Metric-backed achievement" : "⚠ Weak — add a number, percentage, or impact metric"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Readability ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                  </div>
                  Readability
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Avg Sentence Length", value: `${result.readability.avgSentenceLength} words`, ok: result.readability.avgSentenceLength <= 18 },
                    { label: "Passive Voice Uses", value: String(result.readability.passiveCount), ok: result.readability.passiveCount <= 3 },
                    { label: "Repetitive Words", value: result.readability.repetitions.length > 0 ? result.readability.repetitions.slice(0, 3).join(", ") : "None", ok: result.readability.repetitions.length <= 2 },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${item.ok ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800"}`}>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                      <span className={`text-sm font-black ${item.ok ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Recruiter Scan ── */}
              <div className="md:col-span-2 bg-gradient-to-br from-violet-50 dark:from-violet-950/30 to-white dark:to-slate-900 rounded-3xl border border-violet-200 dark:border-violet-800 p-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-violet-600" />
                  Recruiter 6-Second Scan
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-5 italic">"{result.recruiterScan.firstImpression}"</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Recruiter Notices</p>
                    <ul className="space-y-1.5">
                      {result.recruiterScan.notices.length > 0 ? result.recruiterScan.notices.map((n, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{n}
                        </li>
                      )) : <li className="text-xs text-slate-400 italic">Nothing stands out yet</li>}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black text-rose-600 uppercase tracking-widest mb-2">Recruiter Misses</p>
                    <ul className="space-y-1.5">
                      {result.recruiterScan.misses.length > 0 ? result.recruiterScan.misses.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />{m}
                        </li>
                      )) : <li className="text-xs text-slate-400 italic">Nothing significant missing</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ── JD Match ── */}
            {result.jdMatch && (
              <div className="bg-gradient-to-br from-blue-950 to-slate-950 dark:from-blue-950 dark:to-black rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <h3 className="text-xl font-black mb-1 flex items-center gap-3 relative z-10">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  JD Match Analysis
                </h3>
                <p className="text-slate-400 text-sm font-medium mb-6 relative z-10">How well your resume aligns with the job description</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle className="text-white/10" stroke="currentColor" strokeWidth="10" fill="none" cx="50" cy="50" r="40" />
                        <circle
                          className={result.jdMatch.score >= 70 ? "text-emerald-400" : result.jdMatch.score >= 50 ? "text-amber-400" : "text-rose-400"}
                          stroke="currentColor" strokeWidth="10" fill="none" cx="50" cy="50" r="40"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.jdMatch.score / 100)}`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{result.jdMatch.score}%</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">JD Match</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 w-full">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-medium">Experience</span>
                        <span className={`font-black ${result.jdMatch.experienceMatch ? "text-emerald-400" : "text-rose-400"}`}>{result.jdMatch.experienceMatch ? "✓ Match" : "✗ Gap"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-medium">Certifications</span>
                        <span className={`font-black ${result.jdMatch.certMatch ? "text-emerald-400" : "text-amber-400"}`}>{result.jdMatch.certMatch ? "✓ Match" : "⚠ Missing"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {result.jdMatch.matched.length > 0 && (
                      <div>
                        <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Matched Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {result.jdMatch.matched.slice(0, 12).map(k => (
                            <span key={k} className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-400">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.jdMatch.missing.length > 0 && (
                      <div>
                        <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">Missing from JD</p>
                        <div className="flex flex-wrap gap-2">
                          {result.jdMatch.missing.slice(0, 10).map(k => (
                            <span key={k} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-bold text-rose-400">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.jdMatch.improvements.length > 0 && (
                      <div>
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">High Priority Improvements</p>
                        <ul className="space-y-2">
                          {result.jdMatch.improvements.map((imp, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-medium">
                              <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />{imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Improvement Roadmap ── */}
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-rose-600" />
                </div>
                Resume Improvement Roadmap
              </h3>
              <div className="space-y-8">
                {[
                  { label: "Priority 1", items: result.roadmap.p1, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800" },
                  { label: "Priority 2", items: result.roadmap.p2, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" },
                  { label: "Priority 3", items: result.roadmap.p3, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
                ].map(({ label, items, color }) => items.length > 0 && (
                  <div key={label}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest mb-4 ${color}`}>
                      {label} — {items.length} item{items.length !== 1 ? "s" : ""}
                    </div>
                    <div className="space-y-3">
                      {items.map((item, i) => <ImprovementCard key={i} item={item} priority={label} />)}
                    </div>
                  </div>
                ))}
                {result.roadmap.p1.length === 0 && result.roadmap.p2.length === 0 && result.roadmap.p3.length === 0 && (
                  <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                    <p className="font-black text-emerald-700 dark:text-emerald-400">Excellent! No critical improvements detected.</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium mt-1">Keep tailoring your resume for each specific job application.</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Resume Roast ── */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-5">
                <Flame className="w-48 h-48 text-orange-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2 flex items-center gap-3 relative z-10">
                <Flame className="w-5 h-5 text-orange-400" />
                Professional Resume Roast
              </h3>
              <p className="text-slate-400 text-sm font-medium mb-6 relative z-10">Honest, constructive feedback — always professional, never insulting</p>
              <div className="space-y-4 relative z-10">
                {result.roast.map((line, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <MessageSquare className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Analyze New Resume button ── */}
            <div className="flex justify-center print:hidden">
              <button onClick={handleReset} className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black rounded-2xl hover:from-blue-500 hover:to-violet-500 hover:-translate-y-0.5 transition-all shadow-xl shadow-blue-500/20">
                <RefreshCw className="w-5 h-5" /> Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
