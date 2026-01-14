"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Blog, getBlogs, deleteBlog } from "@/api/blogs";

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const handleDelete = async (blog: Blog) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(blog.slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== blog.slug));
      console.log("Blog deleted successfully:", blog.slug);
    } catch (err: any) {
      console.error("Failed to delete blog:", err.response?.data || err.message);
      alert("Failed to delete blog. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <Button onClick={() => router.push("/dashboard/blogs/new")}>
          + Add New Blog
        </Button>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              {blog.featured_image && (
                <img
                  src={blog.featured_image}
                  alt={blog.title_en}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-bold mt-2">{blog.title_en}</h2>
              <p className="text-sm text-gray-500">{blog.status}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/dashboard/blogs/${blog.slug}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(blog)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
