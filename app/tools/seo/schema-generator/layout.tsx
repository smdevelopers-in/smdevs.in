import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Schema Generator — Generate JSON-LD Structured Data',
  description: 'Create JSON-LD schema markup for articles, products, FAQs, local businesses and more. Free schema generator to unlock Google rich results. Copy and paste ready.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-generator'
  },
  openGraph: {
    title: 'Free Schema Generator — Generate JSON-LD Structured Data',
    description: 'Create JSON-LD schema markup for articles, products, FAQs, local businesses and more. Free schema generator to unlock Google rich results. Copy and paste ready.',
    url: 'https://smdevs.in/tools/seo/schema-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
