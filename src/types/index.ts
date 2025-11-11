// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: number;
  api_key: string;
  created_at: string;
}

export interface Device {
  id: number;
  name: string;
  device_uid: string;
  device_type_id: number;
  status: string;
  location_id: number; 
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  created_at: string;
}
