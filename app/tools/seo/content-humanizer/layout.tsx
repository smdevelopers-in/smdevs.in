import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Humanizer',
  description: 'Transform dry or robotic text into engaging, human-like content using linguistic variation and tone-specific synonym mapping.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/content-humanizer'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
