import express from "express";
import {
  triggerHomeworkGeneration,
  getHomework,
  getHomeworkById,
  toggleHomeworkStatus,
  submitHomework,
  getHomeworkResult,
} from "../controllers/homework.ts";
import { protect, authorize } from "../middleware/auth.ts";

const router = express.Router();

// Get all homework for the user's school/role
router.get("/", protect, getHomework);

// Trigger AI generation
router.post(
  "/generate",
  protect,
  authorize(["super_admin", "school_admin", "teacher"]),
  triggerHomeworkGeneration
);

// Get specific homework
router.get("/:id", protect, getHomeworkById);

// Update status (e.g., publish)
router.patch(
  "/:id/status",
  protect,
  authorize(["super_admin", "school_admin", "teacher"]),
  toggleHomeworkStatus
);

// Submit answers
router.post("/:id/submit", protect, authorize(["student"]), submitHomework);

// View student result
router.get("/:id/result", protect, authorize(["student"]), getHomeworkResult);

export default router;
