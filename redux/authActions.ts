// redux/authActions.ts
import axios from "axios";
import { AppDispatch } from "./store";
import { loginSuccess, loginFailure, logout } from "./authSlice";
import { LoginCredentials, User } from "@/Types";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

// Login action
export const login =
  (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<{
        token: string;
        id: string;
        first_name: string;
        last_name: string;
        custom_pharmacy_id: string;
        refreshToken: string;
      }>("/login", credentials);

      const {
        token,
        id,
        first_name,
        last_name,
        custom_pharmacy_id,
        refreshToken,
      } = response.data;

      // Create the user object
      const user: User = {
        id,
        first_name,
        last_name,
        custom_pharmacy_id,
        token,
      };

      // Save token to localStorage for persistence
      localStorage.setItem("authToken", token);

      dispatch(loginSuccess({ token, refreshToken, user }));
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        // Custom error messages based on status code
        switch (error.response.status) {
          case 400:
            errorMessage =
              "Invalid login details. Please check your ID and password.";
            break;
          case 403:
            errorMessage =
              "Your account is not verified. Please verify your account.";
            break;
          default:
            errorMessage = error.response.data.detail || errorMessage;
        }
      }

      dispatch(loginFailure(errorMessage));
    }
  };

// Logout action
export const logoutAction = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  dispatch(logout());
};
