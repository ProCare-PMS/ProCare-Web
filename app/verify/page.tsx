"use client";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Redirect to backend verify endpoint with the token
      window.location.href = `https://procare-backend.onrender.com/api/verify-email?token=${token}`;
    }
  }, [searchParams]);

  return (
    <div className="h-screen bg-gray-50 px-6">
      {/* Header */}
      <header className="w-full">
        <div className="flex justify-start">
          <Image
            src="/RxPMSlogo.png"
            alt="ProHealium Logo"
            width={200}
            height={150}
            quality={75}
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Verifying your email account...
          </h1>
        </div>
      </header>
    </div>
  );
}

function Verify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}

export default Verify;
