import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO & Trading Blogs — In-Depth Guides & Resources',
  description: 'Browse expert blogs on SEO strategies, trading techniques, technical analysis, content marketing, and more. Free in-depth guides updated regularly by SM Developers.',
  alternates: {
    canonical: 'https://smdevs.in/resources/blogs'
  },
  openGraph: {
    title: 'SEO & Trading Blogs — In-Depth Guides & Resources | SM Developers',
    description: 'Expert guides on SEO, intraday trading, technical analysis, content marketing, and digital growth. Free resources from SM Developers.',
    url: 'https://smdevs.in/resources/blogs',
    siteName: 'SM Developers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO & Trading Blogs | SM Developers',
    description: 'Expert guides on SEO, intraday trading, technical analysis, content marketing, and digital growth.',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
