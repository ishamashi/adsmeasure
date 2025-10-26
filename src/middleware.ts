// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ambil token dari cookies
  const token = request.cookies.get("token")?.value;

  // Dapatkan path yang diminta
  const { pathname } = request.nextUrl;

  // Definisikan rute publik dan rute yang dilindungi
  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/" || // Halaman landing utama
    pathname === "/solutions" ||
    pathname === "/features" ||
    pathname === "/pricing" ||
    pathname === "/contact";

  // Jika ada token dan pengguna mencoba mengakses halaman publik (misal: /login)
  // Arahkan mereka ke dashboard karena mereka sudah login
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika tidak ada token dan pengguna mencoba mengakses rute yang dilindungi
  // Arahkan mereka ke halaman login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika tidak ada kondisi di atas yang terpenuhi, lanjutkan seperti biasa
  return NextResponse.next();
}

// Konfigurasi matcher: jalankan middleware di semua rute KECUALI aset statis
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
