import { type Response } from "express";
import { supabaseAdmin } from "../config/supabase.ts";
import type { AuthRequest } from "../middleware/auth.ts";
import { inngest } from "../inngest/index.ts";

// @desc    Trigger AI Homework Generation
// @route   POST /api/homework/generate
export const triggerHomeworkGeneration = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, subject_id, class_id, topic, difficulty, count } = req.body;
    const schoolId = req.user?.school_id;
    const teacherId = req.user?.id;

    if (!schoolId || !teacherId) {
      res.status(403).json({ message: "School or Teacher ID missing" });
      return;
    }

    // 1. Create a Draft Homework record
    const { data: draftHomework, error } = await supabaseAdmin
      .from("homework")
      .insert({
        school_id: schoolId,
        teacher_id: teacherId,
        class_id,
        subject_id,
        title: title || `Auto-Generated: ${topic}`,
        chapter: topic,
        difficulty: difficulty || "medium",
        status: "draft",
      })
      .select()
      .single();

    if (error || !draftHomework) {
      res.status(400).json({ message: "Failed to create draft homework", error: error?.message });
      return;
    }

    // 2. Fetch subject name for AI prompt
    const { data: subjectData } = await supabaseAdmin
      .from("subjects")
      .select("name")
      .eq("id", subject_id)
      .single();

    // 3. Trigger Inngest Background Job
    await inngest.send({
      name: "homework/generate",
      data: {
        homeworkId: draftHomework.id,
        topic,
        subjectName: subjectData?.name || "General",
        difficulty: difficulty || "medium",
        count: count || 10,
      },
    });

    res.status(202).json({
      message: "Homework generation started.",
      homeworkId: draftHomework.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get Homework (Student sees assigned, Teacher sees their creations)
// @route   GET /api/homework
export const getHomework = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user || !user.school_id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    let query = supabaseAdmin
      .from("homework")
      .select(`
        *,
        classes ( class_name, section ),
        subjects ( name )
      `)
      .eq("school_id", user.school_id);

    if (user.role === "student") {
      // Find student's class first
      const { data: student } = await supabaseAdmin
        .from("students")
        .select("class_id")
        .eq("profile_id", user.id)
        .single();
        
      if (student?.class_id) {
        query = query.eq("class_id", student.class_id).eq("status", "assigned");
      } else {
        res.json({ homework: [] });
        return;
      }
    } else if (user.role === "teacher") {
      query = query.eq("teacher_id", user.id);
    }

    const { data: homework, error } = await query.order("created_at", { ascending: false });

    if (error) {
      res.status(400).json({ message: "Failed to fetch homework", error: error.message });
      return;
    }

    res.json(homework);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get homework by id (including questions)
// @route   GET /api/homework/:id
export const getHomeworkById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const homeworkId = req.params.id;
    const user = req.user;

    const { data: homework, error } = await supabaseAdmin
      .from("homework")
      .select(`
        *,
        classes ( class_name, section ),
        subjects ( name ),
        homework_questions ( * )
      `)
      .eq("id", homeworkId)
      .eq("school_id", user?.school_id) // Strict tenant isolation
      .single();

    if (error || !homework) {
      res.status(404).json({ message: "Homework not found" });
      return;
    }

    // Strip out answer_key if user is student
    if (user?.role === "student") {
      homework.homework_questions = homework.homework_questions.map((q: any) => {
        delete q.answer_key;
        return q;
      });
    }

    res.json(homework);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Toggle Homework Status (Draft/Assigned/Closed)
// @route   PATCH /api/homework/:id/status
export const toggleHomeworkStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const homeworkId = req.params.id;
    const { status } = req.body; // 'draft', 'assigned', 'closed'
    const user = req.user;

    const { data: updated, error } = await supabaseAdmin
      .from("homework")
      .update({ status })
      .eq("id", homeworkId)
      .eq("teacher_id", user?.id) // Ensure ownership
      .select()
      .single();

    if (error || !updated) {
      res.status(404).json({ message: "Homework not found or unauthorized" });
      return;
    }

    res.json({ message: `Homework status is now ${status}`, homework: updated });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit Homework
// @route   POST /api/homework/:id/submit
export const submitHomework = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { answers } = req.body;
    const studentId = req.user?.id;
    const homeworkId = req.params.id;
    const schoolId = req.user?.school_id;

    if (!studentId || !schoolId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    // Pass to inngest to grade asynchronously (AI feedback + auto-grading)
    await inngest.send({
      name: "homework/submit",
      data: {
        homeworkId,
        studentId,
        schoolId,
        answers,
      },
    });

    res.status(201).json({ message: "Homework submission received and is being processed." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Homework Result (For Student)
// @route   GET /api/homework/:id/result
export const getHomeworkResult = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user?.id;
    const homeworkId = req.params.id;

    const { data: submission, error } = await supabaseAdmin
      .from("homework_submissions")
      .select(`
        *,
        student_answers ( * )
      `)
      .eq("homework_id", homeworkId)
      .eq("student_id", studentId)
      .single();

    if (error || !submission) {
      res.status(404).json({ message: "No submission found" });
      return;
    }

    res.json(submission);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Submissions for Homework (For Teacher)
// @route   GET /api/homework/:id/submissions
export const getHomeworkSubmissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const homeworkId = req.params.id;
    const teacherId = req.user?.id;

    // Verify ownership
    const { data: homework } = await supabaseAdmin
      .from("homework")
      .select("id")
      .eq("id", homeworkId)
      .eq("teacher_id", teacherId)
      .single();

    if (!homework) {
      res.status(403).json({ message: "Not authorized to view these submissions." });
      return;
    }

    const { data: submissions, error } = await supabaseAdmin
      .from("homework_submissions")
      .select(`
        id,
        status,
        score,
        created_at,
        students!inner(
          users!inner(name, email)
        )
      `)
      .eq("homework_id", homeworkId);

    if (error) {
      res.status(400).json({ message: "Error fetching submissions", error: error.message });
      return;
    }

    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
