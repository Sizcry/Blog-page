"use client";

import { useBlog } from "@/hooks/useBlog";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Fetch blog using slug
  const { data: post, isLoading, error } = useBlog(slug as string);

  if (status === "loading" || isLoading) return <p className="p-6">Loading blog...</p>;
  if (error || !post) return <p className="p-6">Blog not found</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href="/blogs" className="text-blue-600 hover:underline">
        ← Back to Blogs
      </Link>

      <h1 className="text-3xl font-bold my-4">{post.title_en}</h1>

      {post.featured_image && (
        <div className="relative h-96 mb-6 rounded-lg overflow-hidden shadow">
          <Image src={post.featured_image} alt={post.title_en} fill className="object-cover object-top" />
        </div>
      )}

      <div className="prose max-w-full text-gray-700" dangerouslySetInnerHTML={{ __html: post.content_en }} />
    </main>
  );
}
