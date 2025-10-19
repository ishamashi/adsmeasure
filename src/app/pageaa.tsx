'use client';
import React, { useState } from "react";
import Link from "next/link";
import { BarChart3, MapPin, TrendingUp, Eye, Users, Clock, ArrowRight, Check, Play } from "lucide-react";

export default function AdsMeasureLanding() {
  const [activeTab, setActiveTab] = useState("billboard");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">adsMeasure</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#solutions" className="text-slate-300 hover:text-white transition">
              Solutions
            </Link>
            <Link href="#features" className="text-slate-300 hover:text-white transition">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition">
              Pricing
            </Link>
            <Link href="#contact" className="text-slate-300 hover:text-white transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-white transition">Login</button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition flex items-center gap-2 group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
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

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Solutions untuk Setiap Kebutuhan</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Teknologi counting yang akurat untuk berbagai jenis Out-of-Home advertising</p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setActiveTab("billboard")} className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === "billboard" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
              Billboard
            </button>
            <button onClick={() => setActiveTab("led")} className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === "led" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
              LED Display
            </button>
            <button onClick={() => setActiveTab("retail")} className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === "retail" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
              Retail Location
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Traffic Counting</h3>
              <p className="text-slate-400 mb-4">Hitung kendaraan dan pejalan kaki yang melewati lokasi billboard dengan akurasi tinggi</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Vehicle & pedestrian detection
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Direction tracking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Speed estimation
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crowd Analytics</h3>
              <p className="text-slate-400 mb-4">Analisis kepadatan dan demografi crowd di area strategis Anda</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Real-time density mapping
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Age & gender estimation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Dwell time analysis
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ROI Analytics</h3>
              <p className="text-slate-400 mb-4">Ukur efektivitas campaign dengan data real dan actionable insights</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Impression metrics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Peak hours analysis
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Campaign comparison
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4">Siap Mengukur Impact Iklan Anda?</h2>
            <p className="text-xl text-slate-400 mb-8">Mulai trial gratis 7 hari.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition">Start Free Trial</button>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="font-bold">adsMeasure</span>
              </div>
              <p className="text-sm text-slate-400">Data-driven analytics untuk Out-of-Home advertising</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>support@adsmeasure.com</li>
                <li>+62 812-3456-7890</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 adsMeasure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
