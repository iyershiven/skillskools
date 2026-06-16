import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  logoutUser,
  getUserProfile,
  getUsers,
} from "../controllers/user.ts";
import { protect, authorize } from "../middleware/auth.ts";

const userRoutes = express.Router();

// school_admin and super_admin can create users
userRoutes.post(
  "/register",
  protect,
  authorize(["super_admin", "school_admin"]),
  register
);
userRoutes.post("/login", login);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/profile", protect, getUserProfile);
userRoutes.get("/", protect, authorize(["super_admin", "school_admin", "teacher"]), getUsers);
userRoutes.put(
  "/update/:id",
  protect,
  authorize(["super_admin", "school_admin"]),
  updateUser
);
userRoutes.delete(
  "/delete/:id",
  protect,
  authorize(["super_admin", "school_admin"]),
  deleteUser
);

export default userRoutes;
