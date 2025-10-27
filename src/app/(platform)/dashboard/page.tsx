// src/app/(platform)/dashboard/page.tsx
"use client";

import useSWR from "swr";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { PageHeader } from "@/components/platform/PageHeader";
import { StatCard } from "@/components/platform/dashboard/StatCard";
import { MapPin, HardDrive, Wifi } from "lucide-react";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: summary, error, isLoading } = useSWR("/dashboard/summary", fetcher);

  const welcomeMessage = user ? `Welcome back, ${user.name}!` : "Welcome back!";

  return (
    <>
      <PageHeader title="Dashboard" description={welcomeMessage} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Locations" value={summary?.totalLocations ?? 0} icon={<MapPin className="h-4 w-4" />} description="All registered locations" isLoading={isLoading} />
        <StatCard title="Total Devices" value={summary?.totalDevices ?? 0} icon={<HardDrive className="h-4 w-4" />} description="All devices across locations" isLoading={isLoading} />
        <StatCard title="Active Devices" value={`${summary?.activeDevices ?? 0} / ${summary?.totalDevices ?? 0}`} icon={<Wifi className="h-4 w-4 text-green-500" />} description="Devices currently sending data" isLoading={isLoading} />
        <StatCard title="Impressions Today" value={summary?.totalImpressionsToday.toLocaleString() ?? 0} icon={<Wifi className="h-4 w-4" />} description="Data from all active devices" isLoading={isLoading} />
      </div>

      {/* Area untuk chart di masa depan */}
      <div className="mt-8">{/* Placeholder untuk chart */}</div>
    </>
  );
}
