// src/app/(landing)/pricing/page.tsx
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaSection } from "@/components/landing/CtaSection"; // Kita bisa gunakan kembali CTA section!

export default function PricingPage() {
  return (
    <>
      {/* Kita beri sedikit padding atas untuk mengimbangi Navbar yang fixed */}
      <div className="pt-20">
        <PricingSection />
        <CtaSection />
      </div>
    </>
  );
}
