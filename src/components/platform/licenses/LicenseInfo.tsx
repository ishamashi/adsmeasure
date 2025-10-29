// src/components/platform/licenses/LicenseInfo.tsx
import { Badge } from "@/components/ui/Badge";

export function LicenseInfo({ license }: { license: any }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Status</span>
        <Badge variant={license.license_status === "active" ? "default" : "destructive"}>{license.license_status}</Badge>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Tier</span>
        <span className="font-medium">{license.license_tier_name}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Next Billing Date</span>
        <span className="font-medium">{new Date(license.license_expires_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
