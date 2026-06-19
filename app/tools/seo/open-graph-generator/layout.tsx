import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Open Graph Generator — Optimize Social Media Previews',
  description: 'Generate Open Graph meta tags for Facebook, Twitter & LinkedIn. Control your page preview title, image and description when shared on social media. Free.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/open-graph-generator'
  },
  openGraph: {
    title: 'Free Open Graph Generator — Optimize Social Media Previews',
    description: 'Generate Open Graph meta tags for Facebook, Twitter & LinkedIn. Control your page preview title, image and description when shared on social media. Free.',
    url: 'https://smdevs.in/tools/seo/open-graph-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
