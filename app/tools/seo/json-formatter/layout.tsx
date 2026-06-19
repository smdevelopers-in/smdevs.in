import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator — Beautify JSON Online',
  description: 'Format, validate and beautify JSON data online for free. Instantly detect syntax errors, pretty-print output, and convert minified JSON. No installation required.',
  alternates: {
    canonical: 'https://smdevs.in/tools/seo/json-formatter'
  },
  openGraph: {
    title: 'Free JSON Formatter & Validator — Beautify JSON Online',
    description: 'Format, validate and beautify JSON data online for free. Instantly detect syntax errors, pretty-print output, and convert minified JSON. No installation required.',
    url: 'https://smdevs.in/tools/seo/json-formatter',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
