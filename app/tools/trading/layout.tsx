import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Trading Calculators — Position Size, Risk & P&L',
  description: 'Free trading calculators for position sizing, risk/reward ratio, profit & loss, break-even price & pivot points. Professional-grade tools for every trader.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading'
  },
  openGraph: {
    title: 'Free Trading Calculators — Position Size, Risk & P&L',
    description: 'Free trading calculators for position sizing, risk/reward ratio, profit & loss, break-even price & pivot points. Professional-grade tools for every trader.',
    url: 'https://smdevs.in/tools/trading',
  }
};

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
