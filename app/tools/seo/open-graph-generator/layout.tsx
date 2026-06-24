import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Graph Tag Generator — Optimize Social Previews',
  description: 'Generate Open Graph tags for Facebook, Twitter & LinkedIn. Control how your page looks when shared on social media. Free OG tag generator, no signup.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/open-graph-generator'
  },
  openGraph: {
    title: 'Open Graph Tag Generator — Optimize Social Previews',
    description: 'Generate Open Graph tags for Facebook, Twitter & LinkedIn. Control how your page looks when shared on social media. Free OG tag generator, no signup.',
    url: 'https://smdevs.in/tools/seo/open-graph-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
