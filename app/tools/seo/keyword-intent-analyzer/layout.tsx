import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Intent Analyzer — Check Search Intent Free',
  description: 'Instantly detect keyword search intent: informational, navigational, commercial, or transactional. Free keyword intent checker — no signup required.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-intent-analyzer'
  },
  openGraph: {
    title: 'Keyword Intent Analyzer — Check Search Intent Free',
    description: 'Instantly detect keyword search intent: informational, navigational, commercial, or transactional. Free keyword intent checker — no signup required.',
    url: 'https://smdevs.in/tools/seo/keyword-intent-analyzer',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
