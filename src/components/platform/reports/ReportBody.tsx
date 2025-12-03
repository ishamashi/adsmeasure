"use client";

// import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { StatsChart } from "@/components/platform/devices/StatsChart";
import { DistributionPieChart } from "@/components/platform/devices/DistributionPieChart";
import { StatCard } from "@/components/platform/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Users, Wifi, BarChart2 } from "lucide-react";
import type { ReportData, PeakHour } from "@/types";

export function ReportBody({ reportData }: { reportData: ReportData }) {
  if (!reportData) return null;

  const { timeSeries, summary, peakDays, peakHours } = reportData;

  // Defensive: handle summary possibly undefined/null
  if (!summary) {
    return <div className="text-center text-gray-500">No summary data available.</div>;
  }

  const genderData = [
    { name: "Male", value: parseFloat(String(summary.avgMale ?? 0)) },
    { name: "Female", value: parseFloat(String(summary.avgFemale ?? 0)) },
  ];

  const ageData = [
    { name: "Child", value: parseFloat(String(summary.avgChild ?? 0)) },
    { name: "Teen", value: parseFloat(String(summary.avgTeen ?? 0)) },
    { name: "Adult", value: parseFloat(String(summary.avgAdult ?? 0)) },
    { name: "Senior", value: parseFloat(String(summary.avgSenior ?? 0)) },
  ];

  const dwellingData = [
    { name: "Dwell A", value: summary.totalDwellA ?? 0 },
    { name: "Dwell B", value: summary.totalDwellB ?? 0 },
    { name: "Dwell C", value: summary.totalDwellC ?? 0 },
  ];

  const formattedPeakHours = peakHours.map((h: PeakHour) => ({
    ...h,
    hour_of_day: `${String(h.hour_of_day).padStart(2, "0")}:00`,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard isLoading={false} title="Total People" value={(summary.totalPeople ?? 0).toLocaleString()} icon={<Users className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Total Impressions" value={(summary.totalImpressions ?? 0).toLocaleString()} icon={<Wifi className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Avg Traffic / Day" value={(summary.avgTrafficPerDay ?? 0).toLocaleString()} icon={<BarChart2 className="h-5 w-5" />} />
        <StatCard isLoading={false} title="Avg People / Day" value={(summary.avgPeoplePerDay ?? 0).toLocaleString()} icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <DistributionPieChart data={genderData} title="Gender Distribution" />
        </Card>
        <Card>
          <DistributionPieChart data={ageData} title="Age Distribution" />
        </Card>
        <Card>
          <DistributionPieChart data={dwellingData} title="WiFi Dwelling" />
        </Card>
      </div>

      <Card>
        <StatsChart
          data={timeSeries}
          title="Overall Daily Trend"
          elements={[
            { dataKey: "vehicles_count", name: "Vehicles", color: "#8884d8", type: "bar" },
            { dataKey: "people_count", name: "People", color: "#ff7300", type: "line" },
          ]}
        />
      </Card>

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
                <Bar dataKey="total_traffic" fill="#2563eb" name="Total Traffic">
                  <LabelList dataKey="total_traffic" position="top" fontSize={10} formatter={(label) => (typeof label === "number" ? label.toLocaleString() : label)} />
                </Bar>
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
                <Bar dataKey="average_traffic" fill="#0ea5e9" name="Average Traffic">
                  <LabelList dataKey="average_traffic" position="top" fontSize={10} formatter={(label) => (typeof label === "number" ? label.toLocaleString() : label)} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
