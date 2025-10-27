// src/components/platform/devices/AddDeviceForm.tsx
"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/Button";
import api from "@/lib/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

interface Device {
  id?: number;
  name: string;
  device_uid: string;
  device_type_id: number;
}

interface AddDeviceFormProps {
  onSubmit: (data: Omit<Device, "id">) => Promise<void>;
  onClose: () => void;
  initialData?: Device | null;
}

export function AddDeviceForm({ onSubmit, onClose, initialData }: AddDeviceFormProps) {
  const { data: deviceTypes, error: deviceTypesError } = useSWR("/device-types", fetcher);

  const [name, setName] = useState(initialData?.name || "");
  const [deviceUid, setDeviceUid] = useState(initialData?.device_uid || "");
  const [deviceTypeId, setDeviceTypeId] = useState<number | string>(initialData?.device_type_id || "");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ name, device_uid: deviceUid, device_type_id: Number(deviceTypeId) });
    } catch (err: any) {
      setError(err.message || "Failed to save device");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Device Name
        </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="deviceUid" className="block text-sm font-medium text-gray-700">
          Device UID
        </label>
        <input type="text" id="deviceUid" value={deviceUid} onChange={(e) => setDeviceUid(e.target.value)} required disabled={!!initialData} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed" />
      </div>
      <div>
        <label htmlFor="deviceTypeId" className="block text-sm font-medium text-gray-700">
          Device Type
        </label>
        <select id="deviceTypeId" value={deviceTypeId} onChange={(e) => setDeviceTypeId(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
          <option value="" disabled>
            Select a type
          </option>
          {deviceTypes &&
            deviceTypes.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
        {deviceTypesError && <p className="text-sm text-red-500">Could not load device types.</p>}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Device"}
        </Button>
      </div>
    </form>
  );
}
