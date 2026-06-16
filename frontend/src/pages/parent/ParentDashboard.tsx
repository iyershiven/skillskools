import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

const navItems = [
  { label: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
  { label: "Homework Status", href: "/parent/homework", icon: BookOpen },
  { label: "Progress", href: "/parent/progress", icon: TrendingUp },
];

const ParentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardShell navItems={navItems} title="Parent Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 text-white">
          <p className="text-rose-100 text-sm font-medium mb-1">Parent Portal 👨‍👧</p>
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-rose-100 mt-1 text-sm">Tracking progress for your child</p>
        </div>

        {/* Child summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Child Summary</h3>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
              A
            </div>
            <div>
              <p className="font-bold text-gray-900">Arjun (Your Child)</p>
              <p className="text-sm text-gray-500">Class 7A · Green Valley Public School</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: "Homework Done", value: "12", color: "text-green-600" },
              { label: "Pending", value: "3", color: "text-amber-600" },
              { label: "AI Doubts", value: "8", color: "text-blue-600" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subject performance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Subject Performance</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { subject: "Mathematics", score: 68, trend: "⬇", trendColor: "text-red-500" },
              { subject: "Science", score: 82, trend: "⬆", trendColor: "text-green-500" },
              { subject: "English", score: 75, trend: "→", trendColor: "text-gray-500" },
            ].map((s) => (
              <div key={s.subject} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-700">{s.subject}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${s.score}%` }} />
                </div>
                <div className="flex items-center gap-1 w-16 text-right">
                  <span className="text-sm font-bold text-gray-900">{s.score}%</span>
                  <span className={`text-xs ${s.trendColor}`}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher remarks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Recent Teacher Remarks</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { teacher: "Mrs. Sharma", subject: "Mathematics", remark: "Arjun needs to practice fractions more. Good effort on the algebra section.", date: "Today" },
              { teacher: "Mr. Patel", subject: "Science", remark: "Excellent work on the photosynthesis chapter. Keep it up!", date: "Yesterday" },
            ].map((r) => (
              <div key={r.subject} className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-gray-900">{r.teacher} · {r.subject}</p>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600">{r.remark}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ParentDashboard;
