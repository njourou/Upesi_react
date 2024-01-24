import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
    // Authorization: "JWT fefege...",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
