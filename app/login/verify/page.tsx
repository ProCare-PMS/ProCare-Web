"use client";

import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

function Verify() {
  const [btnMessage, setBtnMessage] = useState<string>("Verify Account");
  const [bodytext, setBodyText] = useState<string>("");

  const postVerification = useMutation({
    mutationFn: async (value: any) =>
      await customAxios.patch(endpoints.verifyEmail, value).then((res) => res),
  });

  const handleSubmit = () => {
    postVerification.mutate({ token: "test@example.com" });
  };

  return (
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
            Verify Your Account
          </h1>
          <p className="mt-2 text-gray-600">
            Click the verify button to activate your account.
          </p>
        </div>
      </header>

      {/* Call-to-action */}
      <div className="mt-6 text-center">
        <div className="space-y-3">
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-[0.2rem] shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 md:w-[10rem]"
            onClick={() => {
              console.log("clicked");
            }}
          >
            {btnMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
