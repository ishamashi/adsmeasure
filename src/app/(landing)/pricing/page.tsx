// src/app/(landing)/pricing/page.tsx
import { DevicePricingSection } from "@/components/landing/DevicePricingSection"; // <-- Impor komponen baru
import { CtaSection } from "@/components/landing/CtaSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Device & License Pricing",
  description: "Find transparent pricing for UrbanCounting's hardware kits and software licenses. Choose the right solution for your Out-of-Home analytics needs.",
};

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
