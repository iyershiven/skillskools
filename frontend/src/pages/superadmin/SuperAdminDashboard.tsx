import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Activity,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

const navItems = [
  { label: "Schools", href: "/super-admin/dashboard", icon: Building2 },
  { label: "Plans", href: "/super-admin/plans", icon: CreditCard },
  { label: "Usage", href: "/super-admin/usage", icon: Activity },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardShell navItems={navItems} title="Super Admin">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
          <p className="text-purple-100 text-sm font-medium mb-1">ClassMind AI · Super Admin 🛡️</p>
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-purple-100 mt-1 text-sm">Manage all schools and subscriptions from here.</p>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Schools", value: "12", color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "Active Students", value: "3,241", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "AI Queries Today", value: "1,429", color: "bg-green-50 text-green-700 border-green-200" },
            { label: "MRR", value: "₹8.2L", color: "bg-amber-50 text-amber-700 border-amber-200" },
          ].map((c) => (
            <div key={c.label} className={`rounded-2xl border p-5 ${c.color}`}>
              <p className="text-3xl font-extrabold">{c.value}</p>
              <p className="text-xs font-semibold mt-1 opacity-80">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Schools list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between">
            <h3 className="font-bold text-gray-900">Active Schools</h3>
            <button className="text-xs text-blue-600 font-semibold">Manage All →</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: "Green Valley Public School", plan: "Growth", students: 248, status: "active" },
              { name: "St. Xavier's High School", plan: "Starter", students: 185, status: "active" },
              { name: "DAV Public School", plan: "Enterprise", students: 612, status: "active" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.students} students · {s.plan} plan</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full capitalize">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SuperAdminDashboard;
