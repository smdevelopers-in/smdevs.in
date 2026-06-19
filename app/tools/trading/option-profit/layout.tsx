import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Options Profit Calculator – Calls and Puts Payoff Calculator',
  description: 'Calculate option profit, loss, breakeven, ROI, and payoff instantly for call and put options. Free options profit calculator with interactive payoff diagram.',
  alternates: {
    canonical: 'https://smdevs.in/tools/trading/option-profit'
  },
  openGraph: {
    title: 'Options Profit Calculator – Calls and Puts Payoff Calculator',
    description: 'Calculate option profit, loss, breakeven, ROI, and payoff instantly for call and put options.',
    url: 'https://smdevs.in/tools/trading/option-profit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Options Profit Calculator – Calls and Puts',
    description: 'Calculate option profit, loss, breakeven and ROI for calls and puts. Free with payoff chart.',
  }
};

export default function OptionProfitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
