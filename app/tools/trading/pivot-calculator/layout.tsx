import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pivot Calculator',
  description: 'Professional-grade pivot point generator using multiple calculation methodologies for precision market level analysis.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/pivot-calculator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
