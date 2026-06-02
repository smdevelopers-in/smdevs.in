import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robots.txt Generator',
  description: 'Create a custom robots.txt file to guide search engine crawlers. Control which parts of your site should be indexed and provide a link to your sitemap.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/robots-txt-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
