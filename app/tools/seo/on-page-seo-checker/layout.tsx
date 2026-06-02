import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'On-Page SEO Checker',
  description: 'Quickly analyze any webpage\'s on-page SEO factors like titles, meta descriptions, and heading structure.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/on-page-seo-checker'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
