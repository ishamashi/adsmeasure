// src/components/platform/devices/DevicesTable.tsx
"use client";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";
import { Device } from '@/types'; // <-- 2. Impor dari sini
import { LocationActions } from "@/components/platform/locations/LocationActions"; // Gunakan kembali komponen ini!

interface DevicesTableProps {
  devices: Device[];
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
}

export function DevicesTable({ devices, onEdit, onDelete }: DevicesTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {devices.map((device) => (
          <tr key={device.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device_uid}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.status}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <LocationActions onEdit={() => onEdit(device)} onDelete={() => onDelete(device)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
