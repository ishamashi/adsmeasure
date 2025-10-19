// src/components/marketing/FeatureCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { features } from "@/lib/featureData";
import { Check } from "lucide-react";

// Ekstrak tipe dari array data untuk type safety
type FeatureCardProps = {
  feature: (typeof features)[0];
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon; // Komponen ikon bisa langsung dipanggil
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white h-full">
      <CardHeader className="flex-row items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-display text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-400">{feature.description}</p>
        <ul className="space-y-2">
          {feature.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3 text-sm">
              <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-300">{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
