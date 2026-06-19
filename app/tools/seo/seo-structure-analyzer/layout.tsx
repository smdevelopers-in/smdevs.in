import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Advanced SEO Audit Tool — Full Site SEO Analysis',
  description: 'Run a professional-grade SEO structure audit on any URL for free. Get weighted scores, keyword correlation, heading analysis and actionable fix recommendations.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/seo-structure-analyzer'
  },
  openGraph: {
    title: 'Free Advanced SEO Audit Tool — Full Site SEO Analysis',
    description: 'Run a professional-grade SEO structure audit on any URL for free. Get weighted scores, keyword correlation, heading analysis and actionable fix recommendations.',
    url: 'https://smdevs.in/tools/seo/seo-structure-analyzer',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
