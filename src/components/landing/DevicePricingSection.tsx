// src/components/marketing/DevicePricingSection.tsx
"use client";

import { useState } from "react";
import { Check, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { deviceOptions } from "@/lib/pricingData"; // Impor data baru kita

export function DevicePricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-20 px-6 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">Pilih Perangkat yang Tepat</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Setiap perangkat dirancang untuk kebutuhan spesifik, dipadukan dengan lisensi platform kami yang powerful.</p>
        </div>

        {/* Billing Cycle Toggle untuk Lisensi */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className="text-slate-300">Lisensi Bulanan</span>
          <button onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")} className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900">
            <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out", billingCycle === "yearly" ? "translate-x-5" : "translate-x-0")} />
          </button>
          <span className="flex items-center gap-2 text-slate-300">
            Lisensi Tahunan{" "}
            <Badge variant="secondary" className="bg-green-200 text-green-800">
              Discount
            </Badge>
          </span>
        </div>

        {/* Pricing Cards Grid (2x2) */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {deviceOptions.map((plan) => (
            <Card key={plan.name} className={cn("bg-slate-900 border-slate-700 text-white flex flex-col h-full", plan.isPopular && "border-primary shadow-glow ring-2 ring-primary")}>
              <CardHeader>
                {plan.isPopular && <Badge className="absolute -top-3 left-6 bg-gradient-brand border-none">Most Popular</Badge>}
                <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.idealFor}</CardDescription>
              </CardHeader>

              <CardContent className="flex-grow space-y-6">
                {/* Harga Perangkat */}
                <div>
                  <p className="text-sm text-slate-400">Biaya Perangkat (Sekali Bayar)</p>
                  <p className="text-3xl font-bold">{plan.hardwareCost}</p>
                </div>

                {/* Harga Lisensi */}
                {/* {plan.name !== "Portable Event Kit" && (
                  <div>
                    <p className="text-sm text-slate-400">Lisensi Platform</p>
                    <p className="text-3xl font-bold">
                      {billingCycle === "monthly" ? plan.licenseMonthly : plan.licenseYearly}
                      <span className="text-base font-normal text-slate-400"> / {billingCycle === "monthly" ? "bulan" : "tahun"}</span>
                    </p>
                  </div>
                )} */}

                {/* Fitur */}
                <div className="text-sm space-y-3 pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-slate-200">Perangkat Keras Termasuk:</h4>
                  <ul className="space-y-2">
                    {plan.hardwareFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">Pesan Sekarang</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
