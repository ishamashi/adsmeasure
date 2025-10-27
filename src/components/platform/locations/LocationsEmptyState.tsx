// src/components/platform/locations/LocationsEmptyState.tsx
import { Button } from "@/components/ui/Button";
import { MapPin, PlusCircle } from "lucide-react";

interface LocationsEmptyStateProps {
  onAddLocation: () => void;
}

export function LocationsEmptyState({ onAddLocation }: LocationsEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <MapPin className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">No locations yet</h3>
      <p className="mt-2 text-sm text-gray-500">Get started by adding your first device location.</p>
      <div className="mt-6">
        <Button onClick={onAddLocation}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>
    </div>
  );
}
