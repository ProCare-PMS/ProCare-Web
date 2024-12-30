"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Verify() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!!token) {
      // Redirect to backend verify endpoint with the token
      window.location.href = `https://procare-backend.onrender.com/api/verify-email?token=${token}`;
    }
  }, [searchParams]);

  return (
    <Suspense>
      <div className="h-screen bg-gray-50 px-6">
        {/* Header */}
        <header className="w-full">
          <div className="flex justify-start">
            <Image
              src="/RxPMSlogo.png"
              alt="ProHealium Logo"
              //className="w-64 h-64 md:w-80 md:h-80"
              width={200}
              height={150}
              quality={75}
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-600">
              Verifying your email account .....
            </h1>
          </div>
        </header>
      </div>
    </Suspense>
  );
}

export default Verify;
