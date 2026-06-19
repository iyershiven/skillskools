import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @route  GET /api/diary/student/:studentId
// @access Principal, Class Teacher, Subject Teacher, Parent, Student (Own)
export const getStudentDiary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;

    // 1. Fetch or create digital diary for the student
    let { data: diary, error: diaryError } = await supabaseAdmin
      .from("digital_diaries")
      .select("*")
      .eq("student_id", studentId)
      .single();

    if (diaryError && diaryError.code === "PGRST116") {
      // Doesn't exist, create it if they have permission (we will assume if they can read it, they can init it, but typically it should be seeded)
      const { data: student } = await supabaseAdmin.from("students").select("school_id").eq("id", studentId).single();
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      const { data: newDiary, error: insertError } = await supabaseAdmin
        .from("digital_diaries")
        .insert({ student_id: studentId, school_id: student.school_id })
        .select()
        .single();
      
      if (insertError) {
        res.status(500).json({ message: "Failed to initialize diary" });
        return;
      }
      diary = newDiary;
    } else if (diaryError) {
      res.status(500).json({ message: "Error fetching diary", error: diaryError.message });
      return;
    }

    // 2. Fetch remarks for the diary
    const { data: remarks, error: remarksError } = await supabaseAdmin
      .from("remarks")
      .select(`
        *,
        author:profiles(full_name, role)
      `)
      .eq("diary_id", diary.id)
      .order("created_at", { ascending: false });

    if (remarksError) {
      res.status(500).json({ message: "Error fetching remarks", error: remarksError.message });
      return;
    }

    res.json({ diary, remarks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route  POST /api/diary/remark
// @access Principal, Class Teacher, Subject Teacher
export const addRemark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { studentId, category, message, priority } = req.body;
    const authorId = req.user?.id;

    if (!studentId || !message) {
      res.status(400).json({ message: "studentId and message are required" });
      return;
    }

    // 1. Get or create diary
    let { data: diary } = await supabaseAdmin
      .from("digital_diaries")
      .select("*")
      .eq("student_id", studentId)
      .single();

    if (!diary) {
      const { data: student } = await supabaseAdmin.from("students").select("school_id").eq("id", studentId).single();
      const { data: newDiary } = await supabaseAdmin
        .from("digital_diaries")
        .insert({ student_id: studentId, school_id: student?.school_id })
        .select()
        .single();
      diary = newDiary;
    }

    // 2. Insert remark
    const { data: remark, error } = await supabaseAdmin
      .from("remarks")
      .insert({
        diary_id: diary.id,
        author_id: authorId,
        category: category || "General",
        message,
        priority: priority || "Normal"
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to add remark", error: error.message });
      return;
    }

    res.status(201).json({ remark, message: "Remark added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
