import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meta Tag Generator',
  description: 'Create SEO-optimized meta tags for your website. Preview how your site will look on Google and ensure your titles and descriptions are the perfect length.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/meta-tag-generator'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
