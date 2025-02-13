import axios from "axios";

const getToken = () => localStorage.getItem("authToken");

export const api = axios.create({
  baseURL: "https://sonil-dev.void.co.mz/api/v4",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
