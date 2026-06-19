import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intrinsic Value Calculator for Stocks – Fair Value & Margin of Safety',
  description: 'Estimate fair value of any stock using earnings growth assumptions and margin of safety analysis. Free DCF-based intrinsic value calculator for investors.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/intrinsic-value'
  },
  openGraph: {
    title: 'Intrinsic Value Calculator for Stocks – Fair Value & Margin of Safety',
    description: 'Estimate fair value of any stock using earnings growth assumptions and margin of safety analysis.',
    url: 'https://smdevs.in/tools/trading/intrinsic-value',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intrinsic Value Calculator for Stocks',
    description: 'Estimate fair value using earnings growth and margin of safety. Free DCF-based calculator.',
  }
};

export default function IntrinsicValueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
