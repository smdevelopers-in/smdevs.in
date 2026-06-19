import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Authority Score Checker — Estimate Website Authority',
  description: 'Estimate any website\'s domain authority score for free based on content depth, backlink signals and technical SEO. No API key needed. Instant domain authority check.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/authority-score'
  },
  openGraph: {
    title: 'Free Authority Score Checker — Estimate Website Authority',
    description: 'Estimate any website\'s domain authority score for free based on content depth, backlink signals and technical SEO. No API key needed. Instant domain authority check.',
    url: 'https://smdevs.in/tools/seo/authority-score',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
