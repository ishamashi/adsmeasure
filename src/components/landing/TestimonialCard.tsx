// src/components/marketing/TestimonialCard.tsx
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { testimonials } from "@/lib/testimonialData";

// Mendefinisikan tipe prop berdasarkan struktur data kita
type TestimonialCardProps = {
  testimonial: (typeof testimonials)[0];
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <p className="italic text-slate-300">"{testimonial.quote}"</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Image src={testimonial.avatarUrl} alt={`Avatar of ${testimonial.name}`} width={48} height={48} className="rounded-full" />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-slate-400">{testimonial.title}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
