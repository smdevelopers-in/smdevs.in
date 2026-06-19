import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Volume Estimator — Estimate Search Volume',
  description: 'Get estimated monthly search volume and keyword difficulty for any keyword, free. Prioritize keywords with the best SEO potential for your content strategy.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-volume-estimator'
  },
  openGraph: {
    title: 'Free Keyword Volume Estimator — Estimate Search Volume',
    description: 'Get estimated monthly search volume and keyword difficulty for any keyword, free. Prioritize keywords with the best SEO potential for your content strategy.',
    url: 'https://smdevs.in/tools/seo/keyword-volume-estimator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
