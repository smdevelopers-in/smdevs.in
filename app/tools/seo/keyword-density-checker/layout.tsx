import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Density Checker — Analyze Content SEO',
  description: 'Check keyword density in your content for free. Find over-used or missing keywords, avoid stuffing, and improve your on-page SEO score. Instant analysis.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-density-checker'
  },
  openGraph: {
    title: 'Free Keyword Density Checker — Analyze Content SEO',
    description: 'Check keyword density in your content for free. Find over-used or missing keywords, avoid stuffing, and improve your on-page SEO score. Instant analysis.',
    url: 'https://smdevs.in/tools/seo/keyword-density-checker',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
