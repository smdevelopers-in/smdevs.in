import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Break-Even Calculator for Traders — Find Your Price',
  description: 'Calculate your break-even price for any trade after spreads, commissions and fees. Free trading break-even calculator for forex, stocks and crypto. Instant results.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/break-even'
  },
  openGraph: {
    title: 'Free Break-Even Calculator for Traders — Find Your Price',
    description: 'Calculate your break-even price for any trade after spreads, commissions and fees. Free trading break-even calculator for forex, stocks and crypto. Instant results.',
    url: 'https://smdevs.in/tools/trading/break-even',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
