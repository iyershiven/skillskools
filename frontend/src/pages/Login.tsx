import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Brain, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/AuthProvider";
import type { UserRole } from "@/types";

// Maps each role to its home dashboard
const roleRedirect: Record<UserRole, string> = {
  super_admin: "/super-admin/dashboard",
  school_admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
};

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Automatically redirect if already logged in and profile is loaded
  useEffect(() => {
    if (user) {
      const redirectPath = roleRedirect[user.role as UserRole] || "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.session) {
        throw new Error(authError?.message || "Invalid credentials");
      }

      // 2. Fetch the profile to get the role (Auth Context will also do this, but we do it here to redirect immediately)
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      
      const redirectPath = roleRedirect[data.user.role as UserRole] || "/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError(
        err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/40 to-green-50/20">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">ClassMind AI</span>
        </div>

        {/* Center copy */}
        <div className="relative space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight">
            AI-powered learning for every student
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Safe, school-approved AI that helps students understand concepts, teachers create homework faster, and admins see real learning data.
          </p>

          {/* Role pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Student", "Teacher", "Parent", "School Admin", "Super Admin"].map((role) => (
              <span
                key={role}
                className="bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative border-t border-white/20 pt-6">
          <p className="text-blue-100 text-sm italic">
            "ClassMind AI helped our students improve homework completion from 62% to 94% in 6 weeks."
          </p>
          <p className="text-white font-semibold text-sm mt-2">
            — Principal, Green Valley Public School
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gray-900">
              ClassMind<span className="text-blue-600"> AI</span>
            </span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to your school portal
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  School Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.edu.in"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 text-sm transition-all pr-12"
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold text-blue-700 mb-2">Demo Credentials</p>
              <div className="space-y-1 text-xs text-blue-600">
                <p>Super Admin: <span className="font-mono">superadmin@classmind.ai / super_admin123</span></p>
                <p>Teacher: <span className="font-mono">teacher@greenvalley.in / teacher123</span></p>
                <p>Student: <span className="font-mono">student@greenvalley.in / student123</span></p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Having trouble?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Contact your school admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
