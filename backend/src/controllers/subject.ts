import { type Request, type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @desc    Create a new Subject
// @route   POST /api/subjects
// @access  Private/Admin
export const createSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, grade } = req.body;
    const schoolId = req.user?.role === "super_admin" ? req.body.schoolId : req.user?.school_id;

    if (!name || !schoolId) {
      res.status(400).json({ message: "name and schoolId are required" });
      return;
    }

    const { data: newSubject, error } = await supabaseAdmin
      .from("subjects")
      .insert({
        name,
        school_id: schoolId,
        grade,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to create subject", error: error.message });
      return;
    }

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get all Subjects
// @route   GET /api/subjects
// @access  Private
export const getAllSubjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    let query = supabaseAdmin.from("subjects").select("*", { count: "exact" });

    // Restrict to user's school if not super_admin
    if (req.user?.role !== "super_admin") {
      query = query.eq("school_id", req.user?.school_id);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order("created_at", { ascending: false });

    const { data: subjects, count, error } = await query;

    if (error) {
      res.status(400).json({ message: "Failed to fetch subjects", error: error.message });
      return;
    }

    res.json({
      subjects,
      pagination: {
        total: count || 0,
        page,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Update Subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
export const updateSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id;
    const { name, grade } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (grade) updateData.grade = grade;
    updateData.updated_at = new Date().toISOString();

    const { data: updatedSubject, error } = await supabaseAdmin
      .from("subjects")
      .update(updateData)
      .eq("id", subjectId)
      .select()
      .single();

    if (error || !updatedSubject) {
      res.status(404).json({ message: "Subject not found" });
      return;
    }

    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Delete Subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
export const deleteSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = req.params.id;
    
    const { error } = await supabaseAdmin
      .from("subjects")
      .delete()
      .eq("id", subjectId);

    if (error) {
      res.status(404).json({ message: "Subject not found or failed to delete" });
      return;
    }

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
