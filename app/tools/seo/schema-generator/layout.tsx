import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Markup Generator — Create JSON-LD Structured Data',
  description: 'Generate free JSON-LD schema markup for Articles, FAQs, Products, Breadcrumbs & more. Copy-paste ready code that boosts Google rich results. No signup.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-generator'
  },
  openGraph: {
    title: 'Schema Markup Generator — Create JSON-LD Structured Data',
    description: 'Generate free JSON-LD schema markup for Articles, FAQs, Products, Breadcrumbs & more. Copy-paste ready code that boosts Google rich results. No signup.',
    url: 'https://smdevs.in/tools/seo/schema-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
