import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove("access_token");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
