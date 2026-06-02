import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Content Detector',
  description: 'Analyze linguistic patterns, sentence \'burstiness\', and vocabulary diversity to detect AI-generated content.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/ai-content-detector'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
