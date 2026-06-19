import DashboardShell from "@/components/layout/DashboardShell";
import { CreditCard, Building2, Activity, Settings, TrendingUp, Users, MessageSquare } from "lucide-react";

const navItems = [
  { label: "Schools", href: "/super-admin/dashboard", icon: Building2 },
  { label: "Plans", href: "/super-admin/plans", icon: CreditCard },
  { label: "Usage", href: "/super-admin/usage", icon: Activity },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

const SuperAdminUsage = () => {
  return (
    <DashboardShell navItems={navItems} title="Platform Usage">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI & Platform Usage</h2>
          <p className="text-gray-500 text-sm mt-1">Track API consumption and platform engagement metrics.</p>
        </div>

        {/* Top level metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total AI Queries (This Month)</p>
              <p className="text-2xl font-extrabold text-gray-900">45,281</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Users (Daily Avg)</p>
              <p className="text-2xl font-extrabold text-gray-900">2,840</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Est. API Cost (This Month)</p>
              <p className="text-2xl font-extrabold text-gray-900">$342.50</p>
            </div>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Daily AI Queries</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end justify-between gap-2">
            {/* Fake bar chart */}
            {Array.from({ length: 30 }).map((_, i) => {
              const height = 20 + Math.random() * 80;
              return (
                <div key={i} className="w-full bg-blue-100 rounded-t-sm hover:bg-blue-600 transition-colors" style={{ height: `${height}%` }}></div>
              );
            })}
          </div>
        </div>

        {/* Usage by School table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Top Usage by School</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">School Name</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Queries Used</th>
                <th className="px-6 py-3 font-medium">Limit</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Green Valley Public School</td>
                <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">Growth</span></td>
                <td className="px-6 py-4">12,450</td>
                <td className="px-6 py-4">Unlimited</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">Healthy</span></td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">St. Xavier's High School</td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Starter</span></td>
                <td className="px-6 py-4">980</td>
                <td className="px-6 py-4">1,000</td>
                <td className="px-6 py-4"><span className="text-amber-600 font-medium">Warning (98%)</span></td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">DAV Public School</td>
                <td className="px-6 py-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">Enterprise</span></td>
                <td className="px-6 py-4">28,110</td>
                <td className="px-6 py-4">Unlimited</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">Healthy</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SuperAdminUsage;
