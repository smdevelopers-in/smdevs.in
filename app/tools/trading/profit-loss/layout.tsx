import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profit/Loss Calculator',
  description: 'Calculate your net gains or losses instantly. Account for quantity and price movement to track your P&L accurately.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/profit-loss'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
