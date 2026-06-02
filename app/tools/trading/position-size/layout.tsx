import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Position Size Calculator',
  description: 'Protect your capital with precise unit calculation. Never risk more than your specified percentage on a single trade.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/position-size'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
