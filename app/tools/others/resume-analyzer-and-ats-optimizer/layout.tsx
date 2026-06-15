import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Resume Analyzer & ATS Optimizer | ATS Score, JD Match & Resume Review',
  description: 'Analyze resume quality, ATS compatibility, recruiter visibility, keyword match and job description alignment using our free Resume Analyzer & ATS Optimizer.',
  alternates: {
    canonical: 'https://smdevs.in/tools/others/resume-analyzer-and-ats-optimizer'
  },
  openGraph: {
    title: 'Free Resume Analyzer & ATS Optimizer | ATS Score, JD Match & Resume Review',
    description: 'Analyze resume quality, ATS compatibility, recruiter visibility, keyword match and job description alignment using our free Resume Analyzer & ATS Optimizer.',
    type: 'website',
    url: 'https://smdevs.in/tools/others/resume-analyzer-and-ats-optimizer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
