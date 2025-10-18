// src/app/(landing)/page.tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
// Impor komponen section lainnya di sini jika Anda sudah membuatnya
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CtaSection } from '@/components/landing/CtaSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <CtaSection />
    </>
  );
}
