import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SIP Calculator with Step-Up — Returns & Corpus',
  description: 'Calculate SIP returns with step-up (top-up) option. See year-by-year corpus growth, total invested, estimated returns, and maturity value. Free, instant, no signup.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/sip-calculator'
  },
  openGraph: {
    title: 'Free SIP Calculator with Step-Up — Returns & Corpus',
    description: 'Calculate SIP returns with step-up (top-up) option. See year-by-year corpus growth, total invested, estimated returns, and maturity value. Free, instant, no signup.',
    url: 'https://smdevs.in/tools/trading/sip-calculator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
