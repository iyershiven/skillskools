import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @desc    Create a new Class
// @route   POST /api/classes
// @access  Private/Admin
export const createClass = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, grade, section } = req.body;
    const schoolId = req.user?.role === "super_admin" ? req.body.schoolId : req.user?.school_id;

    if (!name || !grade || !section || !schoolId) {
      res.status(400).json({ message: "name, grade, section, and schoolId are required" });
      return;
    }

    const { data: existingClass, error: findError } = await supabaseAdmin
      .from("classes")
      .select("id")
      .eq("class_name", name)
      .eq("school_id", schoolId)
      .maybeSingle();

    if (existingClass) {
      res.status(400).json({ message: "Class with this name already exists in this school." });
      return;
    }

    const { data: newClass, error } = await supabaseAdmin
      .from("classes")
      .insert({
        class_name: name,
        school_id: schoolId,
        grade,
        section,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to create class", error: error.message });
      return;
    }

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get All Classes
// @route   GET /api/classes
// @access  Private
export const getAllClasses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    let query = supabaseAdmin.from("classes").select(`
      *,
      schools ( name )
    `, { count: "exact" });

    // Restrict to user's school if not super_admin
    if (req.user?.role !== "super_admin") {
      query = query.eq("school_id", req.user?.school_id);
    }

    if (search) {
      query = query.ilike("class_name", `%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order("created_at", { ascending: false });

    const { data: classes, count, error } = await query;

    if (error) {
      res.status(400).json({ message: "Failed to fetch classes", error: error.message });
      return;
    }

    res.json({
      classes,
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

// @desc    Update Class
// @route   PUT /api/classes/:id
// @access  Private/Admin
export const updateClass = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const classId = req.params.id;
    const { name, grade, section } = req.body;

    const updateData: any = {};
    if (name) updateData.class_name = name;
    if (grade) updateData.grade = grade;
    if (section) updateData.section = section;
    updateData.updated_at = new Date().toISOString();

    const { data: updatedClass, error } = await supabaseAdmin
      .from("classes")
      .update(updateData)
      .eq("id", classId)
      .select()
      .single();

    if (error || !updatedClass) {
      res.status(404).json({ message: "Class not found" });
      return;
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Delete Class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
export const deleteClass = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const classId = req.params.id;
    
    const { error } = await supabaseAdmin
      .from("classes")
      .delete()
      .eq("id", classId);

    if (error) {
      res.status(404).json({ message: "Class not found or failed to delete" });
      return;
    }

    res.json({ message: "Class removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
