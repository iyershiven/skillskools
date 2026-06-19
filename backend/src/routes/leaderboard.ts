import express from "express";
import { getStudentLeaderboard, getHouseLeaderboard } from "../controllers/leaderboard.ts";
import { protect, requireSchool } from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.use(requireSchool);

router.get("/students", getStudentLeaderboard);
router.get("/houses", getHouseLeaderboard);

export default router;
