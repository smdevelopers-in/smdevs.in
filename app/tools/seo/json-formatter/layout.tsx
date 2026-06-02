import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter',
  description: 'Clean up and validate your raw JSON data. Turn messy code into a beautiful, human-readable format instantly.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/json-formatter'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
