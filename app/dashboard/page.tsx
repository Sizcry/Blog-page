"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import api from "@/lib/axios";
import { Pencil, Trash2, Calendar, Eye } from "lucide-react";

// Blog interface
interface Blog {
  id: number;
  title_en: string;
  slug: string;
  status: string;
  featured_image?: string;
  created_at?: string;
}

// DRF paginated response interface
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await api.get<PaginatedResponse<Blog>>("/blogs/");
        setBlogs(res.data.results || []);
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        alert("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/blogs/${id}/`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error("Failed to delete blog:", err);
      alert(
        "Failed to delete blog. " +
          (err.response?.data ? JSON.stringify(err.response.data) : "")
      );
    }
  };

  // Helper: get image URL or undefined
  const getImageUrl = (image?: string): string | undefined => {
    if (!image) return undefined;
    return image.startsWith("http") ? image : `https://janadesh.gowell.edu.np${image}`;
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "draft":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full">
        {/* Header / Breadcrumb */}
        <header className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Separator orientation="vertical" className="hidden md:block h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Blogs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto mt-2 md:mt-0">
            <Button onClick={() => router.push("/dashboard/blogs/new")}>
              + Add New Blog
            </Button>
          </div>
        </header>

        {/* Blogs Grid */}
        {loading ? (
          <p className="text-center py-8">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center py-8">
            No blogs found. Click "Add New Blog" to create one.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1"
              >
                {/* Image container */}
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100">
                  {getImageUrl(blog.featured_image) ? (
                    <img
                      src={getImageUrl(blog.featured_image)}
                      alt={blog.title_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Eye className="w-12 h-12 text-indigo-300 animate-pulse" />
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        blog.status
                      )} backdrop-blur-sm`}
                    >
                      {blog.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-52">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {blog.title_en}
                    </h2>

                    {blog.created_at && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/blogs/${blog.slug}/edit`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 hover:bg-indigo-50"
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      className="flex-1 flex items-center justify-center gap-2 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
