// src/components/platform/locations/AddLocationForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

// Definisikan tipe untuk props, termasuk fungsi onSubmit
interface AddLocationFormProps {
  onSubmit: (data: { name: string; address: string }) => Promise<void>;
  onClose: () => void;
}

export function AddLocationForm({ onSubmit, onClose }: AddLocationFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ name, address });
    } catch (err: any) {
      setError(err.message || "Failed to add location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Location Name
        </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea id="address" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Location"}
        </Button>
      </div>
    </form>
  );
}
