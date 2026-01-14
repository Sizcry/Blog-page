import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "https://janadesh.gowell.edu.np/api/v1",
});

// Add token automatically to all requests
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session && session.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  // Do NOT set Content-Type; axios handles FormData automatically
  return config;
});

export default api;
