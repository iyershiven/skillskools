import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Sparkles,
  BarChart3,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

const navItems = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "Create Homework", href: "/teacher/create-homework", icon: PlusCircle },
  { label: "Submissions", href: "/teacher/homework", icon: ClipboardList },
  { label: "Worksheet Generator", href: "/teacher/worksheet-generator", icon: Sparkles },
  { label: "Analytics", href: "/teacher/analytics", icon: BarChart3 },
];

const statCards = [
  { label: "Assigned Classes", value: "3", sub: "6A, 7A, 8A", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "Active Homework", value: "7", sub: "Across all classes", color: "bg-green-50 border-green-200 text-green-700" },
  { label: "Pending Reviews", value: "23", sub: "Submissions to review", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { label: "AI Worksheets Made", value: "12", sub: "This month", color: "bg-purple-50 border-purple-200 text-purple-700" },
];

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardShell navItems={navItems} title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
          <p className="text-green-100 text-sm font-medium mb-1">Welcome back 👋</p>
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-green-100 mt-1 text-sm">
            You have <span className="font-bold text-white">23 submissions</span> waiting for review.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c) => (
            <div key={c.label} className={`rounded-2xl border p-5 ${c.color}`}>
              <p className="text-3xl font-extrabold">{c.value}</p>
              <p className="text-xs font-bold mt-0.5">{c.label}</p>
              <p className="text-xs opacity-60 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/teacher/create-homework", icon: PlusCircle, label: "Create Homework", color: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20" },
            { href: "/teacher/worksheet-generator", icon: Sparkles, label: "AI Worksheet Generator", color: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20" },
            { href: "/teacher/homework", icon: ClipboardList, label: "Review Submissions", color: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 p-4 rounded-2xl font-semibold text-sm shadow-lg transition-all hover:-translate-y-0.5 ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </a>
          ))}
        </div>

        {/* Recent homework */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Homework</h3>
            <a href="/teacher/homework" className="text-xs text-blue-600 font-semibold hover:text-blue-800">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { title: "Fractions Worksheet", class: "6A", subject: "Maths", submitted: 18, total: 25, status: "assigned" },
              { title: "Photosynthesis Questions", class: "7A", subject: "Science", submitted: 20, total: 28, status: "assigned" },
              { title: "Grammar Practice", class: "8A", subject: "English", submitted: 5, total: 30, status: "draft" },
            ].map((hw) => (
              <div key={hw.title} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{hw.title}</p>
                  <p className="text-xs text-gray-500">Class {hw.class} · {hw.subject}</p>
                </div>
                <div className="flex items-center gap-4">
                  {hw.status === "assigned" && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{hw.submitted}/{hw.total}</p>
                      <p className="text-xs text-gray-400">submitted</p>
                    </div>
                  )}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hw.status === "assigned" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {hw.status === "assigned" ? "Active" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default TeacherDashboard;
