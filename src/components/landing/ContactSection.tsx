// src/components/marketing/ContactSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di aplikasi nyata, di sini Anda akan mengirim data ke API atau layanan email
    console.log("Form Submitted:", formData);
    alert("Terima kasih! Pesan Anda telah kami terima.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <section className="bg-slate-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Kolom Kiri: Informasi Kontak */}
        <div>
          <h2 className="text-3xl font-bold font-display mb-4">Hubungi Kami</h2>
          <p className="text-slate-400 mb-8">Punya pertanyaan atau ingin mendiskusikan kebutuhan spesifik Anda? Tim kami siap membantu.</p>
          <div className="space-y-6">
            <a href="mailto:support@adsmeasure.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-slate-400 group-hover:text-primary transition-colors">support@adsmeasure.com</p>
              </div>
            </a>
            <a href="tel:+6281234567890" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p className="text-slate-400 group-hover:text-primary transition-colors">+62 812-3456-7890</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p className="text-slate-400">Jl. Teknologi No. 1, Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Kontak */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Nama Lengkap
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-700 border border-slate-600 rounded-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Alamat Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-700 border border-slate-600 rounded-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Pesan Anda
              </label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-slate-700 border border-slate-600 rounded-button px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <Button type="submit" className="w-full bg-gradient-brand hover:shadow-glow">
              Kirim Pesan <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
