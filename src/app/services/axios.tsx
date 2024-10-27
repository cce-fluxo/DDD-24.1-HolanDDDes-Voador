import axios from "axios";

const api = axios.create({
  baseURL: "https://ddd-24-1-holandddes-back-bk93.onrender.com/",
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem("@BonVoyage:token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrYXR5cGVycnlAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMDQ0ODkzLCJleHAiOjE3MzAxMzEyOTN9.MqQlYTqj_1xLzyRi8jsLip3KRQtOnjzvk2-hvHAJo4U";
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;