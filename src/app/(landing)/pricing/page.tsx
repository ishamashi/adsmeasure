// src/app/(landing)/pricing/page.tsx
import { DevicePricingSection } from "@/components/landing/DevicePricingSection"; // <-- Impor komponen baru
import { CtaSection } from "@/components/landing/CtaSection";

export default function PricingPage() {
  return (
    <>
      <div className="bg-slate-950">
        <div className="pt-20">
          <DevicePricingSection /> {/* <-- Gunakan komponen baru */}
          <CtaSection />
        </div>
      </div>
    </>
  );
}
