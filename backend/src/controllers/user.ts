import { type Request, type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private (Admin only)
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    // Admins creating users default to their own school, super_admin requires explicit school
    const schoolId = req.user?.role === "super_admin" ? req.body.schoolId : req.user?.school_id;

    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "name, email, password and role are required" });
      return;
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      res.status(400).json({ message: authError?.message || "Failed to create user in Auth" });
      return;
    }

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        auth_user_id: authData.user.id,
        school_id: schoolId || null,
        full_name: name,
        email: email,
        role: role,
      })
      .select()
      .single();

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      res.status(500).json({ message: "Failed to create user profile", error: profileError.message });
      return;
    }

    res.status(201).json({ user: profileData, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profileId = req.params.id;
    const { name, role } = req.body;

    const updateData: any = {};
    if (name) updateData.full_name = name;
    if (role) updateData.role = role;

    const { data: updatedProfile, error } = await supabaseAdmin
      .from("profiles")
      .update(updateData)
      .eq("id", profileId)
      .select()
      .single();

    if (error || !updatedProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ user: updatedProfile, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get all users (With Pagination & Filtering)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const role = req.query.role as string;
    const search = req.query.search as string;

    let query = supabaseAdmin.from("profiles").select("*", { count: "exact" });

    // Restrict school admins to their own school
    if (req.user?.role !== "super_admin") {
      query = query.eq("school_id", req.user?.school_id);
    }

    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Pagination (0-indexed for Supabase)
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order("created_at", { ascending: false });

    const { data: users, count, error } = await query;

    if (error) {
      res.status(400).json({ message: "Failed to fetch users", error: error.message });
      return;
    }

    res.json({
      users,
      pagination: {
        total: count || 0,
        page,
        pages: Math.ceil((count || 0) / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profileId = req.params.id;

    // Fetch profile to get auth_user_id
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from("profiles")
      .select("auth_user_id")
      .eq("id", profileId)
      .single();

    if (fetchError || !profile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete from Supabase Auth (cascade will delete profile and related rows)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(profile.auth_user_id);

    if (deleteError) {
      res.status(500).json({ message: "Failed to delete user", error: deleteError.message });
      return;
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Forward generic auth operations to auth router (for compatibility if needed)
export const login = async (_req: Request, res: Response) => res.status(400).json({ message: "Use /api/auth/login" });
export const logoutUser = async (_req: Request, res: Response) => res.status(400).json({ message: "Use /api/auth/logout" });
export const getUserProfile = async (_req: Request, res: Response) => res.status(400).json({ message: "Use /api/auth/me" });
