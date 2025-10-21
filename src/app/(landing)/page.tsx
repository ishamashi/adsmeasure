// src/app/(landing)/page.tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"; // <-- 1. Impor
import { CtaSection } from "@/components/landing/CtaSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real-Time Crowd & Traffic Analytics for OOH", // Ini akan menjadi '%s'
  description: "Measure the real impact of your billboards. Get accurate, real-time traffic counting and crowd analytics from UrbanCounting to optimize your OOH advertising ROI.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
