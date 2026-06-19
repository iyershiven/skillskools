import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";
import { sendEmail } from "../services/email.ts";

// @route  GET /api/queries
// @access Principal, Parent
export const getQueries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id;
    const schoolId = req.user?.school_id;

    let query = supabaseAdmin
      .from("parent_queries")
      .select(`
        *,
        parent:profiles!parent_id(full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (role === "parent") {
      query = query.eq("parent_id", userId);
    } else if (role === "principal") {
      query = query.eq("school_id", schoolId);
    } else {
      res.status(403).json({ message: "Not authorized to view queries" });
      return;
    }

    const { data: queries, error } = await query;

    if (error) {
      res.status(400).json({ message: "Failed to fetch queries", error: error.message });
      return;
    }

    res.json({ queries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route  POST /api/queries
// @access Parent
export const createQuery = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subject, message } = req.body;
    const parentId = req.user?.id;
    const schoolId = req.user?.school_id;

    if (!subject || !message) {
      res.status(400).json({ message: "Subject and message are required" });
      return;
    }

    const { data: queryData, error } = await supabaseAdmin
      .from("parent_queries")
      .insert({
        school_id: schoolId,
        parent_id: parentId,
        subject,
        message,
        status: "Open"
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to create query", error: error.message });
      return;
    }

    // Attempt to notify Principal (Mock for now, would fetch principal's email from profiles)
    // await sendEmail("principal@school.com", "New Parent Query", `New query from parent: ${subject}`);

    res.status(201).json({ query: queryData, message: "Query sent to Principal" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route  PATCH /api/queries/:id
// @access Principal
export const resolveQuery = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    const { data: queryData, error } = await supabaseAdmin
      .from("parent_queries")
      .update({
        status: "Resolved",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select(`
        *,
        parent:profiles!parent_id(email, full_name)
      `)
      .single();

    if (error) {
      res.status(400).json({ message: "Failed to resolve query", error: error.message });
      return;
    }

    // Send email to parent notifying them of the resolution and reply
    if (queryData?.parent?.email) {
      const emailBody = `Dear ${queryData.parent.full_name},\n\nThe Principal has resolved your query: "${queryData.subject}".\n\nReply: ${replyMessage}\n\nRegards,\nSchool Administration`;
      await sendEmail(queryData.parent.email, `Re: ${queryData.subject}`, emailBody);
    }

    res.json({ query: queryData, message: "Query resolved and parent notified" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
