import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SM Developers — Get Support & Partnership Inquiries',
  description: 'Reach out to SM Developers for tool support, partnership opportunities, or feedback. Average response time under 2 hours. We\'re here to help.',
  alternates: {
    canonical: 'https://smdevs.in/contact'
  },
  openGraph: {
    title: 'Contact SM Developers — Get Support & Partnership Inquiries',
    description: 'Reach out to SM Developers for tool support, partnership opportunities, or feedback. Average response time under 2 hours.',
    url: 'https://smdevs.in/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SM Developers',
    description: 'Reach out for tool support, partnership opportunities, or feedback.',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
