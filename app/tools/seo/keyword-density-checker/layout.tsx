import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Density Checker — Analyze Content SEO Instantly',
  description: 'Check keyword density and frequency in any text. Identify keyword stuffing, optimize content balance, and improve on-page SEO scores. Free, no signup.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-density-checker'
  },
  openGraph: {
    title: 'Keyword Density Checker — Analyze Content SEO Instantly',
    description: 'Check keyword density and frequency in any text. Identify keyword stuffing, optimize content balance, and improve on-page SEO scores. Free, no signup.',
    url: 'https://smdevs.in/tools/seo/keyword-density-checker',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
