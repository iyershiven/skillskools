import express from "express";
import { getQueries, createQuery, resolveQuery } from "../controllers/query.ts";
import { protect, authorize, requireSchool } from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.use(requireSchool);

router.get("/", authorize(["principal", "parent"]), getQueries);
router.post("/", authorize(["parent"]), createQuery);
router.patch("/:id", authorize(["principal"]), resolveQuery);

export default router;
