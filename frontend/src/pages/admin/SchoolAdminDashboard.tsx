import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  CreditCard,
  Building2,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Classes", href: "/admin/classes", icon: Building2 },
  { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Subscription", href: "/admin/subscription", icon: CreditCard },
];

const statCards = [
  { label: "Total Students", value: "248", sub: "Across 6 classes", icon: Users, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Total Teachers", value: "18", sub: "Active this term", icon: GraduationCap, color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Active Classes", value: "6", sub: "Grades 6–8", icon: Building2, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Completion Rate", value: "87%", sub: "Homework this week", icon: CheckCircle, color: "bg-purple-50 text-purple-700 border-purple-200" },
];

const SchoolAdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardShell navItems={navItems} title="School Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
          <p className="text-indigo-100 text-sm font-medium mb-1">School Admin 🏫</p>
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-indigo-100 mt-1 text-sm">
            Green Valley Public School · CBSE · Grades 6–8
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c) => (
            <div key={c.label} className={`rounded-2xl border p-5 ${c.color}`}>
              <c.icon className="w-5 h-5 mb-2 opacity-60" />
              <p className="text-3xl font-extrabold">{c.value}</p>
              <p className="text-xs font-bold mt-0.5">{c.label}</p>
              <p className="text-xs opacity-60 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Subject performance preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Subject Performance</h3>
            <a href="/admin/reports" className="text-xs text-blue-600 font-semibold">Full Report →</a>
          </div>
          <div className="p-5 space-y-4">
            {[
              { subject: "Mathematics", avg: 72, color: "bg-blue-500" },
              { subject: "Science", avg: 81, color: "bg-green-500" },
              { subject: "English", avg: 68, color: "bg-purple-500" },
            ].map((s) => (
              <div key={s.subject}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{s.subject}</span>
                  <span className="font-bold text-gray-900">{s.avg}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${s.color} h-2 rounded-full transition-all`}
                    style={{ width: `${s.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Subscription</p>
            <p className="font-bold text-gray-900">Growth Plan</p>
            <p className="text-sm text-gray-500">Renews on 31 March 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Active</span>
            <a href="/admin/subscription" className="text-xs text-blue-600 font-semibold hover:text-blue-800">Manage →</a>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SchoolAdminDashboard;
