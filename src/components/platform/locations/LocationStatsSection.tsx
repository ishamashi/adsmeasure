"use client";

import { ReportBody } from "@/components/platform/reports/ReportBody";

export function LocationStatsSection({ statsData }: { statsData: any }) {
  if (!statsData || !statsData.timeSeries || statsData.timeSeries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data found for the selected period.</p>
        <p className="text-sm mt-1">Please select a different date range and click "Generate".</p>
      </div>
    );
  }

  return <ReportBody reportData={statsData} />;
}
