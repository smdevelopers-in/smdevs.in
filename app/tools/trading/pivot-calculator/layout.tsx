import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Pivot Point Calculator — Support & Resistance Levels',
  description: 'Calculate pivot points, support and resistance levels for any trading session. Choose from Standard, Fibonacci, Woodie & Camarilla methods. Free and instant.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/pivot-calculator'
  },
  openGraph: {
    title: 'Free Pivot Point Calculator — Support & Resistance Levels',
    description: 'Calculate pivot points, support and resistance levels for any trading session. Choose from Standard, Fibonacci, Woodie & Camarilla methods. Free and instant.',
    url: 'https://smdevs.in/tools/trading/pivot-calculator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
