"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import api from "@/lib/axios";

export const useBlog = (slug: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      if (!session?.accessToken) return null; // wait until logged in
      const res = await api.get(`/blogs/${slug}/`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      return res.data;
    },
    enabled: !!slug && !!session?.accessToken,
  });
};
