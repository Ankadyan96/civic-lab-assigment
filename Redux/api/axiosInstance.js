import axios from "axios";

export const STATIC_BASE_URL = "https://api.datakeep.civicdays.in";

const axiosInstance = axios.create({
  baseURL: `${STATIC_BASE_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.url, config.params || "");
    return config;
  },
  (error) => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("❌ API Error:", error?.response?.data || error.message);

    return Promise.reject(error?.response?.data || "Something went wrong");
  },
);

export default axiosInstance;
