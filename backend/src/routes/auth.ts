import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.ts";
import { protect, authorize } from "../middleware/auth.ts";

const authRouter = express.Router();

// POST /api/auth/register — only super_admin and school_admin can create users
authRouter.post(
  "/register",
  protect,
  authorize(["super_admin", "school_admin"]),
  register
);

// POST /api/auth/login — public
authRouter.post("/login", login);

// POST /api/auth/logout — public
authRouter.post("/logout", logout);

// GET /api/auth/me — authenticated
authRouter.get("/me", protect, getMe);

export default authRouter;
