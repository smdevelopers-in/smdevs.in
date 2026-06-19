import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SERP Preview Tool — See Your Google Snippet Live',
  description: 'Preview how your page title, URL and description appear in Google search results for free. Optimize click-through rate before publishing. Instant SERP simulation.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/serp-preview'
  },
  openGraph: {
    title: 'Free SERP Preview Tool — See Your Google Snippet Live',
    description: 'Preview how your page title, URL and description appear in Google search results for free. Optimize click-through rate before publishing. Instant SERP simulation.',
    url: 'https://smdevs.in/tools/seo/serp-preview',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
