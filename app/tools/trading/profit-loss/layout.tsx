import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Profit & Loss Calculator — Calculate P&L Instantly',
  description: 'Calculate your exact profit or loss on any trade instantly. Enter buy price, sell price and quantity to get net P&L. Free for stocks, forex and crypto traders.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/profit-loss'
  },
  openGraph: {
    title: 'Free Profit & Loss Calculator — Calculate P&L Instantly',
    description: 'Calculate your exact profit or loss on any trade instantly. Enter buy price, sell price and quantity to get net P&L. Free for stocks, forex and crypto traders.',
    url: 'https://smdevs.in/tools/trading/profit-loss',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
