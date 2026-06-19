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
import { useParams, useNavigate } from "react-router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Homework", href: "/student/homework", icon: BookOpen },
  { label: "AI Tutor", href: "/student/ai-tutor", icon: Brain },
  { label: "Practice", href: "/student/practice", icon: Dumbbell },
  { label: "My Progress", href: "/student/progress", icon: TrendingUp },
];

const StudentHomeworkAttemptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [homework, setHomework] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const { data } = await api.get(`/homework/${id}`);
        setHomework(data);
      } catch (error) {
        toast.error("Failed to load homework details.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomework();
  }, [id]);

  const handleOptionSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!homework) return;

    // Check if all answered
    if (Object.keys(answers).length < homework.homework_questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const formattedAnswers = Object.keys(answers).map((qId) => ({
      questionId: qId,
      answer: answers[qId],
    }));

    try {
      setSubmitting(true);
      await api.post(`/homework/${id}/submit`, { answers: formattedAnswers });
      toast.success("Homework submitted successfully!");
      navigate("/student/homework");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit homework.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <DashboardShell navItems={navItems} title="Loading..."><div className="p-10">Loading...</div></DashboardShell>;
  }

  if (!homework) {
    return <DashboardShell navItems={navItems} title="Not Found"><div className="p-10">Homework not found.</div></DashboardShell>;
  }

  return (
    <DashboardShell navItems={navItems} title={`Attempt: ${homework.title}`}>
      <div className="max-w-3xl mx-auto space-y-6 pb-10">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{homework.title}</h2>
            <p className="text-sm text-gray-500">{homework.subjects?.name} • {homework.chapter}</p>
          </div>
          <div className="text-right">
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
              {homework.homework_questions?.length || 0} Questions
            </span>
          </div>
        </div>

        {homework.homework_questions?.map((q: any, index: number) => (
          <Card key={q.id}>
            <CardHeader className="pb-3 border-b border-gray-50">
              <CardTitle className="text-lg leading-relaxed">
                <span className="mr-2 text-gray-400 font-medium">{index + 1}.</span>
                {q.question_text}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <RadioGroup
                value={answers[q.id]}
                onValueChange={(val) => handleOptionSelect(q.id, val)}
                className="space-y-3"
              >
                {q.options.map((opt: string, i: number) => (
                  <div key={i} className="flex items-center space-x-3 border p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={opt} id={`${q.id}-${i}`} />
                    <Label htmlFor={`${q.id}-${i}`} className="flex-1 cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate("/student/homework")}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Homework"}
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
};

export default StudentHomeworkAttemptPage;
