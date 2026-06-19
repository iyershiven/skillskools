import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Dumbbell,
  TrendingUp,
} from "lucide-react";
import { AIDoubtSolver } from "@/components/student/AIDoubtSolver";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Homework", href: "/student/homework", icon: BookOpen },
  { label: "AI Tutor", href: "/student/ai-tutor", icon: Brain },
  { label: "Practice", href: "/student/practice", icon: Dumbbell },
  { label: "My Progress", href: "/student/progress", icon: TrendingUp },
];

const AITutorPage = () => {
  return (
    <DashboardShell navItems={navItems} title="AI Tutor">
      <div className="flex flex-col items-center justify-center py-10 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Need Help?</h2>
          <p className="text-gray-500 max-w-lg">
            ClassMind AI is here to give you hints and guide you to the right answer. It won't solve the homework for you, but it will help you understand it!
          </p>
        </div>
        <AIDoubtSolver />
      </div>
    </DashboardShell>
  );
};

export default AITutorPage;
