import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, RefreshCw } from "lucide-react";

import { HomeworkSubmissionsView } from "./HomeworkSubmissionsView";

export function TeacherHomeworkList() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHw, setSelectedHw] = useState<any>(null);

  const fetchHomeworks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/homework");
      setHomeworks(data);
    } catch (error) {
      toast.error("Failed to load homework assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const toggleStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/homework/${id}/status`, { status: newStatus });
      toast.success(`Homework marked as ${newStatus}`);
      fetchHomeworks();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
    <Card className="shadow-sm border-gray-100 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Your Homework Assignments</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchHomeworks}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {loading ? (
          <div className="py-10 text-center text-muted-foreground">Loading...</div>
        ) : homeworks.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            No homework generated yet.
          </div>
        ) : (
          <div className="space-y-3">
            {homeworks.map((hw) => (
              <div
                key={hw.id}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{hw.title}</h4>
                    <p className="text-xs text-gray-500">
                      {hw.subjects?.name} • Class {hw.classes?.class_name} {hw.classes?.section} • {hw.chapter}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                    hw.status === "assigned" ? "bg-green-100 text-green-700" :
                    hw.status === "draft" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {hw.status}
                  </span>
                  
                  {hw.status === "draft" && (
                    <Button size="sm" onClick={() => toggleStatus(hw.id, "assigned")}>
                      Publish
                    </Button>
                  )}
                  {hw.status === "assigned" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setSelectedHw(hw)}>
                        View Submissions
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => toggleStatus(hw.id, "closed")}>
                        Close
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    
    <HomeworkSubmissionsView 
      open={!!selectedHw} 
      onOpenChange={(open) => !open && setSelectedHw(null)} 
      homeworkId={selectedHw?.id} 
      homeworkTitle={selectedHw?.title} 
    />
    </>
  );
}
