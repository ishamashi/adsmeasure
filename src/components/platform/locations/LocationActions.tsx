// Versi Manual dari LocationActions.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

interface LocationActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function LocationActions({ onEdit, onDelete }: LocationActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menutup menu jika mengklik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md p-2 text-sm font-medium text-gray-500 hover:bg-gray-100">
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="right-0 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 z-10">
          <div className="p-2">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="group flex mb-1 w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="group flex w-full items-center px-4 py-2 text-sm text-danger hover:bg-danger hover:text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
