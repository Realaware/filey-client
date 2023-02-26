import axios from "axios";

const axiosInstance = axios.create({
  validateStatus: null,
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(function (config) {
  try {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `bearer ${token}`;

    return config;
  } catch {
    return config;
  }
});

export { axiosInstance };
