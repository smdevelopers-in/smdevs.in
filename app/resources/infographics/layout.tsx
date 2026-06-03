import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SEO Infographics Hub | Visual Guides & Flowcharts',
  description: 'Download free SEO infographics, digital marketing flowcharts, technical SEO checklists, and visual guides. Perfect for bloggers, marketers, SEO professionals, and business owners.',
  alternates: {
    canonical: 'https://smdevs.in/resources/infographics',
  },
  openGraph: {
    title: 'Free SEO Infographics Hub | SM Developers',
    description: 'Download free SEO infographics, digital marketing flowcharts, and visual guides to boost your rankings and grow your audience.',
    url: 'https://smdevs.in/resources/infographics',
    type: 'website',
    images: [{ url: 'https://smdevs.in/icon.png', width: 1200, height: 630, alt: 'SM Developers SEO Infographics Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Infographics Hub | SM Developers',
    description: 'Download free SEO infographics, digital marketing flowcharts, and visual guides.',
  },
};

export default function InfographicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
