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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SM Developers",
  "url": "https://smdevelopers.io",
  "logo": "https://smdevelopers.io/logo.png",
  "sameAs": [
    "https://twitter.com/smdevelopers",
    "https://github.com/smdevelopers"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-000-000-0000",
    "contactType": "customer service"
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
