"use client";

import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "../../hooks/useBlogs";

export default function BlogPage() {
  const { data, isLoading, error } = useBlogs();

  if (isLoading) return <p className="p-6">Loading blogs...</p>;
  if (error) return <p className="p-6">Failed to load blogs</p>;

  return (
   <main className="max-w-7xl mx-auto p-4 mt-10">
  <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {data?.results?.map((post: any) => (
      <div
        key={post.id}
        className="border rounded-lg shadow overflow-hidden flex flex-col"
      >
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={post.featured_image}
            alt={post.title_en}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Fixed-height title */}
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {post.title_en}
          </h2>

          {/* Optional excerpt */}
          {post.excerpt_en && (
            <p className="text-gray-600 flex-1 line-clamp-3 mb-2">
              {post.excerpt_en}
            </p>
          )}

          {/* Read more link at bottom */}
          <div className="mt-auto">
            <Link
              href={`/blogs/${post.slug}`}
              className="text-blue-600 hover:underline"
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
