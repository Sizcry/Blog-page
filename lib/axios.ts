import axios from "axios";

const api = axios.create({
  baseURL: "https://janadesh.gowell.edu.np/api/v1",
});

export default api;
