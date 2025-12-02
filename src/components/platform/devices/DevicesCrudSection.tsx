// src/components/platform/devices/DevicesCrudSection.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useSWR from "swr";
import { toast } from "sonner";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import { DevicesTable } from "./DevicesTable";
import { AddDeviceForm } from "./AddDeviceForm";
import { DeleteConfirmationModal } from "../locations/DeleteConfirmationModal";
import { TableSkeleton } from "@/components/platform/TableSkeleton";
import type { Device } from "@/types"; // Gunakan tipe terpusat

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function DevicesCrudSection({ locationId }: { locationId: string }) {
  const { user } = useAuth();
  const { data: devices, error, isLoading, mutate } = useSWR<Device[]>(`/devices?locationId=${locationId}`, fetcher);

  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Handlers untuk Aksi CRUD ---
  const handleOpenAddModal = () => {
    setSelectedDevice(null);
    setModalMode("add");
  };

  const handleOpenEditModal = (device: Device) => {
    setSelectedDevice(device);
    setModalMode("edit");
  };

  const handleOpenDeleteModal = (device: Device) => {
    setSelectedDevice(device);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setModalMode(null);
    setIsDeleteModalOpen(false);
    setSelectedDevice(null);
  };

  const handleFormSubmit = async (data: Partial<Device>) => {
    const payload = { ...data, location_id: Number(locationId) };
    const promise = () => (modalMode === "edit" && selectedDevice ? api.put(`/devices/${selectedDevice.id}`, payload) : api.post("/devices", payload));

    toast.promise(promise, {
      loading: "Saving device...",
      success: (res) => {
        mutate();
        handleCloseModals();
        return `Device "${res.data.name}" saved successfully.`;
      },
      error: (err) => err.response?.data?.message || "Failed to save device.",
    });
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDevice) return;

    const promise = () => api.delete(`/devices/${selectedDevice.id}`);

    toast.promise(promise, {
      loading: `Deleting "${selectedDevice.name}"...`,
      success: () => {
        mutate();
        handleCloseModals();
        return `Device "${selectedDevice.name}" deleted.`;
      },
      error: (err) => err.response?.data?.message || "Failed to delete device.",
    });
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) return <TableSkeleton />;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load devices.</p>;
    if (devices && devices.length > 0) {
      return <DevicesTable devices={devices} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />;
    }
    // Nanti bisa jadi EmptyState component
    return <p className="p-6 text-center text-gray-500">No devices found for this location. Add your first one!</p>;
  };

  return (
    <div className="space-y-4">
      <div className="text-right">
        {user && user.role < 20 && (
          <Button onClick={handleOpenAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        )}
      </div>
      {renderContent()}

      {/* Modal untuk Add/Edit */}
      {(modalMode === "add" || modalMode === "edit") && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg transform animate-scaleIn">
            <h2 className="text-xl font-bold mb-4">{modalMode === "edit" ? "Edit Device" : "Add New Device"}</h2>
            <AddDeviceForm onSubmit={handleFormSubmit} onClose={handleCloseModals} initialData={selectedDevice} />
          </div>
        </div>
      )}

      {/* Modal untuk Konfirmasi Delete */}
      {isDeleteModalOpen && selectedDevice && <DeleteConfirmationModal locationName={selectedDevice.name} onConfirm={handleDeleteConfirm} onCancel={handleCloseModals} isDeleting={isProcessing} />}
    </div>
  );
}
