import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Volume Estimator',
  description: 'Get heuristic estimates of search volume and ranking difficulty using our automated pattern-matching engine.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-volume-estimator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
