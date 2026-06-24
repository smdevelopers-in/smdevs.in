import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Markup Checker — Validate JSON-LD & Rich Results',
  description: 'Free schema markup checker. Instantly validate JSON-LD structured data, fix errors, and test if your schema qualifies for Google rich results. No signup.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-validator'
  },
  openGraph: {
    title: 'Schema Markup Checker — Validate JSON-LD & Rich Results',
    description: 'Free schema markup checker. Instantly validate JSON-LD structured data, fix errors, and test if your schema qualifies for Google rich results. No signup.',
    url: 'https://smdevs.in/tools/seo/schema-validator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
