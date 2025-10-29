// src/components/platform/reports/PeakTrafficChart.tsx
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PeakTrafficData {
  time: string;
  value: number;
}

interface PeakTrafficChartProps {
  data: PeakTrafficData[];
  title: string;
  dataKey: string;
  xAxisKey: string;
}

const PeakTrafficChart: React.FC<PeakTrafficChartProps> = ({ data, title, dataKey, xAxisKey }) => {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xAxisKey} fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey={dataKey} name="Total Traffic" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
