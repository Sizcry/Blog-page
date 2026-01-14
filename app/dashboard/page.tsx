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

// Blog interface
interface Blog {
  id: number;
  title_en: string;
  slug: string;
  status: string;
  featured_image?: string;
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

  const getImageUrl = (image?: string) => {
    if (!image) return null;
    // If API returns relative path, prepend base URL
    return image.startsWith("http") ? image : `https://janadesh.gowell.edu.np${image}`;
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
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
              >
                {getImageUrl(blog.featured_image) && (
                  <img
                    src={getImageUrl(blog.featured_image)!}
                    alt={blog.title_en}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h2 className="text-lg font-bold mt-2">{blog.title_en}</h2>
                <p className="text-sm text-gray-500 capitalize">{blog.status}</p>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/blogs/${blog.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
