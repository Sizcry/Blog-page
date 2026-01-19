"use client";

import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "@/hooks/useBlogs";
import { Blog } from "@/api/blogs";


export default function BlogPage() {
  const { data, isLoading, error } = useBlogs();

  if (isLoading) return <p className="p-6">Loading blogs...</p>;
  if (error) return <p className="p-6">Failed to load blogs: {error.message}</p>;
  if (!data || data.length === 0) return <p className="p-6">No blogs found.</p>;

  return (
    <main className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post: Blog) => (
          <div
            key={post.id}
            className="border rounded-2xl shadow-lg overflow-hidden flex flex-col bg-white transition-transform duration-300 hover:scale-105"
          >
            {/* Image */}
            {post.featured_image && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.featured_image}
                  alt={post.title_en}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title_en}
              </h2>

              {post.excerpt_en && (
                <p className="text-gray-600 flex-1 mb-4 line-clamp-3">
                  {post.excerpt_en}
                </p>
              )}

              <div className="mt-auto">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
