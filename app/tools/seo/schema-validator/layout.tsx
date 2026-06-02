import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Validator',
  description: 'Validate and identify your structured data schema easily. Ensure your JSON-LD implementation is perfect for search engines.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/schema-validator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
