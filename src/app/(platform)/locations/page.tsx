// src/app/(platform)/locations/page.tsx
"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AddLocationForm } from "@/components/platform/locations/AddLocationForm";
import api from "@/lib/api";
import { PlusCircle } from "lucide-react";

// Fungsi fetcher untuk SWR
const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function LocationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: locations, error, isLoading } = useSWR("/locations", fetcher);

  const handleAddLocation = async (data: { name: string; address: string }) => {
    try {
      // Kirim data ke backend
      await api.post("/locations", data);
      // Beritahu SWR untuk memuat ulang data dari '/locations'
      mutate("/locations");
      // Tutup modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add location:", error);
      // Lempar error agar bisa ditangkap oleh form
      throw new Error("Failed to add location from server.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-dark">Your Locations</h1>
          <p className="text-gray-500">Manage all your device locations from here.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading locations...</p>}
          {error && <p className="text-red-500">Failed to load locations.</p>}
          {locations && (
            <div className="space-y-4">
              {locations.length > 0 ? (
                locations.map((location: any) => (
                  <div key={location.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.address}</p>
                    </div>
                    {/* Placeholder untuk tombol Edit/Delete */}
                    <Button variant="ghost" size="sm">
                      Options
                    </Button>
                  </div>
                ))
              ) : (
                <p>No locations found. Add your first one!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal - kita buat sederhana tanpa library tambahan untuk saat ini */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
            <AddLocationForm onSubmit={handleAddLocation} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
