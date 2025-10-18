// src/app/(platform)/layout.tsx
import { Sidebar } from "@/components/platform/Sidebar";
import { Header } from "@/components/platform/Header";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
