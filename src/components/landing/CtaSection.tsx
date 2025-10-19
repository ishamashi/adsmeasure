// src/components/landing/CtaSection.tsx
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Siap Mengukur Impact Iklan Anda?</h2>
          <p className="text-xl text-slate-400 mb-8">Mulai trial gratis 7 hari.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-brand font-semibold hover:shadow-glow">
              Start Free Trial
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-dark hover:bg-slate-200 font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
