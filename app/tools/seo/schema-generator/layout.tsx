import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Generator',
  description: 'Easily generate JSON-LD structured data for your website. Select a type, fill in the details, and get your schema instantly.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
