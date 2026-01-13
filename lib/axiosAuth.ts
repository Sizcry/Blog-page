import axios from "axios";

const authApi = axios.create({
  baseURL: "https://janadesh.gowell.edu.np/api", // points to /api/token/
});

export default authApi;
