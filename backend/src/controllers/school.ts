import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// ─── createSchool ─────────────────────────────────────────────────────────────
// @route  POST /api/schools
// @access super_admin
export const createSchool = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, address, city, state, board, contactEmail, contactPhone, subscriptionPlan } =
      req.body;

    if (!name || !contactEmail) {
      res.status(400).json({ message: "name and contactEmail are required" });
      return;
    }

    const { data: school, error } = await supabaseAdmin
      .from("schools")
      .insert({
        name,
        address,
        city,
        state,
        board: board || "CBSE",
        subscription_plan: subscriptionPlan || "starter",
        subscription_status: "trial",
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to create school", error: error.message });
      return;
    }

    res.status(201).json({ school, message: "School created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── getSchools ───────────────────────────────────────────────────────────────
// @route  GET /api/schools
// @access super_admin
export const getSchools = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data: schools, error } = await supabaseAdmin
      .from("schools")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      res.status(400).json({ message: "Failed to fetch schools", error: error.message });
      return;
    }

    res.json({ schools });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── getSchoolById ────────────────────────────────────────────────────────────
// @route  GET /api/schools/:id
// @access super_admin or school_admin (own school)
export const getSchoolById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // school_admin can only view their own school
    if (req.user?.role === "school_admin" && id !== req.user.school_id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const { data: school, error } = await supabaseAdmin
      .from("schools")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !school) {
      res.status(404).json({ message: "School not found" });
      return;
    }

    res.json({ school });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── updateSchool ─────────────────────────────────────────────────────────────
// @route  PATCH /api/schools/:id
// @access super_admin
export const updateSchool = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Map camelCase to snake_case for Supabase
    const updateData: any = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.board) updateData.board = req.body.board;
    if (req.body.address) updateData.address = req.body.address;
    if (req.body.city) updateData.city = req.body.city;
    if (req.body.state) updateData.state = req.body.state;
    if (req.body.subscriptionPlan) updateData.subscription_plan = req.body.subscriptionPlan;
    if (req.body.subscriptionStatus) updateData.subscription_status = req.body.subscriptionStatus;
    if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;
    
    updateData.updated_at = new Date().toISOString();

    const { data: school, error } = await supabaseAdmin
      .from("schools")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error || !school) {
      res.status(404).json({ message: "School not found or failed to update" });
      return;
    }

    res.json({ school, message: "School updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
