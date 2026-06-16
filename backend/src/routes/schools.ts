import express from "express";
import {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
} from "../controllers/school.ts";
import { protect, authorize } from "../middleware/auth.ts";

const schoolRouter = express.Router();

// All school routes require authentication
schoolRouter.use(protect);

schoolRouter.post("/", authorize(["super_admin"]), createSchool);
schoolRouter.get("/", authorize(["super_admin"]), getSchools);
schoolRouter.get("/:id", authorize(["super_admin", "school_admin"]), getSchoolById);
schoolRouter.patch("/:id", authorize(["super_admin"]), updateSchool);

export default schoolRouter;
