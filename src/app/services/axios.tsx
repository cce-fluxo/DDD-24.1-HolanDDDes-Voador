import axios from "axios";

const api = axios.create({
  baseURL: "https://ddd-24-1-holandddes-back.onrender.com",
});

api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("@BonVoyage:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;