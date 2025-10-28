// src/components/platform/locations/LocationStatsSection.tsx
"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { StatsChart } from "@/components/platform/devices/StatsChart";
import { DistributionPieChart } from "@/components/platform/devices/DistributionPieChart";
import { StatCard } from "@/components/platform/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Wifi, BarChart2, Clock } from "lucide-react";

export function LocationStatsSection({ statsData }: { statsData: any }) {
  if (!statsData || !statsData.timeSeries || statsData.timeSeries.length === 0) {
    return <p className="text-center text-gray-500 py-8">No data found for the selected period.</p>;
  }

  const { timeSeries, summary, peakDays, peakHours } = statsData;

  console.log("Summary Data:", summary);
  const genderData = [
    { name: "Male", value: parseFloat(summary.avgMale) },
    { name: "Female", value: parseFloat(summary.avgFemale) },
  ];
  const ageData = [
    { name: "Child", value: parseFloat(summary.avgChild) },
    { name: "Teen", value: parseFloat(summary.avgTeen) },
    { name: "Adult", value: parseFloat(summary.avgAdult) },
    { name: "Senior", value: parseFloat(summary.avgSenior) },
  ];
  const dwellingData = [
    { name: "Dwell A", value: summary.totalDwellA },
    { name: "Dwell B", value: summary.totalDwellB },
    { name: "Dwell C", value: summary.totalDwellC },
  ];

  // Pastikan untuk menyesuaikan peakHours format
  const formattedPeakHours = peakHours.map((h: any) => ({
    ...h,
    hour_of_day: `${String(h.hour_of_day).padStart(2, "0")}:00`,
  }));

  return (
    <div className="space-y-6">
      {/* Kartu Statistik Baru */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard isLoading={false} title="Total People" value={summary.totalPeople.toLocaleString()} icon={<Users className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Total Impressions" value={summary.totalImpressions.toLocaleString()} icon={<Wifi className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Avg Traffic / Day" value={summary.avgTrafficPerDay.toLocaleString()} icon={<BarChart2 className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Avg People / Day" value={summary.avgPeoplePerDay.toLocaleString()} icon={<Users className="h-5 w-5" />} />
      </div>

      {/* Chart Distribusi (Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <DistributionPieChart data={genderData} title="Gender Distribution" />
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

      {/* Chart Time Series (Line) */}
      <Card className="p-4">
        <StatsChart
          data={timeSeries}
          title="Overall Daily Trend"
          lines={[
            { dataKey: "people_count", name: "People", color: "#3b82f6" },
            { dataKey: "vehicles_count", name: "Vehicles", color: "#0ea5e9" },
          ]}
        />
      </Card>

      {/* Chart Baru (Bar) untuk Peak Days & Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Peak Traffic by Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakDays}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day_name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="total_traffic" fill="#2563eb" name="Total Traffic" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Peak Traffic by Hour (Avg)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formattedPeakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour_of_day" fontSize={12} interval={2} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="average_traffic" fill="#0ea5e9" name="Average Traffic" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
