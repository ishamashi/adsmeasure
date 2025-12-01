// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login" || pathname === "/" || pathname === "/solutions" || pathname === "/features" || pathname === "/pricing" || pathname === "/contact";
  const isAdminRoute = pathname.startsWith("/admin");

  if (token) {
    const decodedToken: { role: number } = jwtDecode(token);
    const userRole = decodedToken.role;

    if (isAdminRoute && userRole >= 20) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (isAdminRoute || !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path request, KECUALI untuk:
     * - Rute yang dimulai dengan /api
     * - Aset statis Next.js (_next/static)
     * - File gambar Next.js (_next/image)
     * - SEMUA file dengan ekstensi (misalnya .png, .svg, .txt, .webp)
     * - File aset di folder public (favicon.ico)
     */
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};
