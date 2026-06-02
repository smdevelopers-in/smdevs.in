import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authority Score',
  description: 'Estimate any website\'s authority based on content depth, technical health, and internal linking structure.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/authority-score'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
