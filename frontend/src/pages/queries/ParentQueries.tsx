import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/AuthProvider";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ParentQueries() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/queries").then((res) => {
      setQueries(res.data.queries || []);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardShell title="Parent Queries">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Direct Queries</h1>
            <p className="text-gray-500">Communication with the Principal.</p>
          </div>
        </div>
        {user?.role === "parent" && (
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Send className="w-4 h-4" /> New Query
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading queries...</p>
        ) : queries.length === 0 ? (
          <p className="p-6 text-gray-500 text-center py-12">No queries found.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {queries.map((q) => (
              <div key={q.id} className="p-6 hover:bg-gray-50/50 transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{q.subject}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    q.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {q.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{q.message}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Sent by: {q.parent?.full_name}</span>
                  <span>{new Date(q.created_at).toLocaleDateString()}</span>
                </div>
                
                {user?.role === "principal" && q.status === "Open" && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <input type="text" placeholder="Type your reply to resolve..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Resolve & Email
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
