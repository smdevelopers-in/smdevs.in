import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Intent Analyzer Free Tool',
  description: 'Instantly uncover the underlying search intent of any keyword with our advanced heuristic scoring engine. Drive higher conversions by matching intent.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-intent-analyzer'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
