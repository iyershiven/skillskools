import express from "express";
import {
  createClass,
  updateClass,
  deleteClass,
  getAllClasses,
} from "../controllers/class.ts";
import { authorize, protect } from "../middleware/auth.ts";

const classRouter = express.Router();

classRouter.post("/create", protect, authorize(["school_admin"]), createClass);
classRouter.get("/", protect, authorize(["school_admin", "teacher"]), getAllClasses);
classRouter.patch("/update/:id", protect, authorize(["school_admin"]), updateClass);
classRouter.delete("/delete/:id", protect, authorize(["school_admin"]), deleteClass);

export default classRouter;
