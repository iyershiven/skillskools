import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CheckCircle2, User, Clock } from "lucide-react";

export function HomeworkSubmissionsView({ 
  homeworkId, 
  homeworkTitle,
  open, 
  onOpenChange 
}: { 
  homeworkId: string; 
  homeworkTitle: string;
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && homeworkId) {
      fetchSubmissions();
    }
  }, [open, homeworkId]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/homework/${homeworkId}/submissions`);
      setSubmissions(data || []);
    } catch (error) {
      toast.error("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Submissions: {homeworkTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto mt-4">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
              No submissions yet.
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center p-4 border rounded-xl bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{sub.students?.users?.name || "Unknown Student"}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sub.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      {sub.score} Pts
                    </div>
                    <p className="text-xs text-gray-500 capitalize">{sub.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
