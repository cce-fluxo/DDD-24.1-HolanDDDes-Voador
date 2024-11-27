import axios from "axios";

const api = axios.create({
  //baseURL: "https://ddd-24-1-holandddes-back-bk93.onrender.com/",
  baseURL: "http://localhost:3300/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@BonVoyage:token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
