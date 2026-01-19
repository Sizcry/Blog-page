"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Blog, getBlogs, deleteBlog } from "@/api/blogs";
import { Pencil, Trash2, Calendar, Eye } from "lucide-react";

export default function DashboardBlogsPageContent() {
  const { status } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [status]);

  const handleDelete = async (blog: Blog) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(blog.slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== blog.slug));
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert("Failed to delete blog.");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "draft":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (status === "loading") {
    return <p className="text-center py-10">Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Blogs</h1>
        <Button onClick={() => router.push("/dashboard/blogs/new")}>
          + Add New Blog
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center py-10">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">
          No blogs found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100">
                {blog.featured_image ? (
                  <img
                    src={blog.featured_image}
                    alt={blog.title_en}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Eye className="h-12 w-12 text-indigo-300" />
                  </div>
                )}

                {/* Status */}
                <div className="absolute right-3 top-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${getStatusStyle(
                      blog.status
                    )}`}
                  >
                    {blog.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex h-full flex-col p-5">
                {/* Title (fixed height) */}
                <h2 className="mb-2 min-h-14 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                  {blog.title_en}
                </h2>

                {/* Date (optional) */}
                {"created_at" in blog && blog.created_at && (
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                )}

                {/* Actions (always bottom aligned) */}
                <div className="mt-auto flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex h-10 flex-1 items-center justify-center gap-2"
                    onClick={() =>
                      router.push(`/dashboard/blogs/${blog.slug}/edit`)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex h-10 flex-1 items-center justify-center gap-2"
                    onClick={() => handleDelete(blog)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
