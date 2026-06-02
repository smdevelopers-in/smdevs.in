import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Link Profile Analyzer',
  description: 'Deconstruct any webpage\'s link profile. Map internal architecture and discover outgoing external connections.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/link-profile-analyzer'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
