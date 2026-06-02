import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broken Link Checker',
  description: 'Scan your webpage for broken links (404s). Improve your site\'s SEO and user experience by identifying and fixing dead ends.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/broken-link-checker'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
