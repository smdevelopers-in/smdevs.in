import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Position Size Calculator — Risk Management Tool',
  description: 'Calculate the ideal position size for any trade based on your account size and risk percentage. Free position sizing calculator for forex, crypto and stocks.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/position-size'
  },
  openGraph: {
    title: 'Free Position Size Calculator — Risk Management Tool',
    description: 'Calculate the ideal position size for any trade based on your account size and risk percentage. Free position sizing calculator for forex, crypto and stocks.',
    url: 'https://smdevs.in/tools/trading/position-size',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
