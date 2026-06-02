import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Density Checker',
  description: 'Analyze your content to find the most frequent words and their density percentage. Avoid keyword stuffing and optimize for SEO.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-density-checker'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
