import api from "../lib/axios";

// 🔹 All blogs
export const getBlogs = async () => {
  const res = await api.get("/blogs/");
  return res.data;
};

// 🔹 Single blog by slug
export const getBlogBySlug = async (slug: string) => {
  const res = await api.get(`/blogs/${slug}/`);
  return res.data;
};
