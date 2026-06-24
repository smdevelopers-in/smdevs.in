import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERP Preview Tool — See Your Google Snippet Live',
  description: 'Preview exactly how your page appears in Google search results. Test meta titles, descriptions, and rich snippets before you publish. Free SERP simulator.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/serp-preview'
  },
  openGraph: {
    title: 'SERP Preview Tool — See Your Google Snippet Live',
    description: 'Preview exactly how your page appears in Google search results. Test meta titles, descriptions, and rich snippets before you publish. Free SERP simulator.',
    url: 'https://smdevs.in/tools/seo/serp-preview',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
