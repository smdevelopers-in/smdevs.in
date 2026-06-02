import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERP Preview',
  description: 'See exactly how your website will appear in Google search results. Optimize your titles and snippets to increase your click-through rate (CTR).',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/serp-preview'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
