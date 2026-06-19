import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Link Profile Analyzer — Map Internal & External Links',
  description: 'Analyze any webpage\'s full link profile for free. Discover all internal and external links, detect broken links, and map your site architecture instantly.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/link-profile-analyzer'
  },
  openGraph: {
    title: 'Free Link Profile Analyzer — Map Internal & External Links',
    description: 'Analyze any webpage\'s full link profile for free. Discover all internal and external links, detect broken links, and map your site architecture instantly.',
    url: 'https://smdevs.in/tools/seo/link-profile-analyzer',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
