// src/components/platform/reports/ReportFilter.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { Card, CardContent } from "@/components/ui/Card";

interface ReportFilterProps {
  onGenerate: (dateRange: DateRange) => void;
  onDownloadPdf: () => void;
  isGenerating: boolean;
}

export function ReportFilter({ onGenerate, onDownloadPdf, isGenerating }: ReportFilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <Card className="mb-8">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700">Tanggal (Start - End)</label>
            <Popover>
              <PopoverTrigger>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? date.to ? `${format(date.from, "dd LLL, y")} - ${format(date.to, "dd LLL, y")}` : format(date.from, "dd LLL, y") : <span>Pick a date range</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Button className="w-full" onClick={() => date && onGenerate(date)} disabled={!date || isGenerating}>
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
            <Button variant="destructive" className="w-full" onClick={onDownloadPdf}>
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
