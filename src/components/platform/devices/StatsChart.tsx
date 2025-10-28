// src/components/platform/devices/StatsChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartLine {
  dataKey: string;
  name: string;
  color: string;
}

interface StatsChartProps {
  data: any[];
  lines: ChartLine[];
  title: string;
}

const formatXAxisAsHour = (tickItem: string) => {
  return new Date(tickItem).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
};

const formatXAxisAsDay = (tickItem: string) => {
  return new Date(tickItem).toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

export function StatsChart({ data, lines, title }: StatsChartProps) {
  const xAxisDataKey = data?.[0]?.day ? 'day' : 'timestamp_hour';
  const xAxisFormatter = xAxisDataKey === 'day' ? formatXAxisAsDay : formatXAxisAsHour;
  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey={xAxisDataKey} tickFormatter={xAxisFormatter} fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Legend />
          {lines.map((line) => (
            <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} name={line.name} stroke={line.color} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
