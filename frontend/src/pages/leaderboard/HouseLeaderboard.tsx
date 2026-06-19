import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import { Flag } from "lucide-react";

export default function HouseLeaderboard() {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboard/houses").then((res) => {
      setHouses(res.data.houses || []);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardShell title="House Leaderboard">
      <div className="mb-6 flex items-center gap-3">
        <Flag className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">House Championship</h1>
          <p className="text-gray-500">Current standings for the house cup.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-4 text-gray-500">Loading house standings...</p>
        ) : houses.length === 0 ? (
          <p className="col-span-4 text-gray-500">No houses configured for this school.</p>
        ) : (
          houses.map((house, index) => (
            <div key={house.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-2xl font-bold">
                #{index + 1}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">{house.name}</h3>
              <p className="text-3xl font-extrabold text-primary mt-2">{house.points}</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Points</p>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
