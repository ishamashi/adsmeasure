import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Buat nonce acak untuk setiap request. Ini adalah kunci untuk CSP yang aman.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // 2. Buat Content Security Policy (CSP) header.
  // Kebijakan ini sangat ketat untuk keamanan maksimal.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'"};
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim(); // Membersihkan spasi ekstra

  // 3. Clone header request dan siapkan response baru.
  // Kita tidak bisa langsung memodifikasi header request, jadi kita clone.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce); // Mengirim nonce ke komponen server jika diperlukan
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // 4. Buat response awal yang akan kita modifikasi.
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 5. Tambahkan header keamanan lainnya ke response.
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return response;
}

// Konfigurasi matcher untuk menentukan path mana yang akan dijalankan oleh middleware.
// Ini penting untuk performa agar tidak berjalan pada file statis atau API.
export const config = {
  matcher: [
    /*
     * Cocokkan semua path request, KECUALI untuk:
     * - Rute API (api/)
     * - Aset statis Next.js (_next/static/)
     * - File gambar Next.js (_next/image/)
     * - File aset di folder public (favicon.ico, dll)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
