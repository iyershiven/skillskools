import express from "express";
import { authorize, protect } from "../middleware/auth.ts";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.ts";

const subjectRouter = express.Router();

subjectRouter
  .route("/create")
  .post(protect, authorize(["school_admin"]), createSubject);

subjectRouter
  .route("/")
  .get(protect, authorize(["school_admin", "teacher"]), getAllSubjects);

subjectRouter
  .route("/delete/:id")
  .delete(protect, authorize(["school_admin"]), deleteSubject);

subjectRouter
  .route("/update/:id")
  .patch(protect, authorize(["school_admin"]), updateSubject);

export default subjectRouter;
