"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlog } from "../../../hooks/useBlog";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function BlogDetailPage() {
  const { slug } = useParams(); // ✅ get slug from App Router
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch blog only if logged in and slug exists
  const { data: post, isLoading, error } = useBlog(slug as string);

  if (status === "loading" || isLoading) return <p className="p-6">Loading blog...</p>;
  if (error || !post) return <p className="p-6">Blog not found</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href="/blogs" className="text-blue-600">
        ← Back to Blogs
      </Link>

      <h1 className="text-3xl font-bold my-4">{post.title_en}</h1>

      <div className="relative h-96 mb-6">
        <Image
          src={post.featured_image}
          alt={post.title_en}
          fill
          className="object-cover rounded-lg object-top"
        />
      </div>

    <div
  className="prose max-w-full text-gray-700"
  dangerouslySetInnerHTML={{ __html: post.content_en }}
/>
    </main>
  );
}
