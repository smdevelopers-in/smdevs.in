import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Risk Reward Calculator — Ratio & R-Multiple Tool',
  description: 'Calculate your risk/reward ratio and R-multiple for any trade. Enter entry, stop-loss, and target to see trade profitability expectations. Free, instant.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/risk-reward'
  },
  openGraph: {
    title: 'Free Risk Reward Calculator — Ratio & R-Multiple Tool',
    description: 'Calculate your risk/reward ratio and R-multiple for any trade. Enter entry, stop-loss, and target to see trade profitability expectations. Free, instant.',
    url: 'https://smdevs.in/tools/trading/risk-reward',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
