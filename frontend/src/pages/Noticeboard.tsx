import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/AuthProvider";
import { Megaphone, AlertCircle } from "lucide-react";

export default function Noticeboard() {
  const [notices, setNotices] = useState<any[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/notices").then((res) => {
      setNotices(res.data.notices);
      setLoading(false);
    });
  }, []);

  const canCreate = ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher"].includes(user?.role || "");

  return (
    <DashboardShell title="Noticeboard">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Noticeboard</h1>
          <p className="text-gray-500">Important announcements and updates.</p>
        </div>
        {canCreate && (
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90">
            + New Notice
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading notices...</p>
      ) : notices.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
          No notices found.
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
              <div className="mt-1">
                {notice.priority === "High" ? (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                ) : (
                  <Megaphone className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg text-gray-900">{notice.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{notice.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">
                    Posted by: {notice.author?.full_name} ({notice.author?.role})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
