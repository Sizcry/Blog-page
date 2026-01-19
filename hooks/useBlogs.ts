import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBlogs, Blog } from "../api/blogs";

// Hook to fetch blogs (only published)
export const useBlogs = (): UseQueryResult<Blog[], Error> => {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogs = await getBlogs(); // fetch all blogs
      return blogs.filter((blog) => blog.status === "published"); // filter only published
    },
    staleTime: 1000 * 60, // optional caching
  });
};
