// src/components/platform/licenses/AssignLicenseForm.tsx
"use client";
import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

interface LicenseTier {
  id: number;
  name: string;
  price_monthly: number;
}

export function AssignLicenseForm({ deviceId, onSuccess }: { deviceId: number; onSuccess: () => void }) {
  const { data: tiers } = useSWR<LicenseTier[]>("/license-tiers", fetcher); // Endpoint ini perlu dibuat
  const [tierId, setTierId] = useState("");
  const [cycle, setCycle] = useState("monthly");
  const [isLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const promise = () =>
      api.post("/licenses", {
        device_id: deviceId,
        license_tier_id: Number(tierId),
        billing_cycle: cycle,
      });

    toast.promise(promise, {
      loading: "Assigning license...",
      success: () => {
        onSuccess(); // Ini akan memanggil `mutateDevice` dari halaman induk
        return `License assigned successfully!`;
      },
      error: (err) => err.response?.data?.message || "Failed to assign license.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>License Tier</label>
        <select value={tierId} onChange={(e) => setTierId(e.target.value)} required className="w-full mt-1">
          <option disabled value="">
            Select Tier
          </option>
          {tiers?.map((t: LicenseTier) => (
            <option key={t.id} value={t.id}>
              {t.name} - ${t.price_monthly}/mo
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Billing Cycle</label>
        <select value={cycle} onChange={(e) => setCycle(e.target.value)} required className="w-full mt-1">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Assigning..." : "Assign License"}
      </Button>
    </form>
  );
}
