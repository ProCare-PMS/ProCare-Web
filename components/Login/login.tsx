"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux"
import { endpoints } from "@/api/Endpoints"
import customAxios from "@/api/CustomAxios"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { firstLoginFailure, setfirstLoginSuccess } from "@/redux/firstLoginSlice"
import { Mail, Lock, AlertCircle } from "lucide-react"

// Define Zod schema for validation
const loginSchema = z.object({
  custom_pharmacy_id: z.string().min(4, "Pharmacy ID must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      custom_pharmacy_id: "",
      password: "",
      rememberMe: false,
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (formData: Omit<LoginFormData, "rememberMe">) => {
      try {
        const res = await customAxios.post(endpoints.login, formData)
        return res.data
      } catch (error) {
        throw error
      }
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    const { rememberMe, ...loginData } = data

    loginMutation.mutate(loginData, {
      onSuccess: (responseData) => {
        const step = responseData?.step
        const account = responseData?.accounts
        if (step === "select_account" && !!account && account.length > 0) {
          localStorage.setItem("accounts", JSON.stringify(account))
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true")
            localStorage.setItem("pharmacyId", data.custom_pharmacy_id)
          }
          toast.success("Login successful! Select an account.")
          dispatch(setfirstLoginSuccess({ step, account }))
          router.push("/profile")
        }
      },
      onError: (error: any) => {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data
          if (apiErrors.non_field_errors && apiErrors.non_field_errors.length > 0) {
            toast.error(apiErrors.non_field_errors[0])
          } else {
            toast.error("An unexpected error occurred. Please try again.")
          }
          dispatch(firstLoginFailure(error.response.data))
        } else {
          toast.error(error.response?.data?.message || "An unexpected error occurred.")
        }
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-inter flex items-center justify-center w-full lg:w-1/2">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-[#323539] mb-2">Sign In</h1>
            <p className="text-gray-600">Access your pharmacy management system</p>
          </div>

          {/* Pharmacy ID Field */}
          <div className="space-y-2">
            <label htmlFor="custom_pharmacy_id" className="block text-sm font-medium text-[#323539]">
              Pharmacy ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                {...register("custom_pharmacy_id")}
                id="custom_pharmacy_id"
                type="text"
                autoComplete="username"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-[8px] text-[#323539] placeholder-gray-500
                  focus:outline-none focus:ring-1 focus:border-transparent
                  transition-colors duration-200 min-h-[44px] bg-white
                  ${errors.custom_pharmacy_id ? "border-red-500 bg-red-50" : "border-gray-300"}
                `}
                placeholder="Enter your pharmacy ID"
                aria-invalid={errors.custom_pharmacy_id ? "true" : "false"}
                aria-describedby={errors.custom_pharmacy_id ? "pharmacy-id-error" : undefined}
              />
            </div>
            {errors.custom_pharmacy_id && (
              <div id="pharmacy-id-error" className="flex items-center gap-2 text-sm text-red-600" role="alert">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                {errors.custom_pharmacy_id?.message}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#323539]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-[8px] text-[#323539] placeholder-gray-500
                  focus:outline-none focus:ring-1 focus:border-transparent
                  transition-colors duration-200 min-h-[44px] bg-white
                  ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}
                `}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
            </div>
            {errors.password && (
              <div id="password-error" className="flex items-center gap-2 text-sm text-red-600" role="alert">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                {errors.password?.message}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#2648EA] focus:ring-[#2648EA] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#323539]">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#2648EA] hover:text-[#1a3bc7] font-medium focus:outline-none focus:ring-offset-2 rounded px-1 py-1"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loginMutation.isPending}
            className="
              w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-[8px]
              text-sm font-medium text-white bg-[#2648EA] hover:bg-[#1a3bc7]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2648EA]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200 min-h-[44px]
            "
          >
            {isSubmitting || loginMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Not a registered member?{" "}
              <Link
                href="/pharmacy-information"
                className="text-[#2648EA] hover:text-[#1a3bc7] font-medium focus:outline-none focus:ring-offset-2 rounded px-1 py-1"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}