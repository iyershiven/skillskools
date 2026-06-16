import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/AuthProvider";
import type { UserRole } from "@/types";
import { useEffect } from "react";

const roleRedirect: Record<UserRole, string> = {
  super_admin: "/super-admin/dashboard",
  school_admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
};

/**
 * Redirects authenticated users to their role-specific dashboard.
 * Unauthenticated users are sent to /login.
 */
const PrivateRoutes = ({ children, allowedRoles }: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to their own dashboard if they try to access another role's route
      const home = roleRedirect[user.role] || "/login";
      navigate(home, { replace: true });
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading || !user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default PrivateRoutes;
