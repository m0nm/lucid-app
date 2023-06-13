import Axios, { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { jwt } from "@/utils";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    const message =
      error.response?.data?.message ||
      error.response?.data[0].message ||
      "Something went wrong";
    toast.error(message);

    return Promise.reject(error);
  }
);

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = jwt.getToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.headers.Accept = "application/json";

  return config;
}
