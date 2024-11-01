"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/redux/authSlice";
import { endpoints } from "@/api/Endpoints";
import customAxios, { _baseUrl } from "@/api/CustomAxios";
import { toast } from "sonner";

// Define Zod schema for validation
const loginSchema = z.object({
  custom_pharmacy_id: z.string().min(4, "Pharmacy ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //router.push("/dashboard");
    const formData = {
      custom_pharmacy_id: (
        event.currentTarget.elements.namedItem(
          "pharmacy_id_input"
        ) as HTMLInputElement
      ).value,
      password: (
        event.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    // Validate input data using Zod
    const result = loginSchema.safeParse(formData);
    //console.log({ result });
    if (!result.success) {
      // Show validation errors (console.log here, but can be replaced with a proper UI display)
      console.log("Validation Errors:", result.error.format());
      return;
    }

    try {
      const response = await customAxios.post(
        `${_baseUrl + endpoints.login}`,
        formData
      );
      const { token, user } = response.data;

      console.log({ token }, user);

      if (token && user) {
        // Save token and user data to localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful! Redirecting to the dashboard.");
        // Dispatch login success to Redux
        dispatch(loginSuccess({ token, user }));

        // Navigate to the dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      // Check if it's an API error with a specific message
      if (error.response && error.response.data) {
        const apiErrors = error.response.data;

        // Extract the specific error message, e.g., non_field_errors
        if (
          apiErrors.non_field_errors &&
          apiErrors.non_field_errors.length > 0
        ) {
          toast.error(apiErrors.non_field_errors[0]);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }

        // Optionally, dispatch error message to Redux or other state management
        dispatch(
          loginFailure(
            apiErrors.non_field_errors?.[0] || "An unexpected error occurred"
          )
        );
      } else {
        console.log(error);
        toast.error(
          "A network or unexpected error occurred. Please try again."
        );
        dispatch(loginFailure("An unexpected error occurred"));
      }
    }
  };

  return (
    <div className="bg-[#F9F9F9] flex justify-center items-center w-1/2 h-screen">
      <div className="bg-[#FFFFFF] w-[524px] h-[500px] p-8 rounded-lg shadow">
        <form
          className="m-auto flex flex-col justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter text-4xl font-bold leading-14 text-left mb-4">
            Login
          </h2>
          <p className="text-gray-600 mb-4">
            Log in to access your account securely
          </p>
          <div className="mb-4">
            <label
              htmlFor="pharmacy_Id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pharmacy ID
            </label>
            <input
              id="pharmacy_Id"
              name="pharmacy_id_input"
              type="text"
              placeholder="Enter Pharmacy ID"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="data_psInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="data_psInput"
              name="password"
              type="password"
              placeholder="Enter Password"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-500">
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Submit
          </button>
          <p className="mt-4 text-gray-600">
            Not a registered member yet?{" "}
            <Link
              href="/pharmacy-information"
              className="text-sm text-blue-500"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
