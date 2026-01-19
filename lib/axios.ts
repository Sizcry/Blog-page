// lib/axios.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "https://janadesh.gowell.edu.np/api/v1",
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      // Ensure headers exist
      if (!config.headers) {
        // ✅ don't assign {}, instead cast an empty AxiosHeaders object
        config.headers = {} as any;
      }

      // Set Authorization safely
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
