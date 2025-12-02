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

export interface License {
  id: string;
  device_name: string;
  device_uid: string;
  user_name: string;
  tier_name: string;
  status: string;
  expires_at: string;
}

export interface TierFormData {
  id: string;
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
}

export interface ReportSummary {
  avgMale: string | number;
  avgFemale: string | number;
  avgChild: string | number;
  avgTeen: string | number;
  avgAdult: string | number;
  avgSenior: string | number;
  totalDwellA: number;
  totalDwellB: number;
  totalDwellC: number;
  totalPeople: number;
  totalImpressions: number;
  avgTrafficPerDay: number;
  avgPeoplePerDay: number;
}

export interface PeakHour {
  hour_of_day: number;
  average_traffic: number;
  [key: string]: unknown;
}

export interface PeakDay {
  day_name: string;
  total_traffic: number;
  [key: string]: unknown;
}

export interface ReportData {
  timeSeries: Record<string, unknown>[];
  summary: ReportSummary;
  peakDays: PeakDay[];
  peakHours: PeakHour[];
}
