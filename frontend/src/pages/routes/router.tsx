import { createBrowserRouter } from "react-router";

// Public pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";

// Route guard
import PrivateRoutes from "@/pages/routes/PrivateRoutes";

// Role dashboards
import StudentDashboard from "@/pages/student/StudentDashboard";
import AITutorPage from "@/pages/student/AITutorPage";
import StudentHomeworkPage from "@/pages/student/StudentHomeworkPage";
import StudentHomeworkAttemptPage from "@/pages/student/StudentHomeworkAttemptPage";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherHomeworkPage from "@/pages/teacher/TeacherHomeworkPage";
import SchoolAdminDashboard from "@/pages/admin/SchoolAdminDashboard";
import ParentDashboard from "@/pages/parent/ParentDashboard";
import SuperAdminDashboard from "@/pages/superadmin/SuperAdminDashboard";

export const router = createBrowserRouter([
  {
    children: [
      // ── Public routes ──────────────────────────────────────────────────────
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },

      // ── Student routes ─────────────────────────────────────────────────────
      {
        path: "student/dashboard",
        element: (
          <PrivateRoutes allowedRoles={["student"]}>
            <StudentDashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "student/ai-tutor",
        element: (
          <PrivateRoutes allowedRoles={["student"]}>
            <AITutorPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "student/homework",
        element: (
          <PrivateRoutes allowedRoles={["student"]}>
            <StudentHomeworkPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "student/homework/:id",
        element: (
          <PrivateRoutes allowedRoles={["student"]}>
            <StudentHomeworkAttemptPage />
          </PrivateRoutes>
        ),
      },
      // ── Teacher routes ─────────────────────────────────────────────────────
      {
        path: "teacher/dashboard",
        element: (
          <PrivateRoutes allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "teacher/homework",
        element: (
          <PrivateRoutes allowedRoles={["teacher"]}>
            <TeacherHomeworkPage />
          </PrivateRoutes>
        ),
      },

      // ── School Admin routes ────────────────────────────────────────────────
      {
        path: "admin/dashboard",
        element: (
          <PrivateRoutes allowedRoles={["school_admin"]}>
            <SchoolAdminDashboard />
          </PrivateRoutes>
        ),
      },

      // ── Parent routes ──────────────────────────────────────────────────────
      {
        path: "parent/dashboard",
        element: (
          <PrivateRoutes allowedRoles={["parent"]}>
            <ParentDashboard />
          </PrivateRoutes>
        ),
      },

      // ── Super Admin routes ─────────────────────────────────────────────────
      {
        path: "super-admin/dashboard",
        element: (
          <PrivateRoutes allowedRoles={["super_admin"]}>
            <SuperAdminDashboard />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
