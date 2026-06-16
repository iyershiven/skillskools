import { type Request, type Response, type NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase.ts";

// Minimal Profile interface matching our Supabase schema
export interface IProfile {
  id: string;
  auth_user_id: string;
  school_id: string | null;
  full_name: string;
  email: string;
  role: "super_admin" | "school_admin" | "teacher" | "student" | "parent";
}

export interface AuthRequest extends Request {
  user?: IProfile;
  supabaseToken?: string;
}

// ─── protect ─────────────────────────────────────────────────────────────────
// Validates JWT from Authorization header and attaches user profile to request
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // Check Authorization header (Bearer token)
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    // 1. Verify token with Supabase Auth
    const { data: { user: authUser }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !authUser) {
      res.status(401).json({ message: "Not authorized, token invalid or expired" });
      return;
    }

    // 2. Fetch application profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("auth_user_id", authUser.id)
      .single();

    if (profileError || !profile) {
      res.status(401).json({ message: "Not authorized, profile not found" });
      return;
    }

    // 3. Attach profile and raw token to request
    req.user = profile as IProfile;
    req.supabaseToken = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ─── authorize ────────────────────────────────────────────────────────────────
// Role-based access: pass allowed roles list
export const authorize = (roles: IProfile["role"][]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Role '${req.user.role}' is not authorized for this action`,
      });
      return;
    }

    next();
  };
};

// ─── requireSchool ────────────────────────────────────────────────────────────
// Ensures non-super_admin users have a school_id
export const requireSchool = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  if (req.user.role !== "super_admin" && !req.user.school_id) {
    res.status(403).json({ message: "User is not associated with a school" });
    return;
  }
  next();
};
