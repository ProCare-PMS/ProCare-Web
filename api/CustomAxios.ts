import axios from "axios";
import { toast } from "sonner";

// Define the base URL for the API
export const _baseUrl = 'https://procare-backend.onrender.com/api';

//updated

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
    // Get the token from localStorage (or any other storage)
    const token = localStorage?.getItem("authToken");
    if (token && token !== "undefined") {
      // Set the Authorization header if the token exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data;
    // Handle specific error cases based on status code
    if (error.response) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          localStorage.removeItem("refreshToken");
          toast.error("Token Expired. Redirecting to login.");
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden - log the error message
          toast.error("Access denied.");
          break;
        case 500:
          // Internal server error - log the error message
          toast.error("Server error. Please try again later.");
          break;
        default:
          if (typeof errorData === "string") {
            toast.error(errorData);
          } else if (typeof errorData === "object") {
            // Extract first error message from the object
            const firstErrorKey = Object.keys(errorData)[0];
            const firstErrorMessage = errorData[firstErrorKey];

            toast.error(firstErrorMessage || "An error occurred");
          } else {
            toast.error("An unexpected error occurred");
          }
      }
    } else {
      // If no response was received, log a network error
      toast.error("Network error. Please check your internet connection.");
    }
    // Reject the error for further handling in individual requests
    return Promise.reject(error);
  }
);

export default customAxios;
