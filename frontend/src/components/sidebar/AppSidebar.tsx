"use client";

import {
  Settings2,
  School,
  GraduationCap,
  Users,
  LayoutDashboard,
  Banknote,
  type LucideIcon,
  LogOut,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/types";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/AuthProvider";
import { useMemo } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToogle } from "./ThemeToogle";

export interface NavItem {
  title: string;
  url: string; // Used for linking and active state matching
  icon?: LucideIcon;
  isActive?: boolean; // Default open state for collapsibles
  roles?: UserRole[]; // Who can see this section? (undefined = everyone)
  items?: {
    title: string;
    url: string;
    roles?: UserRole[]; // Who can see this specific link?
  }[];
}

// This is sample data.
export const sidebardata = {
  teams: [
    {
      name: "Springfield High",
      logo: School,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher", "student", "parent"],
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Activities Log",
          url: "/activies-log",
          roles: ["super_admin", "school_admin", "principal"],
        },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: School,
      roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher", "student", "parent"],
      items: [
        {
          title: "Classes",
          url: "/classes",
          roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher"],
        },
        {
          title: "Subjects",
          url: "/subjects",
          roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher"],
        },
        {
          title: "Timetable",
          url: "/timetable",
        },
        {
          title: "Attendance",
          url: "/attendance",
        },
      ],
    },
    {
      title: "Learning (LMS)",
      url: "#",
      icon: GraduationCap,
      roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher", "student", "parent"],
      items: [
        { title: "Assignments", url: "/lms/assignments" },
        { title: "Exams", url: "/lms/exams" },
        { title: "Study Materials", url: "/lms/materials" },
        { title: "Digital Diary", url: "/lms/diary" },
      ],
    },
    {
      title: "Engagement",
      url: "#",
      icon: Users,
      roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher", "student", "parent"],
      items: [
        { title: "Student Leaderboard", url: "/leaderboard/students" },
        { title: "House Leaderboard", url: "/leaderboard/houses" },
        { title: "Noticeboard", url: "/noticeboard" },
        { title: "Parent Queries", url: "/queries", roles: ["super_admin", "school_admin", "principal", "parent"] },
      ],
    },
    {
      title: "People",
      url: "#",
      icon: Users,
      roles: ["super_admin", "school_admin", "principal", "teacher", "class_teacher", "subject_teacher"],
      items: [
        { title: "Students", url: "/users/students" },
        {
          title: "Teachers",
          url: "/users/teachers",
          roles: ["super_admin", "school_admin", "principal"],
        },
        {
          title: "Parents",
          url: "/users/parents",
          roles: ["super_admin", "school_admin", "principal"],
        },
        {
          title: "Admins",
          url: "/users/admins",
          roles: ["super_admin", "school_admin"],
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: Banknote,
      roles: ["super_admin", "school_admin", "principal"],
      items: [
        { title: "Fee Collection", url: "/finance/fees" },
        { title: "Expenses", url: "/finance/expenses" },
        { title: "Salary", url: "/finance/salary" },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: Settings2,
      roles: ["super_admin", "school_admin", "principal"],
      items: [
        { title: "School Settings", url: "/settings/general" },
        { title: "Academic Years", url: "/settings/academic-years" },
        { title: "Roles & Permissions", url: "/settings/roles" },
      ],
    },
  ] as NavItem[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser } = useAuth();
  const location = useLocation(); // <--- Get current URL
  const pathname = location.pathname; // e.g., "/dashboard/analytics"
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const navigate = useNavigate();

  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    avatar: "",
  };

  const userRole = (user?.role || "student") as UserRole;

  const filteredNav = useMemo(() => {
    return sidebardata.navMain
      .filter((item) => !item.roles || item.roles.includes(userRole))
      .map((item) => {
        const isChildActive = item.items?.some((sub) => sub.url === pathname);
        const isMainActive = item.url === pathname;
        return {
          ...item,
          isActive: isMainActive || isChildActive,
          items: item.items
            ?.filter(
              (subItem) => !subItem.roles || subItem.roles.includes(userRole),
            )
            .map((subItem) => ({
              ...subItem,
              isActive: subItem.url === pathname,
            })),
        };
      });
  }, [pathname, userRole]);

  const logout = async () => {
    try {
      await api.post("/users/logout").finally(() => {
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully");
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebardata.teams} yearName="2024-2025" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "gap-2",
            isCollapsed ? "flex-row space-y-2" : "flex justify-between",
          )}
        >
          <SidebarMenuItem title="Logout">
            <Button onClick={logout} variant={"ghost"} size="icon-sm">
              <LogOut />
            </Button>
          </SidebarMenuItem>
          <ThemeToogle />
        </div>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
