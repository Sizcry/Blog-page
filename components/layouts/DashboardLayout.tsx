"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const [blogsOpen, setBlogsOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-xl">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
                <p className="text-xs text-slate-500 font-medium">Content Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu className="space-y-2">
              {/* Blogs with collapsible submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setBlogsOpen((prev) => !prev)}
                  className="w-full text-left flex justify-between items-center px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                      Blogs
                    </span>
                  </div>
                  <span
                    className={`transition-all duration-500 ease-out text-slate-400 group-hover:text-blue-600 ${
                      blogsOpen ? "rotate-90 scale-110" : "scale-100"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </SidebarMenuButton>

                {/* Animated submenu */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    blogsOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <SidebarMenuSub className="ml-4 space-y-1">
                    <SidebarMenuSubItem className="transform transition-all duration-300 hover:translate-x-1">
                      <SidebarMenuSubButton
                        asChild
                        className="pl-11 py-2.5 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-all duration-200"
                      >
                        <Link href="/dashboard/blogs" className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                          View Blogs
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem className="transform transition-all duration-300 hover:translate-x-1">
                      <SidebarMenuSubButton
                        asChild
                        className="pl-11 py-2.5 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-all duration-200"
                      >
                        <Link href="/dashboard/blogs/new" className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          Add Blog
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                   

                   
                  </SidebarMenuSub>
                </div>
              </SidebarMenuItem>

              {/* Back to Site */}
              {user && (
                <SidebarMenuItem className="mt-4">
                  <SidebarMenuButton
                    asChild
                    className="px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300 group"
                  >
                    <Link href="/" className="w-full flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                        Back to Site
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer Logout */}
          <SidebarFooter className="border-t border-slate-200/60 p-4">
            {user && (
              <div className="space-y-3">
                <div className="px-4 py-3 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200/60">
                  <p className="text-xs font-medium text-slate-500 mb-1">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {user.email || user.name || "User"}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105"
                  onClick={() => {
                    window.location.href = "/api/auth/signout";
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </Button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 min-h-[calc(100vh-4rem)] transition-all duration-300 hover:shadow-2xl">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}