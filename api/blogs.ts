// lib/blog.ts
import api from "../lib/axios";

// Blog interface
export interface Blog {
  id: number;
  slug: string; // <-- important
  title_en: string;
  title_np: string;
  content_en: string;
  content_np: string;
  excerpt_en?: string;
  excerpt_np?: string;
  status: "published" | "draft";
  featured_image?: string | null;
}

// Fetch all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await api.get("/blogs/");
  return res.data.results ?? res.data;
};

// Fetch single blog by slug
export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const res = await api.get(`/blogs/${slug}/`); // use slug directly in URL
  return res.data;
};

// Create blog
export const createBlog = async (formData: FormData): Promise<Blog> => {
  const res = await api.post("/blogs/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Update blog
export const updateBlog = async (id: number, formData: FormData): Promise<Blog> => {
  const res = await api.put(`/blogs/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete blog
export const deleteBlog = async (id: number): Promise<void> => {
  await api.delete(`/blogs/${id}/`);
};
