"use client";
import React, { useState } from "react"; // Import useState
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/redux/authSlice";
import { endpoints } from "@/api/Endpoints";
import customAxios, { _baseUrl } from "@/api/CustomAxios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/Types";

// Define Zod schema for validation
const loginSchema = z.object({
  custom_pharmacy_id: z.string().min(4, "Pharmacy ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const loginMutation = useMutation({
    mutationFn: async (value: { formData: any }) => {
      try {
        const res = await customAxios.post(
          `${_baseUrl + endpoints.login}`,
          value.formData
        );
        return res.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      custom_pharmacy_id: formData.get("pharmacy_id_input"),
      password: formData.get("password"),
    };

    // Validate input data using Zod
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      // Create an object to hold error messages
      const newErrors: { [key: string]: string } = {};
      const formattedErrors = result.error.format();

      for (const [key, value] of Object.entries(formattedErrors)) {
        if (typeof value === "object" && value !== null && "_errors" in value) {
          if (Array.isArray(value._errors) && value._errors.length > 0) {
            newErrors[key] = value._errors.join(", ");
          }
        } else if (Array.isArray(value) && value.length > 0) {
          newErrors[key] = value.join(", ");
        }
      }

      setErrors(newErrors); // Set the error state
      toast.error("Please correct the validation errors.");
      return;
    }

    setErrors({});

    // Trigger the mutation with validated form data
    loginMutation.mutate(
      { formData: data },
      {
        onSuccess: (responseData) => {
          console.log({ responseData });
          const token = responseData?.access;
          const user = responseData?.user;
          const refreshToken = responseData?.refresh;
          //const { token, user } = responseData;
          if (token && user) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Login successful! Redirecting to the dashboard.");
            dispatch(loginSuccess({ token, refreshToken, user }));
            router.push("/dashboard");
          }
        },
        onError: (error: any) => {
          if (error.response && error.response.data) {
            const apiErrors = error.response.data;
            if (
              apiErrors.non_field_errors &&
              apiErrors.non_field_errors.length > 0
            ) {
              toast.error(apiErrors.non_field_errors[0]);
            } else {
              toast.error("An unexpected error occurred. Please try again.");
            }
            dispatch(loginFailure("An unexpected error occurred"));
          } else {
            toast.error(
              "A network or unexpected error occurred. Please try again."
            );
          }
        },
      }
    );
  };

  return (
    <div className="bg-[#F9F9F9] flex justify-center items-center w-full md:w-1/2 h-screen">
      <div className="bg-[#FFFFFF] w-[524px] h-[500px] p-8 rounded-lg shadow">
        <form
          className="m-auto flex flex-col justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter text-4xl font-bold leading-14 text-left mb-8">
            Login
          </h2>
          {/* <p className="text-gray-600 mb-4">
            Log in to access your account securely
          </p> */}
          <div className="mb-4">
            <div className="flex justify-between">
              <label
                htmlFor="pharmacy_Id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pharmacy ID
              </label>
              {errors.custom_pharmacy_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.custom_pharmacy_id}
                </p>
              )}
            </div>

            <input
              id="pharmacy_Id"
              name="pharmacy_id_input"
              type="text"
              placeholder="Enter Pharmacy ID"
              className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                errors.custom_pharmacy_id ? "border-red-500" : ""
              }`}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label
                htmlFor="data_psInput"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <input
              id="data_psInput"
              name="password"
              type="password"
              placeholder="Enter Password"
              className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                errors.password ? "border-red-500" : ""
              }`}
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
