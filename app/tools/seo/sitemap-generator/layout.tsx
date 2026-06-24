import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XML Sitemap Generator — Create & Download Free Sitemap',
  description: 'Generate an XML sitemap for any website in seconds. Download, copy, or submit directly to Google Search Console. Free, no signup, works on any site.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/sitemap-generator'
  },
  openGraph: {
    title: 'XML Sitemap Generator — Create & Download Free Sitemap',
    description: 'Generate an XML sitemap for any website in seconds. Download, copy, or submit directly to Google Search Console. Free, no signup, works on any site.',
    url: 'https://smdevs.in/tools/seo/sitemap-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
