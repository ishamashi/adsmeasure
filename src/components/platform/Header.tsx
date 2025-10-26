// src/components/platform/Header.tsx
"use client"; // <-- TAMBAHKAN BARIS INI
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext"; // <-- Impor custom hook kita

export function Header() {
  const { user, logout } = useAuth(); // <-- Gunakan hook untuk mendapatkan data dan fungsi
  return (
    <header className="flex h-16 items-center justify-between bg-white shadow-card px-6">
      <div>
        {/* Placeholder untuk Breadcrumbs atau Judul Halaman */}
        <h1 className="text-xl font-semibold font-display text-dark">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="search" placeholder="Search locations..." className="pl-10 pr-4 py-2 w-64 rounded-button border bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        {/* Placeholder untuk User Dropdown */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold">
              <span>{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          // Tampilkan placeholder jika user belum termuat
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        )}
      </div>
    </header>
  );
}
