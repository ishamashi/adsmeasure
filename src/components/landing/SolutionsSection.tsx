// src/components/marketing/SolutionsSection.tsx
"use client";

import { useState } from "react";
import { Eye, Users, TrendingUp, Check } from "lucide-react";

// Anda bisa memindahkan data ini ke file lain jika sudah kompleks
const solutionCards = [
  {
    icon: <Eye className="w-6 h-6 text-blue-400" />,
    iconBg: "bg-blue-500/10",
    hoverBorder: "hover:border-blue-500/50",
    title: "Traffic Counting",
    description: "Hitung kendaraan dan pejalan kaki yang melewati lokasi billboard dengan akurasi tinggi.",
    features: ["Vehicle & pedestrian detection", "Direction tracking", "Speed estimation"],
  },
  {
    icon: <Users className="w-6 h-6 text-cyan-400" />,
    iconBg: "bg-cyan-500/10",
    hoverBorder: "hover:border-cyan-500/50",
    title: "Crowd Analytics",
    description: "Analisis kepadatan dan demografi crowd di area strategis Anda.",
    features: ["Real-time density mapping", "Age & gender estimation", "Dwell time analysis"],
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
    iconBg: "bg-purple-500/10",
    hoverBorder: "hover:border-purple-500/50",
    title: "ROI Analytics",
    description: "Ukur efektivitas campaign dengan data real dan actionable insights.",
    features: ["Impression metrics", "Peak hours analysis", "Campaign comparison"],
  },
];

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("billboard");

  return (
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
          {solutionCards.map((card, index) => (
            <div key={index} className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 ${card.hoverBorder} transition`}>
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-4`}>{card.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-slate-400 mb-4">{card.description}</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
