import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Stock Analyzer Tool – Analyze Stocks Instantly',
  description: 'Analyze stocks with valuation metrics, technical indicators, support and resistance levels, and beginner-friendly explanations. Free, instant, no sign-up.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/stock-analyzer'
  },
  openGraph: {
    title: 'Free Stock Analyzer Tool – Analyze Stocks Instantly',
    description: 'Analyze stocks with valuation metrics, technical indicators, support and resistance levels, and beginner-friendly explanations.',
    url: 'https://smdevs.in/tools/trading/stock-analyzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Stock Analyzer Tool – Analyze Stocks Instantly',
    description: 'Analyze stocks with valuation metrics, technical indicators, support and resistance levels, and beginner-friendly explanations.',
  }
};

export default function StockAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
