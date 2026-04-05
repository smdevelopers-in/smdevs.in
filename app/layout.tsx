import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalInteractions from "@/components/ui/GlobalInteractions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "SM Developers | Professional SaaS Utilities Platform",
    template: "%s | SM Developers"
  },
  description: "Accelerate your workflow with SM Developers. A high-performance suite of SEO, Trading, and Content intelligence tools designed for modern professionals.",
  keywords: ["SEO tools", "Trading calculators", "AI content detector", "SM Developers", "SaaS utilities"],
  authors: [{ name: "SM Developers Team" }],
  creator: "SM Developers",
  publisher: "SM Developers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SM Developers | Professional SaaS Utilities Platform",
    description: "High-performance suite of SEO, Trading, and Content intelligence tools.",
    type: "website",
    url: "https://smdevelopers.xyz", // Updated placeholder
    siteName: "SM Developers",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SM Developers",
    description: "Professional tools for developers, traders, and creators.",
    creator: "@sm_developers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-grow pt-24 lg:pt-32 bg-white dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
      </body>
    </html>
  );
}
