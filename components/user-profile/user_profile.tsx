"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Users, User } from "lucide-react"

interface AccountInfo {
  id: string
  name: string
  role?: string
  email?: string
  account_type?: string // Optional field for account type
}

export default function UserProfile() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccounts = localStorage.getItem("accounts")
      if (storedAccounts) {
        try {
          const accounts = JSON.parse(storedAccounts)
          setAccountInfo(accounts)
        } catch (error) {
          console.error("Error parsing stored accounts:", error)
          setAccountInfo([])
        }
      }
    }
  }, [])

  const handleUserSelect = async (accountId: string) => {
    setSelectedUser(accountId)
    setIsLoading(true)

    try {
      // Store the selected account ID
      localStorage.setItem("accountId", accountId)

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Navigate to user passcode page
      router.push("/user-passcode")
    } catch (error) {
      console.error("Error selecting user:", error)
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-inter flex items-center justify-center">

      {/* Main Content */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#323539] mb-4">Who&#39;s on Shift?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your account to access the pharmacy management system
          </p>
        </div>

        {/* Content */}
        {accountInfo.length > 0 ? (
          <>
            {/* User Grid */}
            {/* grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
            <div className="flex items-center justify-between gap-6 mb-8">
              {accountInfo.map((account, index) => (
                <div key={account.id || index} className="group">
                  <button
                    onClick={() => handleUserSelect(account.id)}
                    disabled={isLoading && selectedUser === account.id}
                    className="
                      w-full bg-white rounded-2xl p-6 border-2 border-gray-200
                      hover:border-[#2648EA] hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-[#2648EA] focus:ring-offset-2
                      transition-all duration-200 min-h-[200px]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      group-hover:scale-105 transform
                    "
                    aria-label={`Select ${account.name} for shift`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Profile Image */}
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-100 group-hover:ring-[#2648EA]/20 transition-all duration-200">
                          <Image
                            src="/profile.jpg"
                            width={80}
                            height={80}
                            alt={`${account.name} profile picture`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              const parent = target.parentElement
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-[#2648EA] flex items-center justify-center">
                                    <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  </div>
                                `
                              }
                            }}
                          />
                        </div>

                        {/* Loading indicator */}
                        {isLoading && selectedUser === account.id && (
                          <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2648EA]"></div>
                          </div>
                        )}
                      </div>

                      {/* User Info */}
                      <h3 className="font-semibold text-[#323539] mb-1 text-lg">{account.name}</h3>
                      {account.role && <p className="text-sm text-gray-600 mb-2">{account.role}</p>}
                      <p className="text-xs text-gray-500">
                        Email: {account.email}</p>
                        {/* if account_type == "pharmacy_user" then role is user else admin */}
                      <p className="text-xs text-gray-500">
                        Role: {account.account_type === "pharmacy_user" ? "User" : "Admin"}
                      
                    </p>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 border border-gray-200">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>
                  {accountInfo.length} account{accountInfo.length !== 1 ? "s" : ""} available
                </span>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-12 w-12 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-[#323539] mb-2">No accounts available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No user accounts were found. Please contact your system administrator to set up your account.
            </p>
            <button
              onClick={handleBackToLogin}
              className="
                inline-flex items-center gap-2 px-6 py-3 border border-[#2648EA] text-[#2648EA] 
                rounded-lg hover:bg-[#2648EA] hover:text-white
                focus:outline-none focus:ring-2 focus:ring-[#2648EA] focus:ring-offset-2
                transition-colors duration-200 font-medium min-h-[44px]
              "
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Login
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </div>
  )
}
