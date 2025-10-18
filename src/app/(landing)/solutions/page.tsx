// src/app/(landing)/solutions/page.tsx
import { SolutionsHero } from "@/components/landing/SolutionsHero";
import { SolutionDetail } from "@/components/landing/SolutionDetail";
import { CtaSection } from "@/components/landing/CtaSection";
import { solutions } from "@/lib/solutionData"; // Impor data kita

export default function SolutionsPage() {
  return (
    <div className="bg-slate-950 text-white">
      <SolutionsHero />

      {/* Kita akan memetakan data solusi dan merender komponen detail untuk masing-masing */}
      <div className="divide-y divide-slate-800">
        {solutions.map((solution, index) => (
          <SolutionDetail
            key={solution.title}
            title={solution.title}
            description={solution.description}
            features={solution.features}
            imageUrl={solution.imageUrl}
            // Logika sederhana untuk membolak-balik posisi gambar
            imageSide={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      <CtaSection />
    </div>
  );
}
