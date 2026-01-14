"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await api.get(`/blogs/${slug}/`);
      return res.data;
    },
    enabled: !!slug,
  });
};
