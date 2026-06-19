import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Brain,
  Menu,
  X,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardShellProps {
  navItems?: NavItem[];
  children: React.ReactNode;
  title?: string;
}

const DashboardShell = ({ navItems = [], children, title }: DashboardShellProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const roleBadgeColor: Record<string, string> = {
    super_admin: "bg-purple-100 text-purple-700",
    school_admin: "bg-blue-100 text-blue-700",
    teacher: "bg-green-100 text-green-700",
    student: "bg-amber-100 text-amber-700",
    parent: "bg-rose-100 text-rose-700",
  };

  const roleLabel: Record<string, string> = {
    super_admin: "Super Admin",
    school_admin: "School Admin",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-gray-900">
            ClassMind<span className="text-blue-600"> AI</span>
          </span>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-700 font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <span
                className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                  roleBadgeColor[user?.role || "student"]
                }`}
              >
                {roleLabel[user?.role || "student"]}
              </span>
            </div>
          </div>
          <button
            id="sidebar-logout"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            id="sidebar-toggle"
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;
