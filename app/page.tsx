"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAuth = () => {
    setIsChecking(true);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
      <p className="mt-4 text-gray-600 text-center">
        Something went wrong, or you refreshed the page. <br />
        Click the button below to proceed based on your status.
      </p>
      <button
        onClick={handleCheckAuth}
        disabled={isChecking}
        className={`mt-6 px-6 py-3 rounded-lg text-white font-medium ${
          isChecking
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isChecking ? "Checking..." : "Proceed"}
      </button>
    </div>
  );
}

export default Index;
