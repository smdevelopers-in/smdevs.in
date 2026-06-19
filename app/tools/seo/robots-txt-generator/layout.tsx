import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Robots.txt Generator — Create & Test in Seconds',
  description: 'Generate a custom robots.txt file to control search engine crawlers. Block or allow specific bots and folders. Preview and download instantly. 100% free.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/robots-txt-generator'
  },
  openGraph: {
    title: 'Free Robots.txt Generator — Create & Test in Seconds',
    description: 'Generate a custom robots.txt file to control search engine crawlers. Block or allow specific bots and folders. Preview and download instantly. 100% free.',
    url: 'https://smdevs.in/tools/seo/robots-txt-generator',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
