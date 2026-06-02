import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Checklist Tool Free',
  description: 'A foolproof, interactive SEO checklist designed to drastically improve rankings. Never miss a critical optimization step again.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/seo-checklist-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
