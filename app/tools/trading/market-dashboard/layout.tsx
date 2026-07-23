import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Market Dashboard — Indian & Global Markets Daily Overview',
  description: 'Track Nifty 50, Bank Nifty, Gift Nifty, Dow Jones, Gold, Crude Oil, Currency trends and daily Market Sentiment in one free premium dashboard. Updated every 5 minutes.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/market-dashboard',
  },
  openGraph: {
    title: 'Free Market Dashboard — Indian & Global Markets Daily Overview | SM Developers',
    description: 'Track Nifty 50, Bank Nifty, Gift Nifty, Dow Jones, Gold, Crude Oil, Currency trends and daily Market Sentiment in one free premium dashboard. Updated every 5 minutes.',
    url: 'https://smdevs.in/tools/trading/market-dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Market Dashboard — Indian & Global Markets',
    description: 'Track Indian & Global Markets, Commodities, Currencies and Market Sentiment in one place. Free and updated every 5 minutes.',
  },
  keywords: [
    'market dashboard', 'nifty 50 today', 'bank nifty', 'gift nifty', 'dow jones today',
    'india vix', 'gold price today', 'crude oil price', 'usdinr', 'market sentiment',
    'indian stock market today', 'global markets', 'morning market analysis',
    'free market overview', 'trading dashboard', 'SM Developers'
  ],
};

export default function MarketDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
