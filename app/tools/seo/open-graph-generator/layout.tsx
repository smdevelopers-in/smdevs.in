import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Graph Generator',
  description: 'Control how your content appears when shared on social media like Facebook, Twitter, and LinkedIn.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/open-graph-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
