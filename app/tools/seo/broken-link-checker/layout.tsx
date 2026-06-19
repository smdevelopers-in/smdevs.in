import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Broken Link Checker — Find 404 Errors on Any Page',
  description: 'Scan any webpage for broken links and 404 errors for free. Fix dead links to improve user experience and SEO rankings. Instant broken link detection tool.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/broken-link-checker'
  },
  openGraph: {
    title: 'Free Broken Link Checker — Find 404 Errors on Any Page',
    description: 'Scan any webpage for broken links and 404 errors for free. Fix dead links to improve user experience and SEO rankings. Instant broken link detection tool.',
    url: 'https://smdevs.in/tools/seo/broken-link-checker',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
