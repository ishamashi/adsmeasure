// src/components/platform/PageHeader.tsx
import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode; // Untuk menampung tombol aksi seperti "Add Location"
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-dark">{title}</h1>
        <p className="mt-1 text-gray-500">{description}</p>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}
