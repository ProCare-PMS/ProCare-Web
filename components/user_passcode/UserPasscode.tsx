"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "@/redux/authSlice";

const UserPasscode = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // State for OTP input
  const [accountId, setAccountId] = useState<string | null>(null); // Store accountId in state
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch accountId from localStorage only in the browser
  useEffect(() => {
    const storedAccountId = localStorage.getItem("accountId");
    if (storedAccountId) {
      setAccountId(storedAccountId);
    }
  }, []);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically focus next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (value: any) => {
      try {
        const res = await customAxios.post(endpoints.login, value);
        return res.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });

  const handleSubmit = async () => {
    if (!accountId) {
      toast.error("Account ID is missing.");
      return;
    }
    const otpValue = otp.join("");

    loginMutation.mutate(
      {
        account_id: accountId,
        passcode: otpValue.toString(),
      },
      {
        onSuccess: (responseData) => {
          const token = responseData?.access;
          const user = responseData?.user;
          const refreshToken = responseData?.refresh;

          if (token && user && refreshToken) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Login successful! Redirecting to the dashboard.");
            dispatch(loginSuccess({ token, refreshToken, user }));
            router.push("/dashboard");
            localStorage.removeItem("accountId");
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
              error.response.data.message || "An unexpected error occurred."
            );
          }
        },
      }
    );
  };

  return (
    <div className="bg-[#F9F9F9] h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-between gap-4">
        <h2 className="text-[#2648EA] font-semibold text-3xl">
          Who’s on Shift
        </h2>
        <div className="bg-white w-96 h-[450px] px-6 py-8 flex flex-col justify-center shadow-lg rounded-xl">
          <div className="w-[40%] h-[40%] mx-auto shadow-md rounded-xl">
            <Image
              className="w-full h-full bg-cover py-4 px-6"
              src="/assets/images/profile.jpg"
              width={40}
              height={40}
              alt="profileImage"
            />
          </div>

          <div className="grid mt-5">
            <div className="mb-6">
              <h2 className="text-[#323539] font-medium text-xl mb-2">
                Passcode
              </h2>
              <div className="flex items-center justify-between overflow-hidden">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    className="border-2 w-16 h-12 border-[#D0D5DD] rounded-[8px] text-center text-4xl text-slate-400"
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder="-"
                  />
                ))}
              </div>
            </div>
            <Link
              href="/forgot-password"
              className="text-center mb-4 text-[#181C32] font-medium text-xl"
            >
              Forgot Passcode?
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-[#2648EA] w-full text-white py-3 rounded-xl"
              type="button"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-4 text-[#2648EA]">
            <span>Back to </span>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/profile";
                localStorage.removeItem("accountId");
              }}
            >
              User Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPasscode;
