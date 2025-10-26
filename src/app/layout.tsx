import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // <-- Impor

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title.template akan digunakan oleh halaman anak
  title: {
    template: "%s | UrbanCounting",
    default: "UrbanCounting | Real-Time Crowd & Traffic Analytics", // Judul fallback
  },
  description: "UrbanCounting provides advanced real-time traffic counting and crowd analytics solutions for Out-of-Home advertising to help you measure impact and optimize ROI.",
  // Anda bisa menambahkan lebih banyak metadata di sini nanti, seperti openGraph, icons, dll.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
