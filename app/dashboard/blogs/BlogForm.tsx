"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { getBlogBySlug, createBlog, updateBlog } from "@/api/blogs";

interface BlogFormProps {
  mode: "new" | "edit";
  blogId?: string; // slug
}

export default function BlogForm({ mode, blogId }: BlogFormProps) {
  const [titleEn, setTitleEn] = useState("");
  const [titleNp, setTitleNp] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptNp, setExcerptNp] = useState("");
  const [status, setStatus] = useState("published");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);

  // Load blog for edit
  useEffect(() => {
    if (mode === "edit" && blogId && session?.accessToken) {
      const fetchBlog = async () => {
        try {
          const blog = await getBlogBySlug(blogId);
          setTitleEn(blog.title_en);
          setTitleNp(blog.title_np);
          setContentEn(blog.content_en);
          setContentNp(blog.content_np);
          setExcerptEn(blog.excerpt_en || "");
          setExcerptNp(blog.excerpt_np || "");
          setStatus(blog.status);
          if (blog.featured_image) setPreview(blog.featured_image);
        } catch (err: any) {
          console.error("Failed to load blog:", err);
          alert("Failed to load blog. Check console for details.");
        }
      };
      fetchBlog();
    }
  }, [mode, blogId, session]);

  // Preview selected image
  useEffect(() => {
    if (featuredImage) {
      const url = URL.createObjectURL(featuredImage);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [featuredImage]);

  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFeaturedImage(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) {
      alert("You must be logged in to create or edit blogs");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title_en", titleEn);
      formData.append("title_np", titleNp);
      formData.append("content_en", contentEn);
      formData.append("content_np", contentNp);
      formData.append("excerpt_en", excerptEn);
      formData.append("excerpt_np", excerptNp);
      formData.append("status", status);
      formData.append("slug", generateSlug(titleEn));
      if (featuredImage) formData.append("featured_image", featuredImage);

      if (mode === "new") {
        await createBlog(formData);
      } else if (mode === "edit" && blogId) {
        await updateBlog(blogId, formData);
      }

      router.push("/dashboard/blogs");
    } catch (err: any) {
      console.error(err);
      alert(
        "Failed to save blog: " +
          (err.response?.data ? JSON.stringify(err.response.data) : err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full transition-all duration-1000 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {mode === "new" ? "Create New Blog" : "Edit Blog"}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Fill in the details below to {mode === "new" ? "publish" : "update"} your blog post
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        {/* English Section */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-700">English Content</h2>
          <Input
            placeholder="Enter blog title in English"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
          <Input
            placeholder="Brief description (optional)"
            value={excerptEn}
            onChange={(e) => setExcerptEn(e.target.value)}
          />
          <Textarea
            placeholder="Write your blog content in English"
            value={contentEn}
            onChange={(e) => setContentEn(e.target.value)}
            required
            rows={6}
          />
        </div>

        {/* Nepali Section */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-700">नेपाली सामग्री</h2>
          <Input
            placeholder="नेपालीमा ब्लग शीर्षक प्रविष्ट गर्नुहोस्"
            value={titleNp}
            onChange={(e) => setTitleNp(e.target.value)}
            required
          />
          <Input
            placeholder="संक्षिप्त विवरण (वैकल्पिक)"
            value={excerptNp}
            onChange={(e) => setExcerptNp(e.target.value)}
          />
          <Textarea
            placeholder="आफ्नो ब्लग सामग्री नेपालीमा लेख्नुहोस्"
            value={contentNp}
            onChange={(e) => setContentNp(e.target.value)}
            required
            rows={6}
          />
        </div>

        {/* Media & Settings */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-700">Media & Settings</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 rounded-xl border"
          >
            <option value="published">✅ Published</option>
            <option value="draft">📝 Draft</option>
          </select>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer ${
              dragActive ? "border-purple-500 bg-purple-50" : "border-slate-300 bg-slate-50/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p>Drop your image here or click to browse</p>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover mt-4 rounded-xl"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/dashboard/blogs")}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Saving..." : mode === "new" ? "Publish Blog" : "Update Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
}
