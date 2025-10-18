// src/components/marketing/PricingSection.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const pricingPlans = [
  {
    name: "Starter",
    priceMonthly: "Free",
    priceYearly: "Free",
    description: "Untuk individu dan tim kecil yang baru memulai.",
    features: ["1 Lokasi", "Analisis Lalu Lintas Dasar", "Laporan Mingguan", "Dukungan Email"],
    isPopular: false,
  },
  {
    name: "Pro",
    priceMonthly: "$49",
    priceYearly: "$490",
    description: "Untuk bisnis yang sedang berkembang dan membutuhkan data lebih detail.",
    features: ["Hingga 10 Lokasi", "Analisis Lalu Lintas Lanjutan", "Analisis Demografi", "Ekspor Data CSV", "Dukungan Prioritas"],
    isPopular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description: "Solusi lengkap untuk perusahaan besar dengan kebutuhan spesifik.",
    features: ["Lokasi Tanpa Batas", "Akses API", "Dashboard Kustom", "Manajer Akun Khusus", "SLA"],
    isPopular: false,
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">Harga yang Sesuai Dengan Skala Anda</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Pilih paket yang paling sesuai dengan kebutuhan Anda. Mulai gratis, tingkatkan seiring pertumbuhan Anda.</p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span>Bulanan</span>
          <button onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")} className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900">
            <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out", billingCycle === "yearly" ? "translate-x-5" : "translate-x-0")} />
          </button>
          <span className="flex items-center gap-2">
            Tahunan{" "}
            <Badge variant="secondary" className="bg-green-200 text-green-800">
              Hemat 2 Bulan
            </Badge>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={cn("bg-slate-800/50 border-slate-700 text-white flex flex-col h-full", plan.isPopular && "border-primary shadow-glow")}>
              <CardHeader>
                {plan.isPopular && <Badge className="absolute -top-3 left-6 bg-gradient-brand border-none">Most Popular</Badge>}
                <CardTitle className="font-display">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly}</span>
                  {plan.name !== "Starter" && plan.priceMonthly !== "Custom" && <span className="text-slate-400">/ {billingCycle === "monthly" ? "bulan" : "tahun"}</span>}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={cn("w-full", plan.isPopular ? "bg-gradient-brand hover:shadow-glow" : "bg-slate-600 hover:bg-slate-500")}>{plan.name === "Enterprise" ? "Hubungi Kami" : "Pilih Paket"}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
