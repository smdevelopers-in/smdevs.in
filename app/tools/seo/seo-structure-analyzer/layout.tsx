import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced SEO Audit',
  description: 'Professional-grade SEO structure analysis with weighted scoring, keyword correlation, and actionable fix suggestions.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/seo-structure-analyzer'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
