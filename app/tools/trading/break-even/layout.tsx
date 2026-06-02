import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Break-even Calculator',
  description: 'Identify the exact price point where your trade covers all costs, including spreads and commissions, before it becomes profitable.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/break-even'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
