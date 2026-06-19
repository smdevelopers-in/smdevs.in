import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SEO Tools — 20+ Online Analyzers & Generators',
  description: 'Access 20+ free SEO tools: meta tag generator, keyword density checker, SERP preview, schema validator, sitemap generator & more. No signup. Instant results.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo'
  },
  openGraph: {
    title: 'Free SEO Tools — 20+ Online Analyzers & Generators',
    description: 'Access 20+ free SEO tools: meta tag generator, keyword density checker, SERP preview, schema validator, sitemap generator & more. No signup. Instant results.',
    url: 'https://smdevs.in/tools/seo',
  }
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return children;
}
