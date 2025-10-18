// src/components/platform/Sidebar.tsx
import Link from "next/link";
import { BarChart3, LayoutDashboard, MapPin, Settings, BarChartHorizontal } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-dark text-white p-4 border-r border-slate-700">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold font-display">adsMeasure</span>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/locations" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <MapPin className="w-5 h-5" />
          <span>Locations</span>
        </Link>
        <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <BarChartHorizontal className="w-5 h-5" />
          <span>Analytics</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
