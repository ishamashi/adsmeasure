// src/components/marketing/HeroSection.tsx
"use client"; // <--- TAMBAHKAN BARIS INI
import { ArrowRight, Eye, Play, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button"; // <-- 1. Impor Button baru kita

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">🎯 Data-Driven OOH Advertising</div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Measure Every
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">Billboard Impact</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed">Real-time traffic counting dan crowd analytics untuk Out-of-Home advertising. Dapatkan data akurat tentang eksposur iklan Anda dan optimalkan ROI.</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="group bg-gradient-brand hover:shadow-glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-white">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-400">99.8%</div>
                <div className="text-sm text-slate-500">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">500K+</div>
                <div className="text-sm text-slate-500">Locations Tracked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-slate-500">Real-time Data</div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="space-y-4">
                {/* Mini Chart */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">Today's Traffic</span>
                    <span className="text-green-400 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +24%
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-24">
                    {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 88].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t opacity-80 hover:opacity-100 transition" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">Total Views</span>
                    </div>
                    <div className="text-2xl font-bold">1.2M</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Peak Hour</span>
                    </div>
                    <div className="text-2xl font-bold">8-9 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
