import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";

// @route  GET /api/leaderboard/students
// @access All Authenticated Users
export const getStudentLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const schoolId = req.user?.school_id;

    // In a real app, you'd aggregate scores. For now, we mock points or use a DB view.
    // Assuming we have a view or we just fetch students and mock points for the demo.
    const { data: students, error } = await supabaseAdmin
      .from("students")
      .select(`
        id,
        roll_number,
        profile:profiles(full_name),
        class:classes(class_name),
        house:houses(name)
      `)
      .eq("school_id", schoolId)
      .limit(100);

    if (error) {
      res.status(400).json({ message: "Failed to fetch leaderboard", error: error.message });
      return;
    }

    // Mocking points logic since we don't have historical assignment data fully populated
    const leaderboard = students.map((s: any) => ({
      id: s.id,
      name: s.profile?.full_name || "Unknown",
      class: s.class?.class_name || "N/A",
      house: s.house?.name || "Unassigned",
      points: Math.floor(Math.random() * 500) + 100 // Mock points
    })).sort((a: any, b: any) => b.points - a.points);

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route  GET /api/leaderboard/houses
// @access All Authenticated Users
export const getHouseLeaderboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const schoolId = req.user?.school_id;

    const { data: houses, error } = await supabaseAdmin
      .from("houses")
      .select("*")
      .eq("school_id", schoolId)
      .order("points", { ascending: false });

    if (error) {
      res.status(400).json({ message: "Failed to fetch house leaderboard", error: error.message });
      return;
    }

    res.json({ houses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
