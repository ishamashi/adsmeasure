// src/app/(landing)/features/page.tsx
import { FeaturesHero } from "@/components/landing/FeaturesHero";
import { CtaSection } from "@/components/landing/CtaSection";
import { features } from "@/lib/featureData";
import { FeatureCard } from "@/components/landing/FeatureCard";

export default function FeaturesPage() {
  return (
    <div className="bg-slate-950 text-white">
      <FeaturesHero />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
