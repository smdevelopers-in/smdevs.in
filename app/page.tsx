import { Metadata } from 'next';
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Categories from "@/components/sections/Categories";
import FeaturedTools from "@/components/sections/FeaturedTools";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItHelps from "@/components/sections/HowItHelps";
import SEOContentSection from "@/components/sections/SEOContentSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: 'SM Developers — Free SEO & Trading Tools Online',
  description: 'SM Developers offers 20+ free professional tools: SEO analyzers, keyword checkers, schema validators, trading calculators & more. No signup. Instant results.',
  alternates: {
    canonical: 'https://smdevs.in'
  },
  openGraph: {
    title: 'SM Developers — Free SEO & Trading Tools Online',
    description: 'SM Developers offers 20+ free professional tools: SEO analyzers, keyword checkers, schema validators, trading calculators & more. No signup. Instant results.',
    url: 'https://smdevs.in',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SM Developers",
  "url": "https://smdevs.in",
  "logo": "https://smdevs.in/icon.png",
  "description": "SM Developers is a free, professional-grade SaaS utilities platform offering 18+ SEO tools and trading calculators — no signup required.",
  "sameAs": [
    "https://twitter.com/smdevelopers",
    "https://github.com/smdevelopers"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://smdevs.in/contact"
  }
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are the SEO tools on SM Developers free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all our SEO and trading tools are 100% free to use and don't require any subscription."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are the trading calculators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our trading calculators use professional-grade formulas and are tested for 100% mathematical accuracy."
      }
    }
  ]
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero />
      <WhatWeDo />
      <Categories />
      <FeaturedTools />
      <WhyChooseUs />
      <HowItHelps />
      <SEOContentSection />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
    </div>
  );
}
