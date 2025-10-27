// src/app/(platform)/locations/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/platform/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { DevicesTable } from "@/components/platform/devices/DevicesTable";
import { AddDeviceForm } from "@/components/platform/devices/AddDeviceForm";
import { DeleteConfirmationModal } from "@/components/platform/locations/DeleteConfirmationModal"; // Bisa kita gunakan lagi
import { Device } from '@/types'; // <-- 2. Impor dari sini


const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function LocationDetailPage() {
  const params = useParams();
  const { id: locationId } = params;

  // State
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Data Fetching
  const { data: devices, error, isLoading, mutate } = useSWR<Device[]>(locationId ? `/devices?locationId=${locationId}` : null, fetcher);

  // --- Handlers ---
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

  const handleFormSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      const payload = { ...data, location_id: Number(locationId) };
      if (modalMode === "edit" && selectedDevice) {
        await api.put(`/devices/${selectedDevice.id}`, payload);
      } else {
        await api.post("/devices", payload);
      }
      mutate();
      handleCloseModals();
    } catch (err) {
      console.error(err);
      throw new Error("Failed to save device.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDevice) return;
    setIsProcessing(true);
    try {
      await api.delete(`/devices/${selectedDevice.id}`);
      mutate();
      handleCloseModals();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) return <p className="p-6 text-center">Loading...</p>;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load devices.</p>;
    if (devices && devices.length > 0) {
      return <DevicesTable devices={devices} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />;
    }
    return <p className="p-6 text-center text-gray-500">No devices found. Add your first one!</p>;
  };

  return (
    <>
      <Link href="/locations" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to all locations
      </Link>
      <PageHeader title="Location Devices" description="Manage all devices for this location.">
        <Button onClick={handleOpenAddModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Device
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-0">{renderContent()}</CardContent>
      </Card>

      {/* Modals */}
      {(modalMode === "add" || modalMode === "edit") && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{modalMode === "edit" ? "Edit Device" : "Add New Device"}</h2>
            <AddDeviceForm onSubmit={handleFormSubmit} onClose={handleCloseModals} initialData={selectedDevice} />
          </div>
        </div>
      )}
      {isDeleteModalOpen && selectedDevice && <DeleteConfirmationModal locationName={selectedDevice.name} onConfirm={handleDeleteConfirm} onCancel={handleCloseModals} isDeleting={isProcessing} />}
    </>
  );
}
