import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free XML Sitemap Generator — Create & Download Instantly',
  description: 'Generate a valid XML sitemap from your URLs for free. Boost search engine crawling and indexation. Paste URLs and download a production-ready sitemap.xml.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/sitemap-generator'
  },
  openGraph: {
    title: 'Free XML Sitemap Generator — Create & Download Instantly',
    description: 'Generate a valid XML sitemap from your URLs for free. Boost search engine crawling and indexation. Paste URLs and download a production-ready sitemap.xml.',
    url: 'https://smdevs.in/tools/seo/sitemap-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
