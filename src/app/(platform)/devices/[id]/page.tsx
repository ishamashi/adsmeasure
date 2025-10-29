// src/app/(platform)/devices/[id]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Car, User, Wifi, Users } from "lucide-react";
import { PageHeader } from "@/components/platform/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatsChart } from "@/components/platform/devices/StatsChart";
import { StatCard } from "@/components/platform/dashboard/StatCard";
import { DistributionPieChart } from "@/components/platform/devices/DistributionPieChart";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function DeviceDetailPage() {
  const params = useParams();
  const { id: deviceId } = params;

  // Fetch data statistik
  const { data: stats, error, isLoading } = useSWR(deviceId ? `/devices/${deviceId}/stats` : null, fetcher);

  // Hitung total agregat menggunakan useMemo agar tidak dihitung ulang setiap render
  const summary = useMemo(() => {
    if (!stats || stats.length === 0) {
      // Inisialisasi semua nilai dengan 0 jika tidak ada data
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

    // Gunakan .reduce untuk menghitung total dari semua data per jam
    const totals = stats.reduce(
      (acc: any, current: any) => {
        const people = current.people_count || 0;
        acc.totalPeople += people;
        acc.totalVehicles += (current.cars_count || 0) + (current.motorcycles_count || 0) + (current.trucks_count || 0) + (current.buses_count || 0);
        acc.totalWifi += current.wifi_impressions_count || 0;

        // Rata-rata tertimbang untuk persentase
        acc.totalMaleWeight += parseFloat(current.male_percentage || 0) * people;
        acc.totalChildWeight += parseFloat(current.age_child_percentage || 0) * people;
        acc.totalTeenWeight += parseFloat(current.age_teen_percentage || 0) * people;
        acc.totalAdultWeight += parseFloat(current.age_adult_percentage || 0) * people;

        // Total untuk dwelling
        acc.totalDwellA += current.wifi_dwell_a_count || 0;
        acc.totalDwellB += current.wifi_dwell_b_count || 0;
        acc.totalDwellC += current.wifi_dwell_c_count || 0;

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
      // Pastikan total usia 100%
      avgSenior: parseFloat((100 - avgChild - avgTeen - avgAdult).toFixed(2)),
      totalDwellA: totals.totalDwellA,
      totalDwellB: totals.totalDwellB,
      totalDwellC: totals.totalDwellC,
    };
  }, [stats]);

  // Data yang sudah diformat untuk Pie Charts
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

  // Di aplikasi nyata, kita juga akan fetch detail perangkat itu sendiri
  const deviceName = "Device Details"; // Placeholder

  return (
    <>
      <Link href={`/locations`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to locations
      </Link>
      <PageHeader title={deviceName} description={`Showing statistics for the last 24 hours.`} />

      {/* Bagian Kartu Ringkasan */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard title="Total People Detected" value={summary.totalPeople.toLocaleString()} icon={<Users className="h-5 w-5" />} description="Sum of people counted in 24h" isLoading={isLoading} />
        <StatCard title="Total Vehicles Detected" value={summary.totalVehicles.toLocaleString()} icon={<Car className="h-5 w-5" />} description="Sum of all vehicle types in 24h" isLoading={isLoading} />
        <StatCard title="Total WiFi Impressions" value={summary.totalWifi.toLocaleString()} icon={<Wifi className="h-5 w-5" />} description="Sum of unique devices detected" isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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

      {/* Bagian Chart */}
      <div className="space-y-8">
        {isLoading && <div className="h-[300px] w-full flex items-center justify-center rounded-lg bg-gray-100">Loading charts...</div>}
        {error && <div className="h-[300px] w-full flex items-center justify-center text-red-500 bg-red-50 rounded-lg">Failed to load chart data.</div>}

        {stats && stats.length > 0 && (
          <>
            <Card>
              <CardContent className="p-4">
                <StatsChart data={stats} title="People Traffic Trend" elements={[{ dataKey: "people_count", name: "People", color: "#3b82f6", type: "line" }]} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <StatsChart
                  data={stats}
                  title="Vehicle Traffic Trend"
                  elements={[
                    { dataKey: "cars_count", name: "Cars", color: "#2563eb", type: "line" },
                    { dataKey: "motorcycles_count", name: "Motorcycles", color: "#0ea5e9", type: "line" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <StatsChart data={stats} title="WiFi Impressions Trend" elements={[{ dataKey: "wifi_impressions_count", name: "Impressions", color: "#8b5cf6", type: "line" }]} />
              </CardContent>
            </Card>
          </>
        )}

        {stats && stats.length === 0 && <div className="h-[300px] w-full flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">No data available for this period. The device might be inactive or has just been added.</div>}
      </div>
    </>
  );
}
