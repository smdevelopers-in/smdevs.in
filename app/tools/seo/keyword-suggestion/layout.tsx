import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyword Suggestion Tool',
  description: 'Generate hundreds of long-tail, question-based, and comparison keywords to fuel your content strategy.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/keyword-suggestion'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
