"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Car, Wifi, Users } from "lucide-react";
import { PageHeader } from "@/components/platform/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { StatsChart } from "@/components/platform/devices/StatsChart";
import { StatCard } from "@/components/platform/dashboard/StatCard";
import { DistributionPieChart } from "@/components/platform/devices/DistributionPieChart";
import { useAuth } from "@/context/AuthContext";
import { CollapsibleSection } from "@/components/platform/CollapsibleSection";
import { AssignLicenseForm } from "@/components/platform/licenses/AssignLicenseForm";
import { LicenseInfo } from "@/components/platform/licenses/LicenseInfo";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function DeviceDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const { id: deviceId } = params as { id: string };

  // Fetch 1: Detail perangkat (termasuk info lisensi)
  const { data: device, error: deviceError, isLoading: deviceLoading, mutate: mutateDevice } = useSWR(deviceId ? `/devices/${deviceId}` : null, fetcher);

  // Fetch 2: Data statistik
  const { data: stats, error: statsError, isLoading: statsLoading } = useSWR(deviceId ? `/devices/${deviceId}/stats` : null, fetcher);

  const summary = useMemo(() => {
    if (!stats || stats.length === 0) {
      return {
        totalPeople: 0,
        totalVehicles: 0,
        totalWifi: 0,
        avgMale: 0,
        avgFemale: 0,
        avgChild: 0,
        avgTeen: 0,
        avgAdult: 0,
        avgSenior: 0,
        totalDwellA: 0,
        totalDwellB: 0,
        totalDwellC: 0,
      };
    }
    const totals = stats.reduce(
      (
        acc: {
          totalPeople: number;
          totalVehicles: number;
          totalWifi: number;
          totalMaleWeight: number;
          totalChildWeight: number;
          totalTeenWeight: number;
          totalAdultWeight: number;
          totalDwellA: number;
          totalDwellB: number;
          totalDwellC: number;
        },
        current: Record<string, unknown>
      ) => {
        const people = Number(current.people_count ?? 0);
        acc.totalPeople += people;
        acc.totalVehicles += Number(current.cars_count ?? 0) + Number(current.motorcycles_count ?? 0) + Number(current.trucks_count ?? 0) + Number(current.buses_count ?? 0);
        acc.totalWifi += Number(current.wifi_impressions_count ?? 0);
        acc.totalMaleWeight += Number(current.male_percentage ?? 0) * people;
        acc.totalChildWeight += Number(current.age_child_percentage ?? 0) * people;
        acc.totalTeenWeight += Number(current.age_teen_percentage ?? 0) * people;
        acc.totalAdultWeight += Number(current.age_adult_percentage ?? 0) * people;
        acc.totalDwellA += Number(current.wifi_dwell_a_count ?? 0);
        acc.totalDwellB += Number(current.wifi_dwell_b_count ?? 0);
        acc.totalDwellC += Number(current.wifi_dwell_c_count ?? 0);
        return acc;
      },
      {
        totalPeople: 0,
        totalVehicles: 0,
        totalWifi: 0,
        totalMaleWeight: 0,
        totalChildWeight: 0,
        totalTeenWeight: 0,
        totalAdultWeight: 0,
        totalDwellA: 0,
        totalDwellB: 0,
        totalDwellC: 0,
      }
    );
    const avgMale = totals.totalPeople > 0 ? totals.totalMaleWeight / totals.totalPeople : 0;
    const avgChild = totals.totalPeople > 0 ? totals.totalChildWeight / totals.totalPeople : 0;
    const avgTeen = totals.totalPeople > 0 ? totals.totalTeenWeight / totals.totalPeople : 0;
    const avgAdult = totals.totalPeople > 0 ? totals.totalAdultWeight / totals.totalPeople : 0;
    return {
      totalPeople: totals.totalPeople,
      totalVehicles: totals.totalVehicles,
      totalWifi: totals.totalWifi,
      avgMale: parseFloat(avgMale.toFixed(2)),
      avgFemale: parseFloat((100 - avgMale).toFixed(2)),
      avgChild: parseFloat(avgChild.toFixed(2)),
      avgTeen: parseFloat(avgTeen.toFixed(2)),
      avgAdult: parseFloat(avgAdult.toFixed(2)),
      avgSenior: parseFloat((100 - avgChild - avgTeen - avgAdult).toFixed(2)),
      totalDwellA: totals.totalDwellA,
      totalDwellB: totals.totalDwellB,
      totalDwellC: totals.totalDwellC,
    };
  }, [stats]);

  const genderData = [
    { name: "Male", value: summary.avgMale },
    { name: "Female", value: summary.avgFemale },
  ];
  const ageData = [
    { name: "Child", value: summary.avgChild },
    { name: "Teen", value: summary.avgTeen },
    { name: "Adult", value: summary.avgAdult },
    { name: "Senior", value: summary.avgSenior },
  ];
  const dwellingData = [
    { name: "Dwell A", value: summary.totalDwellA },
    { name: "Dwell B", value: summary.totalDwellB },
    { name: "Dwell C", value: summary.totalDwellC },
  ];

  if (deviceLoading) {
    return <div className="p-8 text-center">Loading device information...</div>;
  }

  if (deviceError) {
    return <div className="p-8 text-center text-red-500">Failed to load device information.</div>;
  }

  return (
    <>
      <Link href={`/locations/${device?.location_id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Location
      </Link>
      <PageHeader title={device?.name || "Device Details"} description={`UID: ${device?.device_uid || "N/A"}`} />

      {user && user.role < 20 && (
        <div className="mb-8">
          <CollapsibleSection title="License Management" defaultOpen={true}>
            {device && device.license_status ? (
              <LicenseInfo license={device} />
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">This device does not have an active license.</p>
                <AssignLicenseForm deviceId={Number(deviceId)} onSuccess={() => mutateDevice()} />
              </div>
            )}
          </CollapsibleSection>
        </div>
      )}

      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total People (24h)" value={summary.totalPeople.toLocaleString()} icon={<Users className="h-5 w-5" />} isLoading={statsLoading} />
          <StatCard title="Total Vehicles (24h)" value={summary.totalVehicles.toLocaleString()} icon={<Car className="h-5 w-5" />} isLoading={statsLoading} />
          <StatCard title="Total WiFi Impressions (24h)" value={summary.totalWifi.toLocaleString()} icon={<Wifi className="h-5 w-5" />} isLoading={statsLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-2">
              <DistributionPieChart data={genderData} title="Gender Distribution (Avg)" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardContent className="p-2">
              <DistributionPieChart data={ageData} title="Age Distribution (Avg)" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardContent className="p-2">
              <DistributionPieChart data={dwellingData} title="WiFi Dwelling (Total)" />
            </CardContent>
          </Card>
        </div>

        {statsLoading && <div className="h-[300px] w-full flex items-center justify-center rounded-lg bg-gray-50 animate-pulse">Loading charts...</div>}
        {statsError && <div className="h-[300px] w-full flex items-center justify-center text-red-500">Failed to load chart data.</div>}
        {stats && stats.length > 0 && (
          <>
            <Card>
              <CardContent className="p-4">
                <StatsChart data={stats} title="People Traffic Trend (24h)" elements={[{ dataKey: "people_count", name: "People", color: "#3b82f6", type: "line" }]} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <StatsChart
                  data={stats}
                  title="Vehicle Traffic Trend (24h)"
                  elements={[
                    { dataKey: "cars_count", name: "Cars", color: "#2563eb", type: "line" },
                    { dataKey: "motorcycles_count", name: "Motorcycles", color: "#0ea5e9", type: "line" },
                  ]}
                />
              </CardContent>
            </Card>
          </>
        )}
        {stats && stats.length === 0 && <div className="h-[300px] w-full flex items-center justify-center text-gray-500">No data available for this period.</div>}
      </div>
    </>
  );
}
