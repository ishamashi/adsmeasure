// src/types/index.ts

export interface Device {
  id: number;
  name: string;
  device_uid: string;
  device_type_id: number;
  status: string;
  location_id: number; // Tambahkan properti lain yang relevan
  created_at: string;
  updated_at: string;
}

// Anda juga bisa memindahkan tipe Location ke sini
export interface Location {
  id: number;
  name: string;
  address: string;
  created_at: string;
}
