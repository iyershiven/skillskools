import { type Request, type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// ─── register ─────────────────────────────────────────────────────────────────
// @route  POST /api/auth/register
// @access Private (super_admin or school_admin)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, schoolId } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "name, email, password and role are required" });
      return;
    }

    // 1. Create user in Supabase Auth (auto-confirmed)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      res.status(400).json({ message: authError?.message || "Failed to create user in Auth" });
      return;
    }

    // 2. Insert profile in public.profiles table
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
      // Rollback auth user creation if profile fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      res.status(500).json({ message: "Failed to create user profile", error: profileError.message });
      return;
    }

    res.status(201).json({
      _id: profileData.id,
      name: profileData.full_name,
      email: profileData.email,
      role: profileData.role,
      schoolId: profileData.school_id,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── login ────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/login
// @access Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.session) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("auth_user_id", authData.user.id)
      .single();

    if (profileError || !profile) {
      res.status(401).json({ message: "Profile not found for this user" });
      return;
    }

    res.json({
      token: authData.session.access_token, // Frontend should store this to send as Bearer
      _id: profile.id,
      name: profile.full_name,
      email: profile.email,
      role: profile.role,
      schoolId: profile.school_id,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── logout ───────────────────────────────────────────────────────────────────
// @route  POST /api/auth/logout
// @access Public
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // If the frontend passes the token, we could sign out serverside.
    // However, usually the frontend handles clearing its own local session.
    res.json({ message: "Logged out successfully. Please clear local session." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── getMe ────────────────────────────────────────────────────────────────────
// @route  GET /api/auth/me
// @access Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.json({
      user: {
        _id: req.user.id, // Supabase profile ID
        name: req.user.full_name,
        email: req.user.email,
        role: req.user.role,
        schoolId: req.user.school_id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
