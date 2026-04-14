import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalInteractions from "@/components/ui/GlobalInteractions";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://smdevs.in'),
  alternates: {
    canonical: './',
  },
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
    url: "https://smdevs.in",
    siteName: "SM Developers",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SM Developers",
    description: "Professional tools for developers, traders, and creators.",
    creator: "@sm_developers",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "UPgypRsBjhL-EVs2vv9VWyK-0Kn7bOK8Jct-m_xqBik",
    other: {
      "msvalidate.01": "0E2EED49639E0B4E3EACC600AD56AC6C",
    },
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
        className={`${poppins.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-grow pt-18 lg:pt-32 bg-white dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SBE50TJMJT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SBE50TJMJT');
          `}
        </Script>
      </body>
    </html>
  );
}

