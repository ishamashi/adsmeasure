// src/components/platform/devices/StatsChart.tsx
"use client";

// 👇 Impor ComposedChart dan Bar
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

interface ChartElement {
  dataKey: string;
  name: string;
  color: string;
  type: "line" | "bar"; // Menentukan tipe elemen
}

interface StatsChartProps {
  data: any[];
  elements: ChartElement[]; // Ganti `lines` menjadi `elements`
  title: string;
}

const formatXAxisAsDay = (tickItem: string) => {
  return new Date(tickItem).toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

export function StatsChart({ data, elements, title }: StatsChartProps) {
  // Kita asumsikan data harian untuk komponen ini sekarang
  const xAxisDataKey = data?.[0]?.day ? "day" : "timestamp_hour";

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer>
        {/* 👇 Gunakan ComposedChart */}
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey={xAxisDataKey} tickFormatter={formatXAxisAsDay} fontSize={12} />
          <YAxis yAxisId="left" fontSize={12} />
          <YAxis yAxisId="right" orientation="right" fontSize={12} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString("en-US", { dateStyle: "medium" })} />
          <Legend />

          {elements.map((el) => {
            if (el.type === "line") {
              return (
                <Line
                  key={el.dataKey}
                  yAxisId="right" // Kaitkan dengan sumbu Y kanan
                  type="monotone"
                  dataKey={el.dataKey}
                  name={el.name}
                  stroke={el.color}
                  strokeWidth={2}
                />
              );
            }
            if (el.type === "bar") {
              return (
                <Bar
                  key={el.dataKey}
                  yAxisId="left" // Kaitkan dengan sumbu Y kiri
                  dataKey={el.dataKey}
                  name={el.name}
                  fill={el.color}
                >
                  <LabelList dataKey={el.dataKey} position="top" fontSize={10} formatter={(label) => (typeof label === "number" ? label.toLocaleString() : label)} />
                </Bar>
              );
            }
            return null;
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
