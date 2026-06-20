import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Trading App — Mobile Stock & Crypto Calculator',
  description: 'Download our free trading calculator mobile app for Android. Get position sizing, risk/reward ratios, and pivot point calculators on your phone. No subscription.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading-app'
  },
  openGraph: {
    title: 'Free Trading App — Mobile Stock & Crypto Calculator',
    description: 'Download our free trading calculator mobile app for Android. Position sizing, risk/reward, and pivot calculators in your pocket.',
    url: 'https://smdevs.in/tools/trading-app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Trading App — Mobile Stock & Crypto Calculator',
    description: 'Free Android trading calculator app. Position sizing, risk/reward, pivot points. No subscription required.',
  }
};

export default function TradingAppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
