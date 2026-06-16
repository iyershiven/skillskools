import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Dumbbell,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Homework", href: "/student/homework", icon: BookOpen },
  { label: "AI Tutor", href: "/student/ai-tutor", icon: Brain },
  { label: "Practice", href: "/student/practice", icon: Dumbbell },
  { label: "My Progress", href: "/student/progress", icon: TrendingUp },
];

const statCards = [
  { label: "Today's Homework", value: "3", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Pending", value: "5", color: "bg-red-50 text-red-700 border-red-200" },
  { label: "Completed", value: "12", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "AI Doubts Asked", value: "8", color: "bg-blue-50 text-blue-700 border-blue-200" },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardShell navItems={navItems} title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <p className="text-blue-100 text-sm font-medium mb-1">Good morning 👋</p>
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-blue-100 mt-1 text-sm">
            You have <span className="font-bold text-white">3 homework assignments</span> due today.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl border p-5 ${card.color}`}
            >
              <p className="text-3xl font-extrabold">{card.value}</p>
              <p className="text-xs font-semibold mt-1 opacity-80">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Today's homework */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Today's Homework</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { subject: "Mathematics", title: "Fractions Worksheet", dueTime: "5:00 PM", status: "pending" },
              { subject: "Science", title: "Photosynthesis Questions", dueTime: "6:00 PM", status: "in_progress" },
              { subject: "English", title: "Grammar Practice", dueTime: "8:00 PM", status: "not_started" },
            ].map((hw) => (
              <div key={hw.title} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{hw.title}</p>
                    <p className="text-xs text-gray-500">{hw.subject} · Due {hw.dueTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    hw.status === "pending" ? "bg-amber-100 text-amber-700" :
                    hw.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {hw.status === "not_started" ? "Not Started" : hw.status === "in_progress" ? "In Progress" : "Pending"}
                  </span>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-800">
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Stuck on a question?</p>
              <p className="text-sm text-gray-500">Ask ClassMind AI for a hint — it will guide you step by step.</p>
            </div>
          </div>
          <a href="/student/ai-tutor" className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all flex-shrink-0">
            Ask AI Tutor
          </a>
        </div>
      </div>
    </DashboardShell>
  );
};

export default StudentDashboard;
