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
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://smdevs.in'),
  title: {
    default: "SM Developers — Free SEO & Trading Tools Online",
    template: "%s | SM Developers"
  },
  description: "SM Developers offers 20+ free professional tools: SEO analyzers, keyword checkers, schema validators, trading calculators & more. No signup. Instant results.",
  keywords: ["free SEO tools", "trading calculators", "AI content detector", "keyword density checker", "meta tag generator", "SM Developers"],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-loader" strategy="beforeInteractive">
          {`
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (_) {}
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-grow pt-18 lg:pt-32 bg-white dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
        
        {/* Google Analytics - Deferred to not block main thread CWV */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SBE50TJMJT"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

