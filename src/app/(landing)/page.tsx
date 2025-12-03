// src/app/(landing)/page.tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
// import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaSection } from "@/components/landing/CtaSection";

import { Metadata } from "next";

// ⚠️ PENTING: Ganti URL ini dengan domain produksi kamu yang sebenarnya saat deploy.
// Ini diperlukan agar Next.js bisa membuat URL gambar yang absolut.
const baseDomain = process.env.NEXT_PUBLIC_APP_URL || "https://urbancounting.com";

export const metadata: Metadata = {
  // metadataBase sangat penting untuk menyelesaikan path gambar relatif (contoh: /images/og.jpg)
  metadataBase: new URL(baseDomain),

  title: "Real-Time Crowd & Traffic Analytics for OOH | UrbanCounting", // Sedikit diperbaiki agar lebih standar
  description: "Measure the real impact of your billboards. Get accurate, real-time traffic counting and crowd analytics from UrbanCounting to optimize your OOH advertising ROI.",
  keywords: ["OOH analytics", "real-time crowd counting", "traffic analytics", "billboard measurement", "adtech", "UrbanCounting"],

  // Konfigurasi Open Graph (Facebook, LinkedIn, dll)
  openGraph: {
    title: "Real-Time Crowd & Traffic Analytics for OOH",
    description: "Measure the real impact of your billboards. Optimize OOH advertising ROI with accurate, real-time analytics.",
    url: "/", // URL halaman ini (relatif terhadap baseDomain)
    siteName: "UrbanCounting",
    locale: "en_US",
    type: "website",
    images: [
      {
        // Path ini mengarah ke folder /public di root project kamu
        url: "Alche-Code.png",
        width: 1200,
        height: 630,
        alt: "UrbanCounting Dashboard showing crowd analytics data",
      },
    ],
  },

  // Konfigurasi Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Crowd & Traffic Analytics for OOH",
    description: "Measure the real impact of your billboards. Optimize OOH advertising ROI with accurate, real-time analytics.",
    // Menggunakan gambar yang sama dengan Open Graph
    images: ["Alche-Code.png"],
    // creator: '@urbancounting_handle', // (Opsional) Jika punya akun Twitter perusahaan
  },
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      {/* <TestimonialsSection /> */}
      <CtaSection />
    </>
  );
}
