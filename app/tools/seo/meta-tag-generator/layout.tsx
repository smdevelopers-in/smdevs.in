import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Meta Tag Generator — Create SEO-Optimized Tags',
  description: 'Generate perfect title tags and meta descriptions for SEO instantly. Preview how your page looks in Google SERP. Free, no login, character limits enforced.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/meta-tag-generator'
  },
  openGraph: {
    title: 'Free Meta Tag Generator — Create SEO-Optimized Tags',
    description: 'Generate perfect title tags and meta descriptions for SEO instantly. Preview how your page looks in Google SERP. Free, no login, character limits enforced.',
    url: 'https://smdevs.in/tools/seo/meta-tag-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
