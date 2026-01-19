import api from "@/lib/axios";

export interface Blog {
  id: number;
  slug: string;
  title_en: string;
  title_np: string;
  content_en: string;
  content_np: string;
  excerpt_en?: string;
  excerpt_np?: string;
  status: "published" | "draft";
  featured_image?: string | null;
  created_at?: string;
}

// Helper to build headers with optional token
const buildHeaders = (token?: string) => {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// Fetch all blogs
export const getBlogs = async (token?: string): Promise<Blog[]> => {
  const res = await api.get("/blogs/", { headers: buildHeaders(token) });
  return res.data.results ?? res.data;
};

// Fetch single blog by slug
export const getBlogBySlug = async (slug: string, token?: string): Promise<Blog> => {
  const res = await api.get(`/blogs/${slug}/`, { headers: buildHeaders(token) });
  return res.data;
};

// Create blog
export const createBlog = async (formData: FormData, token?: string): Promise<Blog> => {
  const res = await api.post("/blogs/", formData, { headers: buildHeaders(token) });
  return res.data;
};

// Update blog
export const updateBlog = async (slug: string, formData: FormData, token?: string): Promise<Blog> => {
  const res = await api.put(`/blogs/${slug}/`, formData, { headers: buildHeaders(token) });
  return res.data;
};

// Delete blog
export const deleteBlog = async (slug: string, token?: string): Promise<void> => {
  await api.delete(`/blogs/${slug}/`, { headers: buildHeaders(token) });
};
