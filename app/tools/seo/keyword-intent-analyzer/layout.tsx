import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Intent Analyzer — Detect Search Intent',
  description: 'Instantly classify any keyword as informational, navigational, commercial or transactional. Free keyword intent analyzer to match content to user search intent.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-intent-analyzer'
  },
  openGraph: {
    title: 'Free Keyword Intent Analyzer — Detect Search Intent',
    description: 'Instantly classify any keyword as informational, navigational, commercial or transactional. Free keyword intent analyzer to match content to user search intent.',
    url: 'https://smdevs.in/tools/seo/keyword-intent-analyzer',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
