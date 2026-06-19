import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Schema Validator — Validate JSON-LD Structured Data',
  description: 'Validate your JSON-LD structured data and schema markup instantly for free. Check for errors that prevent rich results in Google search. No signup required.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-validator'
  },
  openGraph: {
    title: 'Free Schema Validator — Validate JSON-LD Structured Data',
    description: 'Validate your JSON-LD structured data and schema markup instantly for free. Check for errors that prevent rich results in Google search. No signup required.',
    url: 'https://smdevs.in/tools/seo/schema-validator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
