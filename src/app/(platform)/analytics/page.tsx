"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import useSWR from "swr";
import api from "@/lib/api";
import { PageHeader } from "@/components/platform/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ReportBody } from "@/components/platform/reports/ReportBody";
import { ReportDataAnalytics, ReportData } from "@/types";

interface Location {
  id: number;
  name: string;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function AnalyticsPage() {
  const { data: allLocations } = useSWR<Location[]>("/locations", fetcher);
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [ReportDataAnalytics, setReportData] = useState<ReportDataAnalytics | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const handleLocationSelect = (locationId: number) => {
    if (mode === "single") {
      setSelectedLocationIds([locationId]);
    } else {
      setSelectedLocationIds((prev) => (prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId]));
    }
  };

  const handleGenerateReport = async () => {
    if (!dateRange?.from || !dateRange.to || selectedLocationIds.length === 0) {
      toast.error("Please select a date range and at least one location.");
      return;
    }

    setIsLoadingReport(true);
    setReportData(null);

    const payload = {
      mode,
      locationIds: selectedLocationIds,
      startDate: format(dateRange.from, "yyyy-MM-dd"),
      endDate: format(dateRange.to, "yyyy-MM-dd"),
    };

    try {
      const res = await api.post("/analytics/report", payload);
      setReportData(res.data);
      toast.success("Report generated successfully!");
    } catch (error: unknown) {
      console.error("Error generating report:", error);

      interface ErrorResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }

      const err = error as ErrorResponse;

      if (typeof error === "object" && error !== null && "response" in error && typeof err.response === "object" && err.response !== null && "data" in err.response && typeof err.response.data === "object" && err.response.data !== null && "message" in err.response.data) {
        toast.error(err.response.data?.message ?? "Failed to generate report.");
      } else {
        toast.error("Failed to generate report.");
      }
    } finally {
      setIsLoadingReport(false);
    }
  };

  const comparisonLines = useMemo(() => {
    if (!ReportDataAnalytics || ReportDataAnalytics.reportType !== "compare" || !allLocations) return [];
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
    return allLocations
      .filter((loc) => selectedLocationIds.includes(loc.id))
      .flatMap((loc, index) => [
        { dataKey: `${loc.name}_people`, name: `${loc.name} (People)`, color: colors[index % colors.length], type: "line" as const, yAxisId: "right" },
        { dataKey: `${loc.name}_vehicles`, name: `${loc.name} (Vehicles)`, color: colors[index % colors.length], type: "bar" as const, yAxisId: "left" },
      ]);
  }, [ReportDataAnalytics, allLocations, selectedLocationIds]);

  return (
    <>
      <PageHeader title="Analytics" description="Generate reports and compare data across your locations." />

      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-gray-700">Mode</label>
              <select
                value={mode}
                onChange={(e) => {
                  setMode((e.target.value as string) === "single" ? "single" : "compare");
                  setSelectedLocationIds([]);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10"
              >
                <option value="single">Single Location</option>
                <option value="compare">Compare Locations</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-700">Location(s)</label>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    {selectedLocationIds.length === 0 ? "Select..." : `${selectedLocationIds.length} selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-56" align="start">
                  {allLocations?.map((loc) => (
                    <div key={loc.id} className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <input type={mode === "single" ? "radio" : "checkbox"} name="location" id={`loc-${loc.id}`} value={loc.id} checked={selectedLocationIds.includes(loc.id)} onChange={() => handleLocationSelect(loc.id)} className="mr-2 h-4 w-4" />
                      <label htmlFor={`loc-${loc.id}`} className="text-sm cursor-pointer flex-1">
                        {loc.name}
                      </label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <Popover>
                <PopoverTrigger>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? dateRange.to ? `${format(dateRange.from, "dd LLL, y")} - ${format(dateRange.to, "dd LLL, y")}` : format(dateRange.from, "dd LLL, y") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar initialFocus mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Button className="w-full" onClick={handleGenerateReport} disabled={isLoadingReport}>
                {isLoadingReport && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        {isLoadingReport ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            </CardContent>
          </Card>
        ) : ReportDataAnalytics && ReportDataAnalytics.data ? (
          <div>
            {ReportDataAnalytics.reportType === "single" ? (
              <ReportBody reportData={ReportDataAnalytics.data as unknown as ReportData} />
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Daily Trend Comparison</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={ReportDataAnalytics.data.timeSeries}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tickFormatter={(label) => format(new Date(label), "dd MMM")} fontSize={12} />
                        <YAxis yAxisId="left" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" fontSize={12} />
                        <Tooltip labelFormatter={(label) => format(new Date(label), "PPP")} />
                        <Legend />
                        {comparisonLines.map((el) => (el.type === "line" ? <Line key={el.dataKey} yAxisId="right" type="monotone" dataKey={el.dataKey} name={el.name} stroke={el.color} strokeWidth={2} dot={false} /> : <Bar key={el.dataKey} yAxisId="left" dataKey={el.dataKey} name={el.name} fill={el.color} opacity={0.6} />))}
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Comparison Summary</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left">Location</th>
                          <th className="px-6 py-3 text-right">Total People</th>
                          <th className="px-6 py-3 text-right">Total Vehicles</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(Array.isArray(ReportDataAnalytics.data.summary)
                          ? (ReportDataAnalytics.data.summary as Array<Record<string, unknown>>).map((r) => {
                              const nameCandidate = r["locationName"] ?? r["location"] ?? r["name"];
                              const totalPeopleCandidate = r["totalPeople"];
                              const totalVehiclesCandidate = r["totalVehicles"];

                              const locationName = typeof nameCandidate === "string" ? nameCandidate : "Unknown";
                              const totalPeople = typeof totalPeopleCandidate === "number" ? totalPeopleCandidate : Number(totalPeopleCandidate ?? 0);
                              const totalVehicles = typeof totalVehiclesCandidate === "number" ? totalVehiclesCandidate : Number(totalVehiclesCandidate ?? 0);

                              return { locationName, totalPeople, totalVehicles };
                            })
                          : []
                        ).map((row, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4">{row.locationName}</td>
                            <td className="px-6 py-4 text-right">{row.totalPeople.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">{row.totalVehicles.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">Please select filters and click &apos;Generate&apos; to view analytics.</CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
