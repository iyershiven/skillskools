import express from "express";
import { getNotices, createNotice } from "../controllers/notice.ts";
import { protect, authorize } from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);

router.get("/", getNotices);
router.post(
  "/",
  authorize(["super_admin", "principal", "class_teacher", "subject_teacher"]),
  createNotice
);

export default router;
