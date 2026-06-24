import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meta Title & Description Generator — SEO Tags Free',
  description: 'Create perfect meta titles and meta descriptions for any page. Preview your Google SERP snippet before publishing. Free, instant, no signup required.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/meta-tag-generator'
  },
  openGraph: {
    title: 'Meta Title & Description Generator — SEO Tags Free',
    description: 'Create perfect meta titles and meta descriptions for any page. Preview your Google SERP snippet before publishing. Free, instant, no signup required.',
    url: 'https://smdevs.in/tools/seo/meta-tag-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
