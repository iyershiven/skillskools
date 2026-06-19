import express from "express";
import { chatWithAI } from "../controllers/ai.ts";
import { protect, authorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/chat", protect, authorize(["student"]), chatWithAI);

export default router;
