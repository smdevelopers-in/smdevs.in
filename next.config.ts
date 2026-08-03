import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fix: /resources/tools/trading/* → /tools/trading/*
      {
        source: "/resources/tools/trading/break-even",
        destination: "/tools/trading/break-even",
        permanent: true,
      },
      {
        source: "/resources/tools/trading/position-size",
        destination: "/tools/trading/position-size",
        permanent: true,
      },
      {
        source: "/resources/tools/trading/profit-loss",
        destination: "/tools/trading/profit-loss",
        permanent: true,
      },
      {
        source: "/resources/tools/trading/risk-reward",
        destination: "/tools/trading/risk-reward",
        permanent: true,
      },
      // Fix: wrong pivot-points slug → correct pivot-calculator
      {
        source: "/tools/trading/pivot-points",
        destination: "/tools/trading/pivot-calculator",
        permanent: true,
      },
      // Fix: wrong analyze-seo slug → correct seo-structure-analyzer
      {
        source: "/tools/seo/analyze-seo",
        destination: "/tools/seo/seo-structure-analyzer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
