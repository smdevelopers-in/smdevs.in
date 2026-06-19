import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free On-Page SEO Checker — Audit Any URL Instantly',
  description: 'Analyze any webpage for on-page SEO factors: title tag, meta description, headings, images & internal links — free. Get instant actionable recommendations.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/on-page-seo-checker'
  },
  openGraph: {
    title: 'Free On-Page SEO Checker — Audit Any URL Instantly',
    description: 'Analyze any webpage for on-page SEO factors: title tag, meta description, headings, images & internal links — free. Get instant actionable recommendations.',
    url: 'https://smdevs.in/tools/seo/on-page-seo-checker',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
