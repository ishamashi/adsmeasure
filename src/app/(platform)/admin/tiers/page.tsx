"use client";

import { useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { PageHeader } from "@/components/platform/PageHeader";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { LocationActions } from "@/components/platform/locations/LocationActions";
import { DeleteConfirmationModal } from "@/components/platform/locations/DeleteConfirmationModal";
import { TierFormData } from "@/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

// Komponen Form
function AddTierForm({ onSubmit, onClose, initialData }: { onSubmit: (data: TierFormData) => Promise<void>; onClose: () => void; initialData?: Partial<TierFormData> }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [priceMonthly, setPriceMonthly] = useState(initialData?.price_monthly || "");
  const [priceYearly, setPriceYearly] = useState(initialData?.price_yearly || "");
  const [features, setFeatures] = useState(Array.isArray(initialData?.features) ? initialData.features.join("\n") : "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const featuresArray: string[] = features.split("\n").filter((f: string) => f.trim() !== "");
      await onSubmit({
        id: initialData?.id ?? "",
        name,
        description,
        price_monthly: Number(priceMonthly),
        price_yearly: Number(priceYearly),
        features: featuresArray,
      });
    } catch (error) {
      alert("Failed to save tier.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tier Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Price</label>
          <input type="number" value={priceMonthly} onChange={(e) => setPriceMonthly(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yearly Price</label>
          <input type="number" value={priceYearly} onChange={(e) => setPriceYearly(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Features (one per line)</label>
        <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Tier"}
        </Button>
      </div>
    </form>
  );
}

// Komponen Tabel
function TiersTable({ tiers, onEdit, onDelete }: { tiers: TierFormData[]; onEdit: (tier: TierFormData) => void; onDelete: (tier: TierFormData) => void }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yearly Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Features</th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tiers.map((tier) => (
          <tr key={tier.id}>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{tier.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{Number(tier.price_monthly).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{Number(tier.price_yearly).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{Array.isArray(tier.features) ? tier.features.join(", ") : ""}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <LocationActions onEdit={() => onEdit(tier)} onDelete={() => onDelete(tier)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Halaman Utama
export default function TierManagementPage() {
  const { data: tiers, error, isLoading, mutate } = useSWR("/license-tiers", fetcher);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierFormData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = async (data: TierFormData) => {
    setIsProcessing(true);
    const promise = () => (modalMode === "edit" && selectedTier ? api.put(`/license-tiers/${selectedTier.id}`, data) : api.post("/license-tiers", data));

    toast.promise(promise, {
      loading: "Saving tier...",
      success: (res) => {
        mutate();
        setModalMode(null);
        return `Tier "${res.data.name}" saved successfully!`;
      },
      error: (err) => {
        return err.response?.data?.message || "Failed to save tier.";
      },
    });

    setIsProcessing(false);
  };

  const handleDelete = (tier: TierFormData) => {
    setSelectedTier(tier);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTier) return;
    setIsProcessing(true);
    const promise = () => api.delete(`/license-tiers/${selectedTier.id}`);

    toast.promise(promise, {
      loading: "Deleting tier...",
      success: () => {
        mutate();
        setIsDeleteModalOpen(false);
        return `Tier "${selectedTier.name}" deleted successfully.`;
      },
      error: (err) => {
        return err.response?.data?.message || "Failed to delete tier.";
      },
    });

    setIsProcessing(false);
  };

  const renderContent = () => {
    if (isLoading) return <p className="p-6 text-center">Loading...</p>;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load tiers.</p>;
    if (tiers && tiers.length > 0) {
      return (
        <TiersTable
          tiers={tiers}
          onEdit={(tier) => {
            setSelectedTier(tier);
            setModalMode("edit");
          }}
          onDelete={handleDelete}
        />
      );
    }
    return <p className="p-6 text-center text-gray-500">No license tiers found. Add your first one!</p>;
  };

  return (
    <>
      <PageHeader title="Tier Management" description="Manage your license tiers.">
        <Button
          onClick={() => {
            setSelectedTier(null);
            setModalMode("add");
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Tier
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-0">{renderContent()}</CardContent>
      </Card>

      {modalMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transform animate-scaleIn">
            <h2 className="text-xl font-bold mb-4">{modalMode === "edit" ? "Edit Tier" : "Add New Tier"}</h2>
            <AddTierForm onSubmit={handleFormSubmit} onClose={() => setModalMode(null)} initialData={selectedTier ?? undefined} />
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedTier && <DeleteConfirmationModal locationName={selectedTier.name} onConfirm={handleDeleteConfirm} onCancel={() => setIsDeleteModalOpen(false)} isDeleting={isProcessing} />}
    </>
  );
}
