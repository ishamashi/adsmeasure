// src/components/marketing/FeaturesSection.tsx
import {   Clock, MapPin, BarChart3, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Kenapa Pilih adsMeasure?</h2>
          <p className="text-slate-400 text-lg">Teknologi terdepan untuk measurement yang akurat</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/50 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Data</h3>
            <p className="text-sm text-slate-400">Update data setiap detik untuk keputusan cepat</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/50 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Multi-location</h3>
            <p className="text-sm text-slate-400">Kelola ratusan lokasi dalam satu dashboard</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/50 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-slate-400">Insights mendalam dengan AI & machine learning</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/50 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">ROI Tracking</h3>
            <p className="text-sm text-slate-400">Buktikan efektivitas setiap rupiah iklan Anda</p>
          </div>
        </div>
      </div>
    </section>
  );
}
