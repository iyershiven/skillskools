import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @route  GET /api/notices
// @access All Authenticated Users
export const getNotices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const schoolId = req.user?.school_id;
    const role = req.user?.role;

    let query = supabaseAdmin
      .from("notices")
      .select(`
        *,
        author:profiles(full_name, role)
      `)
      .order("created_at", { ascending: false });

    if (role !== "super_admin") {
      // Only get global notices (school_id is null) or notices for this school
      query = query.or(`school_id.is.null,school_id.eq.${schoolId}`);
    }

    const { data: notices, error } = await query;

    if (error) {
      res.status(400).json({ message: "Failed to fetch notices", error: error.message });
      return;
    }

    res.json({ notices });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route  POST /api/notices
// @access Super Admin, Principal, Class Teacher, Subject Teacher
export const createNotice = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, classId } = req.body;
    const authorId = req.user?.id;
    const role = req.user?.role;
    
    // Super admins can create global notices (no schoolId), others create for their school
    const schoolId = role === "super_admin" && !req.body.schoolId ? null : req.user?.school_id;

    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
      return;
    }

    const { data: notice, error } = await supabaseAdmin
      .from("notices")
      .insert({
        school_id: schoolId,
        class_id: classId || null,
        author_id: authorId,
        title,
        description,
        priority: priority || "Normal"
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to create notice", error: error.message });
      return;
    }

    res.status(201).json({ notice, message: "Notice posted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
