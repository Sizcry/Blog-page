"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, Blog } from "@/api/blogs";

export const useBlog = (slug: string) => {
  return useQuery<Blog, Error>({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug, // only fetch if slug exists
  });
};
