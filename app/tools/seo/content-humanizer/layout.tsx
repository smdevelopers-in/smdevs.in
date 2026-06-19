import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Content Humanizer — Make AI Text Sound Human',
  description: 'Transform robotic AI-generated text into natural, human-sounding content for free. Improve readability, tone and engagement. Paste content and humanize instantly.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/content-humanizer'
  },
  openGraph: {
    title: 'Free Content Humanizer — Make AI Text Sound Human',
    description: 'Transform robotic AI-generated text into natural, human-sounding content for free. Improve readability, tone and engagement. Paste content and humanize instantly.',
    url: 'https://smdevs.in/tools/seo/content-humanizer',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
