// src/components/platform/Header.tsx
"use client";

import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation"; // Hook untuk mendapatkan path saat ini

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname(); // Contoh: "/dashboard" atau "/locations"

  // Fungsi sederhana untuk mengubah path menjadi judul yang lebih rapi
  const getPageTitle = (path: string) => {
    if (path === "/dashboard") return "Dashboard";
    const title = path.replace("/", "").charAt(0).toUpperCase() + path.slice(2);
    return title;
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md">
      {/* Kolom Kiri: Judul Halaman Dinamis */}
      <div>
        <h1 className="text-xl font-semibold font-display text-gray-800">{getPageTitle(pathname)}</h1>
      </div>

      {/* Kolom Kanan: Search, Notifikasi, dan Profil Pengguna */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        {/* <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="search" placeholder="Search..." className="h-9 w-64 rounded-button border bg-gray-50 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none" />
        </div> */}

        {/* Tombol Notifikasi */}
        {/* <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button> */}

        {/* Separator */}
        {/* <div className="h-6 w-px bg-gray-200"></div> */}

        {/* Profil Pengguna & Logout */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-white">
              <span>{user.name?.charAt(0).toUpperCase()}</span>
            </div>

            {/* Info Pengguna */}
            <div className="hidden text-right lg:block">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Tombol Logout */}
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          // Placeholder loading
          <div className="h-9 w-48 animate-pulse rounded-md bg-gray-200"></div>
        )}
      </div>
    </header>
  );
}
