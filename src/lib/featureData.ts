// src/lib/featureData.ts
import { Clock, MapPin, BarChart3, TrendingUp, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Feature = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
  details: string[];
};

export const features: Feature[] = [
  {
    icon: Clock,
    title: "Real-time Data Stream",
    description: "Jangan menunggu laporan mingguan. Dapatkan akses ke data yang diperbarui setiap detik, memungkinkan Anda untuk membuat keputusan yang cepat dan tepat sasaran.",
    details: ["Latensi data di bawah 1 detik.", "Notifikasi real-time untuk anomali atau lonjakan traffic.", "Streaming data langsung ke dashboard Anda."],
  },
  {
    icon: MapPin,
    title: "Manajemen Multi-Lokasi",
    description: "Kelola ratusan atau bahkan ribuan titik iklan dari satu dashboard terpusat. Bandingkan performa, kelompokkan berdasarkan wilayah, dan terapkan perubahan secara massal.",
    details: ["Tampilan peta interaktif untuk semua lokasi.", "Pemfilteran dan pengurutan lokasi lanjutan.", "Laporan perbandingan performa antar lokasi."],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics & AI",
    description: "Lebih dari sekadar angka, platform kami menggunakan machine learning untuk menemukan pola, memprediksi tren, dan memberikan insight yang tidak akan Anda temukan di tempat lain.",
    details: ["Prediksi volume traffic berdasarkan data historis.", "Segmentasi audiens otomatis berbasis AI.", "Rekomendasi optimisasi penempatan iklan."],
  },
  {
    icon: TrendingUp,
    title: "ROI & Performance Tracking",
    description: "Buktikan efektivitas setiap kampanye. Hubungkan biaya iklan dengan data eksposur untuk menghitung ROI yang sebenarnya dan justifikasi anggaran Anda dengan data yang valid.",
    details: ["Input biaya kampanye untuk kalkulasi ROI otomatis.", "Atribusi dan analisis funnel audiens.", "Laporan ekspor yang siap dipresentasikan ke stakeholder."],
  },
];
