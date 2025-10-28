// src/components/platform/devices/DistributionPieChart.tsx
"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartData {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface DistributionPieChartProps {
  data: PieChartData[];
  title: string;
}

const COLORS = ["#2563eb", "#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

export function DistributionPieChart({ data, title }: DistributionPieChartProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const hasData = data && data.some((item) => item.value > 0);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      {!isClient ? (
        <div className="flex items-center justify-center h-full text-gray-400">Loading Chart...</div>
      ) : hasData ? (
        <ResponsiveContainer>
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 40 }}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={(props) => {
                const { name, percent } = props as { name?: string; percent?: number };
                return `${name ?? ""} ${(percent ? percent * 100 : 0).toFixed(0)}%`;
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} />
            <Legend wrapperStyle={{ paddingTop: "2px" }} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
      )}
    </div>
  );
}
