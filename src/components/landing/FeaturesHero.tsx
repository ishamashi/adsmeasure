// src/components/marketing/FeaturesHero.tsx
export function FeaturesHero() {
  return (
    <section className="pt-32 bg-slate-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6">Kemampuan Platform</div>
        <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 leading-tight">
          Dibangun untuk <span className="text-gradient">Presisi & Skala</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">Jelajahi setiap kemampuan yang menjadikan adsMeasure sebagai platform terdepan untuk analitik OOH, dari pengumpulan data real-time hingga pelaporan ROI yang mendalam.</p>
      </div>
    </section>
  );
}
