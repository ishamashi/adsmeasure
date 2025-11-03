// src/components/platform/Sidebar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, LayoutDashboard, MapPin, Settings, BarChartHorizontal, Users, KeyRound, Layers } from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
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

      {user && user.role < 20 && (
        <div className="mt-8">
          <span className="px-3 text-xs font-semibold uppercase text-gray-400">Admin</span>
          <nav className="mt-2 flex flex-col gap-1">
            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <Users className="w-5 h-5" />
              <span>User Management</span>
            </Link>
            <Link href="/admin/licenses" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <KeyRound className="w-5 h-5" />
              <span>License Management</span>
            </Link>
            <Link href="/admin/tiers" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
              <span>Tier Management</span>
            </Link>
          </nav>
        </div>
      )}

      <div className="mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
