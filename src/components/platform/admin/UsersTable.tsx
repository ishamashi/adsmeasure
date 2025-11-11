// src/components/platform/admin/UsersTable.tsx
"use client";

import { Badge } from "@/components/ui/Badge";
import type { User } from "@/types";
import { ApiKeyDisplay } from "./ApiKeyDisplay";

interface UsersTableProps {
  users: User[];
  onRegenerateKey: (userId: string) => void;
  isProcessing: boolean;
}

export function UsersTable({ users, onRegenerateKey, isProcessing }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* PASTIKAN TIDAK ADA SPASI, BARIS BARU, ATAU KOMENTAR ANTARA <tr> DAN <th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              API Key
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Joined
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              {/* PASTIKAN TIDAK ADA SPASI, BARIS BARU, ATAU KOMENTAR ANTARA <tr> DAN <td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.api_key ? <ApiKeyDisplay apiKey={user.api_key} onRegenerate={() => onRegenerateKey(user.id)} isRegenerating={isProcessing} /> : <span className="text-xs text-gray-400">No key generated</span>}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role < 20 ? <Badge variant="destructive">Admin</Badge> : <Badge variant="secondary">User</Badge>}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
