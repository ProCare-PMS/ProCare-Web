"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import customAxios from "@/api/CustomAxios"
import { endpoints } from "@/api/Endpoints"
import { loginSuccess, loginFailure } from "@/redux/authSlice"

interface UserAccount {
  id: string
  name: string
  role?: string
  email?: string
}

export default function UserPasscode() {
  const router = useRouter()
  const dispatch = useDispatch()

  // State management
  const [passcode, setPasscode] = useState<string[]>(["", "", "", ""])
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null)
  const [error, setError] = useState<string>("")
  const [isShaking, setIsShaking] = useState(false)

  // Refs for input focus management
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accountId = localStorage.getItem("accountId")
      const accounts = localStorage.getItem("accounts")

      if (accountId && accounts) {
        try {
          const parsedAccounts = JSON.parse(accounts)
          const user = parsedAccounts.find((acc: UserAccount) => acc.id === accountId)
          if (user) {
            setCurrentUser(user)
          } else {
            toast.error("User account not found")
            router.push("/profile")
          }
        } catch (error) {
          console.error("Error parsing accounts:", error)
          router.push("/profile")
        }
      } else {
        router.push("/profile")
      }
    }
  }, [router])

  // Focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // API mutation for passcode verification
  const verifyPasscodeMutation = useMutation({
    mutationFn: async (data: { accountId: string; passcode: string }) => {
      try {
        const response = await customAxios.post(endpoints.login, {
          account_id: data.accountId,
          passcode: data.passcode,
        })
        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  // Handle input change with validation and auto-submit
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      // Only allow numeric input
      if (value && !/^\d$/.test(value)) return

      const newPasscode = [...passcode]
      newPasscode[index] = value

      setPasscode(newPasscode)
      setError("")

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }

      // Auto-submit when all fields are filled
      if (value && index === 3 && newPasscode.every((digit) => digit !== "")) {
        handleSubmit(newPasscode.join(""))
      }
    },
    [passcode],
  )

  // Handle backspace navigation
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (!passcode[index] && index > 0) {
          // Move to previous input if current is empty
          const newPasscode = [...passcode]
          newPasscode[index - 1] = ""
          setPasscode(newPasscode)
          inputRefs.current[index - 1]?.focus()
        } else {
          // Clear current input
          const newPasscode = [...passcode]
          newPasscode[index] = ""
          setPasscode(newPasscode)
        }
        setError("")
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [passcode],
  )

  // Handle paste functionality
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)

    if (pastedData.length > 0) {
      const newPasscode = ["", "", "", ""]
      for (let i = 0; i < pastedData.length; i++) {
        newPasscode[i] = pastedData[i]
      }
      setPasscode(newPasscode)

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, 3)
      inputRefs.current[nextIndex]?.focus()

      // Auto-submit if 4 digits pasted
      if (pastedData.length === 4) {
        handleSubmit(pastedData)
      }
    }
  }, [])

  // Submit passcode
  const handleSubmit = async (code: string) => {
    if (!currentUser) return

    if (code.length !== 4) {
      setError("Please enter a 4-digit passcode")
      triggerShake()
      return
    }

    verifyPasscodeMutation.mutate(
      { accountId: currentUser.id, passcode: code },
      {
        onSuccess: (data) => {
          toast.success("Access granted!")
          dispatch(loginSuccess(data))
          router.push("/dashboard")
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "Invalid passcode"
          setError(errorMessage)
          triggerShake()
          clearPasscode()
          toast.error(errorMessage)
          dispatch(loginFailure(error.response?.data))
        },
      },
    )
  }

  // Clear passcode inputs
  const clearPasscode = () => {
    setPasscode(["", "", "", ""])
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)
  }

  // Trigger shake animation
  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600)
  }

  // Handle back navigation
  const handleBack = () => {
    router.push("/profile")
  }

  // Handle forgot passcode
  const handleForgotPasscode = () => {
    toast.info("Please contact your administrator to reset your passcode")
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2648EA]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-inter flex items-center justify-center p-4">
      {/* Centered Card Container */}
      <div className="w-full max-w-md">
        <div
          className={`
            bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-8 relative
            transition-transform duration-300 ease-out
            ${isShaking ? "animate-shake" : ""}
          `}
          style={{
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.08),
              0 10px 25px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(0, 0, 0, 0.02)
            `,
          }}
        >
          {/* Back Button - Positioned in top left of card */}
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 text-[#323539] hover:text-[#2648EA] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2648EA] focus:ring-offset-2  rounded-full transition-all duration-200"
            aria-label="Go back to user selection"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* User Profile Section */}
          <div className="text-center mb-10 pt-4">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto shadow-lg ring-4 ring-white">
                <Image
                  src="/profile.jpg"
                  width={96}
                  height={96}
                  alt={`${currentUser.name} profile picture`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-[#2648EA] to-[#1a3bc7] flex items-center justify-center">
                          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      `
                    }
                  }}
                />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-[#323539] mb-2">{currentUser.name}</h1>
            <p className="text-gray-500 text-sm">Enter your passcode to continue</p>
          </div>

          {/* Passcode Input Section */}
          <div className="mb-8">
            {/* OTP Input Grid */}
            <div className="flex gap-4 justify-center mb-6">
              {passcode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`
                    w-16 h-16 text-center text-xl font-medium border-2 rounded-2xl
                    transition-all duration-200 focus:outline-none bg-white
                    ${
                      error
                        ? "border-red-400 text-red-600 bg-red-50 shadow-sm"
                        : digit
                          ? "border-[#2648EA] text-[#2648EA] shadow-md shadow-[#2648EA]/10"
                          : "border-gray-200 text-[#323539] hover:border-gray-300 hover:shadow-sm"
                    }
                    focus:ring-4 focus:ring-[#2648EA]/20 focus:border-[#2648EA] focus:shadow-md
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  disabled={verifyPasscodeMutation.isPending}
                  aria-label={`Passcode digit ${index + 1}`}
                  autoComplete="off"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="flex items-center justify-center gap-2 text-sm text-red-600 mb-4 bg-red-50 rounded-lg py-3 px-4"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Loading State */}
            {verifyPasscodeMutation.isPending && (
              <div className="flex items-center justify-center gap-3 text-sm text-[#2648EA] mb-4 bg-blue-50 rounded-lg py-3 px-4">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#2648EA] border-t-transparent"></div>
                <span>Verifying...</span>
              </div>
            )}
          </div>

          {/* Forgot Passcode Link */}
          <div className="text-center">
            <button
              onClick={handleForgotPasscode}
              className=" text-sm text-gray-500 hover:text-[#2648EA] font-medium focus:outline-none focus:ring-2 focus:ring-[#2648EA] focus:ring-offset-2 rounded-lg px-3 py-2 transition-colors duration-200 min-h-[44px]"
            >
              Forgot your passcode?
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
