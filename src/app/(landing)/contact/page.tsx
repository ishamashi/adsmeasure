// src/app/(landing)/contact/page.tsx
import { ContactSection } from "@/components/landing/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the UrbanCounting team. We're ready to answer your questions about our traffic counting solutions or schedule a personalized demo.",
};

export default function ContactPage() {
  return (
    <>
      {/* 
        Halaman kontak lebih baik langsung ke intinya.
        Kita tidak perlu Hero terpisah, karena ContactSection sudah punya judul yang kuat.
        Kita juga tidak perlu CTA di sini karena halaman ini sendiri adalah Call to Action.
      */}
      <div className="pt-20">
        <ContactSection />
      </div>
    </>
  );
}
