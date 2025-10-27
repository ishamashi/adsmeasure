// src/components/platform/locations/LocationsTable.tsx
// import { Button } from "@/components/ui/Button";
// import { MoreHorizontal } from "lucide-react";
import { LocationActions } from "./LocationActions";
import { useRouter } from "next/navigation";

// Definisikan tipe data untuk satu lokasi
interface Location {
  id: number;
  name: string;
  address: string;
  created_at: string;
}

interface LocationsTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
}

const TableRowLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <tr onClick={() => router.push(href)} className="cursor-pointer hover:bg-gray-50 transition-colors">
      {children}
    </tr>
  );
};

export function LocationsTable({ locations, onEdit, onDelete }: LocationsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Added
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <TableRowLink key={location.id} href={`/locations/${location.id}`}>
              {/* Kolom-kolom <td> Anda */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{location.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{location.address}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(location.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                {/* Kita hentikan propagasi agar klik di sini tidak menavigasi halaman */}
                <LocationActions onEdit={() => onEdit(location)} onDelete={() => onDelete(location)} />
              </td>
            </TableRowLink>
          ))}
        </tbody>
      </table>
    </div>
  );
}
