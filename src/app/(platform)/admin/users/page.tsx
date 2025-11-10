// src/app/(platform)/admin/users/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { PageHeader } from "@/components/platform/PageHeader";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { UsersTable } from "@/components/platform/admin/UsersTable";
import { AddUserForm } from "@/components/platform/admin/AddUserForm";
import { TableSkeleton } from "@/components/platform/TableSkeleton";
import type { User } from "@/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function UserManagementPage() {
  const { data: users, error, isLoading, mutate } = useSWR<User[]>("/users", fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = async (data: any) => {
    const promise = () => api.post("/users", data);

    toast.promise(promise, {
      loading: "Creating new user...",
      success: (res) => {
        mutate(); // Refresh data tabel
        setIsModalOpen(false); // Tutup modal
        return `User "${res.data.name}" created successfully!`;
      },
      error: (err) => {
        return err.response?.data?.message || "Failed to create user.";
      },
    });
  };

  const renderContent = () => {
    if (isLoading) return <TableSkeleton />;
    if (error) return <p className="p-6 text-center text-red-500">Failed to load users.</p>;
    if (users && users.length > 0) {
      return <UsersTable users={users} />;
    }
    return <p className="p-6 text-center text-gray-500">No users found.</p>;
  };

  return (
    <>
      <PageHeader title="User Management" description="Add, view, and manage all users on the platform.">
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-0">{renderContent()}</CardContent>
      </Card>

      {/* Modal untuk Add User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg transform animate-scaleIn">
            <h2 className="text-xl font-bold mb-4">Create a New User</h2>
            <AddUserForm onSubmit={handleAddUser} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
