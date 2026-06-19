import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { TeacherHomeworkList } from "@/components/teacher/TeacherHomeworkList";
import { CreateHomeworkModal } from "@/components/teacher/CreateHomeworkModal";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "Create Homework", href: "/teacher/create-homework", icon: PlusCircle },
  { label: "Submissions", href: "/teacher/homework", icon: ClipboardList },
  { label: "Worksheet Generator", href: "/teacher/worksheet-generator", icon: Sparkles },
  { label: "Analytics", href: "/teacher/analytics", icon: BarChart3 },
];

const TeacherHomeworkPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <DashboardShell navItems={navItems} title="Homework Management">
      <div className="space-y-6 h-full flex flex-col pb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Homework & Assignments</h2>
            <p className="text-gray-500">Manage your generated homework and publish them to classes.</p>
          </div>
          <CreateHomeworkModal onSuccess={() => setRefreshKey(prev => prev + 1)} />
        </div>
        
        <div className="flex-1">
          <TeacherHomeworkList key={refreshKey} />
        </div>
      </div>
    </DashboardShell>
  );
};

export default TeacherHomeworkPage;
