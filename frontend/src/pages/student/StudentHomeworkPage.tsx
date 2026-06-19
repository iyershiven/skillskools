import DashboardShell from "@/components/layout/DashboardShell";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Dumbbell,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Homework", href: "/student/homework", icon: BookOpen },
  { label: "AI Tutor", href: "/student/ai-tutor", icon: Brain },
  { label: "Practice", href: "/student/practice", icon: Dumbbell },
  { label: "My Progress", href: "/student/progress", icon: TrendingUp },
];

const StudentHomeworkPage = () => {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const { data } = await api.get("/homework");
        setHomeworks(data);
      } catch (error) {
        toast.error("Failed to fetch homework.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeworks();
  }, []);

  return (
    <DashboardShell navItems={navItems} title="My Homework">
      <div className="space-y-6 h-full flex flex-col pb-6">
        <div>
          <h2 className="text-2xl font-bold">Assigned Homework</h2>
          <p className="text-gray-500">Complete your assignments before the deadline.</p>
        </div>

        <Card className="flex-1 overflow-auto shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle>To Do</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : homeworks.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
                No homework assigned yet!
              </div>
            ) : (
              <div className="space-y-3">
                {homeworks.map((hw) => (
                  <div key={hw.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{hw.title}</h4>
                        <p className="text-sm text-gray-500">{hw.subjects?.name} • {hw.chapter}</p>
                      </div>
                    </div>
                    <Button onClick={() => navigate(`/student/homework/${hw.id}`)}>
                      Attempt
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
};

export default StudentHomeworkPage;
