import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Reward Calculator',
  description: 'Calculate the mathematical expectancy of your trades. Aim for higher rewards than risks to stay profitable in the long run.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/risk-reward'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
