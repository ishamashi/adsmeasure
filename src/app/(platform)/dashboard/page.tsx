// src/app/(platform)/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Eye, Users, TrendingUp, MapPin } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-dark">Welcome Back, Admin!</h1>
        <p className="text-gray-500">Here's your performance summary for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250,345</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour Visitors</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-gray-500">At 8:00 PM - 9:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 / 50</div>
            <p className="text-xs text-gray-500">8 new locations this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder untuk chart yang lebih kompleks */}
      <Card>
        <CardHeader>
          <CardTitle>Impression Trends</CardTitle>
          <CardDescription>Monthly impression data from all locations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart will be rendered here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
