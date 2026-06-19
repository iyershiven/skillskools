import cookieParser from "cookie-parser";
import express, { type Application, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";



// ─── Routes ──────────────────────────────────────────────────────────────────
import authRouter from "./routes/auth.ts";
import schoolRouter from "./routes/schools.ts";
import userRoutes from "./routes/user.ts";
import classRouter from "./routes/class.ts";
import subjectRouter from "./routes/subject.ts";

// Analytics, Homework, & AI
import analyticsRouter from "./routes/analytics.ts";
import homeworkRouter from "./routes/homework.ts";
import aiRouter from "./routes/ai.ts";

// Inngest background jobs
import { serve } from "inngest/express";
import { inngest } from "./inngest/index.ts";
import {
  generateHomework,
  handleHomeworkSubmission,
} from "./inngest/functions.ts";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());

// CORS: allow frontend origin with credentials
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

// HTTP request logging in development
if (process.env.STAGE === "development") {
  app.use(morgan("dev"));
}

// ─── Rate Limiting ────────────────────────────────────────────────────────────
// General API: 200 req/15min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// AI routes: 30 req/15min per IP (stricter)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: "AI request limit exceeded, please wait before trying again." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", generalLimiter);
app.use("/api/ai", aiLimiter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "ClassMind AI API is healthy 🧠" });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
// Auth (login, logout, register, me)
app.use("/api/auth", authRouter);

// Schools (super_admin managed)
app.use("/api/schools", schoolRouter);

// Users (legacy + school_admin user management)
app.use("/api/users", userRoutes);

// Classes & Subjects
app.use("/api/classes", classRouter);
app.use("/api/subjects", subjectRouter);

// Analytics, Homework, & AI
app.use("/api/analytics", analyticsRouter);
app.use("/api/homework", homeworkRouter);
app.use("/api/ai", aiRouter);

// Inngest background job handler
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [generateHomework, handleHomeworkSubmission],
  })
);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.STAGE === "production" ? undefined : err.stack,
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 ClassMind AI Server running on port ${PORT}`);
});

// Keep process alive since app.listen seems to exit immediately
setInterval(() => {}, 1000 * 60 * 60);
