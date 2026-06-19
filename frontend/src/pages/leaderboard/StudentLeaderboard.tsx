import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import { Trophy, Medal } from "lucide-react";

export default function StudentLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboard/students").then((res) => {
      setLeaderboard(res.data.leaderboard);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardShell title="Student Leaderboard">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Leaderboard</h1>
          <p className="text-gray-500">Top performers based on academics and attendance.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading rankings...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Class</th>
                <th className="px-6 py-4 font-medium">House</th>
                <th className="px-6 py-4 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leaderboard.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {index === 0 && <Medal className="inline w-5 h-5 text-yellow-500 mr-1" />}
                    {index === 1 && <Medal className="inline w-5 h-5 text-gray-400 mr-1" />}
                    {index === 2 && <Medal className="inline w-5 h-5 text-amber-600 mr-1" />}
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{student.class}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {student.house}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-extrabold text-primary">
                    {student.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardShell>
  );
}
