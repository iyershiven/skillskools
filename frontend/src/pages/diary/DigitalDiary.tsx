import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/AuthProvider";
import { BookOpen, Star, AlertTriangle } from "lucide-react";

export default function DigitalDiary() {
  const [remarks, setRemarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // For simplicity in this demo, if the user is a student, we fetch their diary.
  // If a parent, we'd fetch their child's diary (mocked as sending their own ID for now to the backend which should handle it based on role mapping).
  // If a teacher, they'd select a student first, but for this component, we'll just show a placeholder or mock a student ID.
  const studentId = user?.role === "student" ? user._id : "mock-student-id";

  useEffect(() => {
    if (user?.role === "student" || user?.role === "parent") {
      api.get(`/diary/student/${studentId}`).then((res) => {
        setRemarks(res.data.remarks || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      setLoading(false); // Teachers would select a student from a list first
    }
  }, [user, studentId]);

  return (
    <DashboardShell title="Digital Diary">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Diary</h1>
          <p className="text-gray-500">Teacher remarks and daily logs.</p>
        </div>
      </div>

      {["teacher", "class_teacher", "subject_teacher", "principal"].includes(user?.role || "") ? (
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
          Please select a student from the directory to view or add to their Digital Diary.
        </div>
      ) : loading ? (
        <p className="text-gray-500">Loading diary entries...</p>
      ) : remarks.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
          Your diary is empty. Keep up the good work!
        </div>
      ) : (
        <div className="space-y-4">
          {remarks.map((remark) => (
            <div key={remark.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
              <div className="mt-1">
                {remark.priority === "High" ? (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                ) : (
                  <Star className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                    {remark.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(remark.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 text-sm mt-2 font-medium">{remark.message}</p>
                <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500 font-medium">
                  By {remark.author?.full_name} ({remark.author?.role})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
