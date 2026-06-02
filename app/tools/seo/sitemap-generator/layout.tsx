import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap Generator',
  description: 'Create a clean XML sitemap to help search engines index your website more efficiently. Simply paste your URLs and get a production-ready sitemap.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/sitemap-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
