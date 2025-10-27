// src/app/(platform)/locations/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHeader } from "@/components/platform/PageHeader";
import { LocationsTable } from "@/components/platform/locations/LocationsTable";
import { LocationsEmptyState } from "@/components/platform/locations/LocationsEmptyState";
import { AddLocationForm } from "@/components/platform/locations/AddLocationForm";
import { DeleteConfirmationModal } from "@/components/platform/locations/DeleteConfirmationModal";
import api from "@/lib/api";
import { PlusCircle } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
  created_at: string;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function LocationsPage() {
  const { data: locations, error, isLoading, mutate } = useSWR<Location[]>("/locations", fetcher);

  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Handlers untuk Aksi CRUD ---

  const handleOpenAddModal = () => {
    setSelectedLocation(null);
    setModalMode("add");
  };

  const handleOpenEditModal = (location: Location) => {
    setSelectedLocation(location);
    setModalMode("edit");
  };

  const handleOpenDeleteModal = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setModalMode(null);
    setIsDeleteModalOpen(false);
    setSelectedLocation(null);
  };

  const handleFormSubmit = async (data: { name: string; address: string }) => {
    try {
      if (modalMode === "edit" && selectedLocation) {
        // Logika Update
        await api.put(`/locations/${selectedLocation.id}`, data);
      } else {
        // Logika Create
        await api.post("/locations", data);
      }
      mutate(); // Re-fetch data untuk memperbarui UI
      handleCloseModals();
    } catch (error) {
      console.error(`Failed to ${modalMode} location:`, error);
      throw new Error(`Failed to ${modalMode} location.`);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLocation) return;
    setIsDeleting(true);
    try {
      await api.delete(`/locations/${selectedLocation.id}`);
      mutate();
      handleCloseModals();
    } catch (error) {
      console.error("Failed to delete location:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Render Logic ---

  const renderContent = () => {
    if (isLoading) return <p className="p-6 text-center text-gray-500">Loading locations...</p>;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load locations.</p>;
    if (locations && locations.length > 0) {
      return <LocationsTable locations={locations} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />;
    }
    return <LocationsEmptyState onAddLocation={handleOpenAddModal} />;
  };

  return (
    <>
      <PageHeader title="Your Locations" description="Manage all your device locations from here.">
        <Button onClick={handleOpenAddModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Location
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-0">{renderContent()}</CardContent>
      </Card>

      {/* Modal untuk Add/Edit */}
      {(modalMode === "add" || modalMode === "edit") && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg transform animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{modalMode === "edit" ? "Edit Location" : "Add New Location"}</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModals}>
                X
              </Button>
            </div>
            <AddLocationForm
              onSubmit={handleFormSubmit}
              onClose={handleCloseModals}
              initialData={selectedLocation} // Pass initial data for editing
            />
          </div>
        </div>
      )}

      {/* Modal untuk Konfirmasi Delete */}
      {isDeleteModalOpen && selectedLocation && <DeleteConfirmationModal locationName={selectedLocation.name} onConfirm={handleDeleteConfirm} onCancel={handleCloseModals} isDeleting={isDeleting} />}
    </>
  );
}
