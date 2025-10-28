// src/components/ui/Calendar.tsx
"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Impor styling default

// Ini adalah komponen wrapper sederhana
export function Calendar(props: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays
      {...props}
      // Kita bisa menambahkan styling kustom Tailwind di sini nanti jika perlu
      classNames={{
        // Contoh kustomisasi
        day_selected: "bg-primary text-white hover:bg-primary/90 focus:bg-primary",
        today: "text-primary font-bold",
      }}
    />
  );
}
