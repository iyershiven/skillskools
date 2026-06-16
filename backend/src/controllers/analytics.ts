import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @desc    Get Student Analytics
// @route   GET /api/analytics/student/:id
export const getStudentAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id; // This is the profile.id
    const user = req.user;

    // Optional Security: Verify parent_student_map or if student is self
    if (user?.role === "parent") {
      const { data: map } = await supabaseAdmin
        .from("parent_student_map")
        .select()
        .eq("parent_id", user.id)
        .eq("student_id", studentId)
        .single();
      if (!map) {
        res.status(403).json({ message: "Not authorized to view this student" });
        return;
      }
    } else if (user?.role === "student" && user.id !== studentId) {
      res.status(403).json({ message: "Not authorized to view another student" });
      return;
    }

    // Fetch homework submissions
    const { data: submissions } = await supabaseAdmin
      .from("homework_submissions")
      .select("score, status, homework(title)")
      .eq("student_id", studentId);

    // Fetch learning gaps
    const { data: gaps } = await supabaseAdmin
      .from("learning_gaps")
      .select("topic, weakness_score")
      .eq("student_id", studentId);

    res.json({ submissions, learning_gaps: gaps });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get Class Analytics
// @route   GET /api/analytics/class/:id
export const getClassAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const classId = req.params.id;
    const user = req.user;

    if (!user?.school_id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    // Fetch students in class
    const { data: students } = await supabaseAdmin
      .from("students")
      .select("profile_id")
      .eq("class_id", classId)
      .eq("school_id", user.school_id);

    // Fetch homework for class
    const { data: homework } = await supabaseAdmin
      .from("homework")
      .select("id, title, status")
      .eq("class_id", classId)
      .eq("school_id", user.school_id);

    res.json({
      student_count: students?.length || 0,
      homework_assigned: homework?.length || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get School Analytics
// @route   GET /api/analytics/school/:id
export const getSchoolAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const schoolId = req.params.id;
    const user = req.user;

    if (user?.role !== "super_admin" && user?.school_id !== schoolId) {
      res.status(403).json({ message: "Unauthorized to view this school" });
      return;
    }

    const [
      { count: studentCount },
      { count: teacherCount },
      { count: homeworkCount },
    ] = await Promise.all([
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).eq("school_id", schoolId).eq("role", "student"),
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).eq("school_id", schoolId).eq("role", "teacher"),
      supabaseAdmin.from("homework").select("*", { count: "exact", head: true }).eq("school_id", schoolId)
    ]);

    res.json({
      total_students: studentCount || 0,
      total_teachers: teacherCount || 0,
      total_homework_created: homeworkCount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
