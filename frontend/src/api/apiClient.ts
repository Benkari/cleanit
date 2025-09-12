import axios from "axios";
import { USER_STOREAGE_KEY } from "../auth/authContext";

const axiosClient = axios.create({
  baseURL: "/api",
  // baseURL: "http://localhost:8080/api", // For dev

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
  const user = localStorage.getItem(USER_STOREAGE_KEY);
  if (user) {
    const userId = JSON.parse(user).id;
    config.headers["X-User-id"] = userId;
  }

  return config;
});

export default axiosClient;
