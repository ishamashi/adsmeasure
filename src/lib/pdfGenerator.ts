// src/lib/pdfGenerator.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";

// Definisikan tipe untuk data yang akan kita terima
interface PdfSummary {
  avgMale: number;
  avgFemale: number;
  totalDwellA: number;
  // Tambahkan properti lain sesuai kebutuhan
}

interface PdfData {
  locationName: string;
  dateRange: { from: Date; to: Date };
  summary: PdfSummary;
  timeSeriesChartId: string; // ID elemen chart time series
  pieChartsContainerId: string; // ID elemen kontainer pie chart
}

export const generatePdf = async ({ locationName, dateRange, summary, timeSeriesChartId, pieChartsContainerId }: PdfData): Promise<void> => {
  // 1. Inisialisasi dokumen PDF
  // 'p' = portrait, 'mm' = milimeter, 'a4' = ukuran kertas
  const doc = new jsPDF("p", "mm", "a4");

  // 2. Set Properti & Tambahkan Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("UrbanCounting Report", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.text(locationName, 105, 30, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const dateString = `${format(dateRange.from, "dd MMM yyyy")} - ${format(dateRange.to, "dd MMM yyyy")}`;
  doc.text(dateString, 105, 36, { align: "center" });

  // 3. Tambahkan Data Ringkasan (Summary)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Summary", 14, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`- Average Male: ${summary.avgMale}%`, 16, 58);
  doc.text(`- Average Female: ${summary.avgFemale}%`, 16, 64);
  doc.text(`- Total Dwell A: ${summary.totalDwellA.toLocaleString()}`, 16, 70);
  // Tambahkan data summary lain jika perlu...

  // Garis pemisah
  doc.line(14, 75, 196, 75);

  // 4. "Screenshot" Chart dan Tambahkan ke PDF
  try {
    // Ambil elemen HTML dari DOM menggunakan ID-nya
    const timeSeriesChartElement = document.getElementById(timeSeriesChartId);
    const pieChartsContainerElement = document.getElementById(pieChartsContainerId);

    if (timeSeriesChartElement) {
      doc.setFont("helvetica", "bold");
      doc.text("Overall Traffic Trend", 14, 85);
      const canvas = await html2canvas(timeSeriesChartElement, { backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      // Lebar dan tinggi gambar (sesuaikan jika perlu)
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 14, 90, imgWidth, imgHeight);
    }

    if (pieChartsContainerElement) {
      doc.addPage(); // Pindah ke halaman baru untuk pie chart
      doc.setFont("helvetica", "bold");
      doc.text("Demographics & Dwelling", 14, 20);
      const canvas = await html2canvas(pieChartsContainerElement, { backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 14, 25, imgWidth, imgHeight);
    }
  } catch (error) {
    console.error("Error generating chart images for PDF:", error);
    alert("Failed to generate chart images for the PDF.");
    return;
  }

  // 5. Simpan file PDF
  const fileName = `UrbanCounting_Report_${locationName}_${format(new Date(), "yyyy-MM-dd")}.pdf`;
  doc.save(fileName);
};
