import express from "express";
import {
  getStudentAnalytics,
  getClassAnalytics,
  getSchoolAnalytics,
} from "../controllers/analytics.ts";
import { protect, authorize, requireSchool } from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.use(requireSchool);

// Student Analytics (Accessible by Student, Parent, Teacher, Admins)
router.get("/student/:id", getStudentAnalytics);

// Class Analytics (Accessible by Teacher, Admins)
router.get(
  "/class/:id",
  authorize(["super_admin", "school_admin", "teacher"]),
  getClassAnalytics
);

// School Analytics (Accessible by Admins)
router.get(
  "/school/:id",
  authorize(["super_admin", "school_admin"]),
  getSchoolAnalytics
);

export default router;
