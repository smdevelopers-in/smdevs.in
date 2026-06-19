import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Suggestion Tool — Generate Long-Tail Ideas',
  description: 'Generate hundreds of free keyword ideas including long-tail, question-based and comparison keywords. Expand your content strategy with instant keyword suggestions.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-suggestion'
  },
  openGraph: {
    title: 'Free Keyword Suggestion Tool — Generate Long-Tail Ideas',
    description: 'Generate hundreds of free keyword ideas including long-tail, question-based and comparison keywords. Expand your content strategy with instant keyword suggestions.',
    url: 'https://smdevs.in/tools/seo/keyword-suggestion',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
