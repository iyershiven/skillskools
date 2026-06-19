import express from "express";
import { getStudentDiary, addRemark } from "../controllers/diary.ts";
import { protect, authorize, requireSchool } from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.use(requireSchool);

router.get("/student/:studentId", getStudentDiary);

router.post(
  "/remark",
  authorize(["super_admin", "principal", "class_teacher", "subject_teacher"]),
  addRemark
);

export default router;
