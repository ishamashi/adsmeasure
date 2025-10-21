// src/components/marketing/TestimonialsSection.tsx
import { testimonials } from "@/lib/testimonialData";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">Dipercaya oleh Para Pemimpin Industri</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Lihat bagaimana para profesional seperti Anda memanfaatkan UrbanCounting untuk mencapai hasil yang luar biasa.</p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
