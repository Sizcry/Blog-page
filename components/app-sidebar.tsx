"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname(); // ✅ usePathname instead of router.pathname

  // Sidebar menu items
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      title: "My Blogs",
      url: "/dashboard/blogs",
      icon: FileText,
      isActive: pathname?.startsWith("/dashboard/blogs"),
    },
    {
      title: "Add New Blog",
      url: "/dashboard/blogs/new",
      icon: Plus,
      isActive: pathname === "/dashboard/blogs/new",
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      isActive: pathname === "/dashboard/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {session?.user ? (
          <NavUser
            user={{
              name: session.user.name || session.user.email || "User",
              email: session.user.email || "",
              avatar: "/avatars/default.png",
            }}
          />
        ) : (
          <p className="px-4 py-2 text-sm text-gray-400">Loading user...</p>
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-center text-gray-500">© 2026 My Blog Dashboard</p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
