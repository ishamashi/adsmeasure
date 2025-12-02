// src/app/(platform)/admin/licenses/page.tsx
"use client";

import useSWR from "swr";
import api from "@/lib/api";
import { PageHeader } from "@/components/platform/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { License } from "@/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

// Komponen Tabel (didefinisikan di file yang sama untuk kesederhanaan)
function LicensesTable({ licenses }: { licenses: License[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>Active</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getExpiryInfo = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const daysLeft = differenceInDays(expiryDate, new Date());

    if (daysLeft < 0) return <span className="text-red-600">Expired {formatDistanceToNow(expiryDate, { addSuffix: true })}</span>;
    if (daysLeft < 30) return <span className="text-yellow-600">Expires in {daysLeft} days</span>;
    return `Expires on ${expiryDate.toLocaleDateString()}`;
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left">Device</th>
          <th className="px-6 py-3 text-left">User</th>
          <th className="px-6 py-3 text-left">Tier</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Expires</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {licenses.map((license) => (
          <tr key={license.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="font-medium">{license.device_name}</div>
              <div className="text-xs text-gray-500">{license.device_uid}</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{license.user_name}</td>
            <td className="px-6 py-4">
              <Badge variant="outline">{license.tier_name}</Badge>
            </td>
            <td className="px-6 py-4">{getStatusBadge(license.status)}</td>
            <td className="px-6 py-4 text-sm">{getExpiryInfo(license.expires_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Halaman Utama
export default function LicenseManagementPage() {
  const { data: licenses, error, isLoading } = useSWR("/licenses", fetcher);

  const renderContent = () => {
    if (isLoading) return <p className="p-6 text-center text-gray-500">Loading licenses...</p>;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load licenses.</p>;
    if (licenses && licenses.length > 0) {
      return <LicensesTable licenses={licenses} />;
    }
    return <p className="p-6 text-center text-gray-500">No licenses found.</p>;
  };

  return (
    <>
      <PageHeader title="License Management" description="View and manage all device licenses across the platform." />
      <Card>
        <CardContent className="p-0">{renderContent()}</CardContent>
      </Card>
    </>
  );
}
