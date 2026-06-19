import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Content Detector — Check if Text Is AI-Written',
  description: 'Instantly detect AI-generated content with our free AI content detector. Analyzes GPT, Claude & Gemini patterns. No signup needed — paste and check in seconds.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/ai-content-detector'
  },
  openGraph: {
    title: 'Free AI Content Detector — Check if Text Is AI-Written',
    description: 'Instantly detect AI-generated content with our free AI content detector. Analyzes GPT, Claude & Gemini patterns. No signup needed — paste and check in seconds.',
    url: 'https://smdevs.in/tools/seo/ai-content-detector',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
