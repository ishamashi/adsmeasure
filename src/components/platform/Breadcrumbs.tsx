// src/components/platform/Breadcrumbs.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import useSWR from "swr";
import api from "@/lib/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const BreadcrumbItem = ({ href, children, isLast }: { href: string; children: React.ReactNode; isLast: boolean }) => (
  <li className="inline-flex items-center">
    {isLast ? (
      <span className="font-semibold text-gray-800">{children}</span>
    ) : (
      <Link href={href} className="text-gray-500 hover:text-primary">
        {children}
      </Link>
    )}
    {!isLast && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
  </li>
);

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Fetch data dinamis jika diperlukan
  const isLocationDetailPage = pathSegments[0] === "locations" && pathSegments.length > 1;
  const isDeviceDetailPage = pathSegments[0] === "devices" && pathSegments.length > 1;

  const { data: locationData } = useSWR(isLocationDetailPage ? `/locations/${pathSegments[1]}` : null, fetcher);
  const { data: deviceData } = useSWR(isDeviceDetailPage ? `/devices/${pathSegments[1]}` : null, fetcher);

  // Fungsi untuk mengubah nama segmen
  const getBreadcrumbName = (segment: string, index: number) => {
    if (index === 0) return segment.charAt(0).toUpperCase() + segment.slice(1);

    if (isLocationDetailPage && index === 1) return locationData?.name || `Location ${segment}`;
    if (isDeviceDetailPage && index === 1) return deviceData?.name || `Device ${segment}`;

    return segment;
  };

  if (pathSegments.length === 0 || pathSegments[0] === "dashboard") {
    return null; // Tidak menampilkan breadcrumbs di dashboard
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-sm">
        <BreadcrumbItem href="/dashboard" isLast={false}>
          <Home className="h-4 w-4" />
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          return (
            <BreadcrumbItem key={href} href={href} isLast={isLast}>
              {getBreadcrumbName(segment, index)}
            </BreadcrumbItem>
          );
        })}
      </ol>
    </nav>
  );
}
