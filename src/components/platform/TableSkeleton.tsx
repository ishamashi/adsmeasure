// src/components/platform/TableSkeleton.tsx
import { Skeleton } from "@/components/ui/Skeleton";
import { Card, CardContent } from "@/components/ui/Card";

export function TableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-6 py-3">
                  <Skeleton className="h-4 w-32" />
                </th>
                <th className="px-6 py-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-28" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
