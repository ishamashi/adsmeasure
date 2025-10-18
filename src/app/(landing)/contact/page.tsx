// src/app/(landing)/contact/page.tsx
import { ContactSection } from "@/components/landing/ContactSection";

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
