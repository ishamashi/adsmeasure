// src/components/marketing/SolutionDetail.tsx
import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SolutionDetailProps {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageSide: "left" | "right";
}

export function SolutionDetail({ title, description, features, imageUrl, imageSide }: SolutionDetailProps) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Kolom Gambar */}
        <div className={cn("relative h-80 w-full", imageSide === "right" ? "lg:order-2" : "lg:order-1")}>
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-xl shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
        </div>

        {/* Kolom Teks */}
        <div className={cn(imageSide === "right" ? "lg:order-1" : "lg:order-2")}>
          <h2 className="text-3xl font-bold font-display mb-4">{title}</h2>
          <p className="text-slate-400 mb-6">{description}</p>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
