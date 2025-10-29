// src/app/(platform)/locations/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
// date-fns perlu diimpor jika belum
import { format } from "date-fns";
// import { generatePdf } from "@/lib/pdfGenerator"; // <-- Impor fungsi baru kita
import useSWR from "swr";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/platform/PageHeader";
import { ReportFilter } from "@/components/platform/reports/ReportFilter";
import { CollapsibleSection } from "@/components/platform/CollapsibleSection";
import { DevicesCrudSection } from "@/components/platform/devices/DevicesCrudSection";
import { LocationStatsSection } from "@/components/platform/locations/LocationStatsSection";
import api from "@/lib/api";
import type { DateRange } from "react-day-picker";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function LocationDetailPage() {
  const params = useParams();
  const { id: locationId } = params as { id: string };

  const [, setDateRange] = useState<DateRange | undefined>(); // State untuk menyimpan tanggal
  const [statsUrl, setStatsUrl] = useState<string | null>(null);

  // SWR akan "mendengarkan" perubahan pada `statsUrl`.
  // Jika `statsUrl` adalah null, SWR tidak akan melakukan fetching.
  const { data: stats, error, isLoading } = useSWR(statsUrl, fetcher);

  const handleGenerate = (selectedDate: DateRange) => {
    if (!selectedDate.from || !selectedDate.to) {
      alert("Please select a valid date range.");
      return;
    }
    setDateRange(selectedDate); // Simpan tanggal yang dipilih
    const startDate = format(selectedDate.from, "yyyy-MM-dd");
    const endDate = format(selectedDate.to, "yyyy-MM-dd");
    setStatsUrl(`/locations/${locationId}/stats?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleDownloadPdf = () => {
    // Cukup panggil fungsi print bawaan browser
    window.print();
  };

  const locationName = "Gatsu Kanan"; // Placeholder

  return (
    <>
      <Link href="/locations" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to all locations
      </Link>

      <PageHeader title={locationName} description="Generate reports and manage devices for this location." />

      <ReportFilter onGenerate={handleGenerate} onDownloadPdf={handleDownloadPdf} isGenerating={isLoading} />

      <div className="space-y-6 mt-8">
        <CollapsibleSection title="Location Statistics">
          {/* Tampilkan statistik hanya jika sudah di-generate */}
          {isLoading && <p className="text-center py-8">Generating report...</p>}
          {error && <p className="text-center py-8 text-red-500">Failed to generate report.</p>}
          <div id="pdf-content">{stats && <LocationStatsSection statsData={stats} />}</div>
          {!statsUrl && <p className="text-center py-8 text-gray-500">Please select a date range and click &ldquo;Generate&ldquo; to view statistics.</p>}
        </CollapsibleSection>

        <CollapsibleSection title="Device Management" defaultOpen={false}>
          <DevicesCrudSection locationId={locationId} />
        </CollapsibleSection>
      </div>
    </>
  );
}
