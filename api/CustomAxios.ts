import axios from "axios";
import { toast } from "sonner";

// Define the base URL for the API
export const _baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6325";

// Create a new Axios instance with the base URL
const customAxios = axios.create({
  baseURL: _baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for adding authorization token if available
customAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Get the token from localStorage only in the browser
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const errorData = error.response?.data;
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("refreshToken");
            toast.error("Token Expired. Redirecting to login.");
            window.location.href = "/login";
            break;
          case 403:
            toast.error("Access denied.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            if (typeof errorData === "string") {
              toast.error(errorData);
            } else if (typeof errorData === "object") {
              const firstErrorKey = Object.keys(errorData)[0];
              const firstErrorMessage = errorData[firstErrorKey];
              toast.error(firstErrorMessage || "An error occurred");
            } else {
              toast.error("An unexpected error occurred");
            }
        }
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
