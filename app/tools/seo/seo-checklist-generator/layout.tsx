import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SEO Checklist Tool — Complete On-Page SEO Audit',
  description: 'Comprehensive, interactive SEO checklist covering 50+ on-page, technical and content SEO factors. Track your progress and improve rankings step by step. Free.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/seo-checklist-generator'
  },
  openGraph: {
    title: 'Free SEO Checklist Tool — Complete On-Page SEO Audit',
    description: 'Comprehensive, interactive SEO checklist covering 50+ on-page, technical and content SEO factors. Track your progress and improve rankings step by step. Free.',
    url: 'https://smdevs.in/tools/seo/seo-checklist-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
