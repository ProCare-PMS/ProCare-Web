"use client";

import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Verify() {
  const getPersonalResponse = useSelector(
    (state: RootState) => state?.personalInfoResponse
  );

  const postVerification = useMutation({
    mutationFn: async (value: any) =>
      await customAxios.post(endpoints.verifyEmail, value).then((res) => res),
  });

  const handleSubmit = () => {
    return;
    postVerification.mutate(
      { token: getPersonalResponse?.access },
      {
        onSuccess: (data) => {
          if (data?.status === 201) {
            toast.success("Verification Successful");
          } else {
            toast.error("Verification Failed");
          }
        },
        onError: () => {
          toast.error("An error occurred during verification.");
        },
      }
    );
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
            Verification .....
          </h1>
          {/* <p className="mt-2 text-gray-600">
            {postVerification.isSuccess
              ? "Your account has been verified successfully."
              : "Click the verify button to activate your account."}
          </p>
          {postVerification.isSuccess && (
            <p>
              Hey {getPersonalResponse?.first_name}, copy your pharmacy id,{" "}
              {getPersonalResponse?.custom_pharmacy_id} to log in on the login
              page.
            </p>
          )} */}
        </div>
      </header>

      {/* Call-to-action */}
      <div className="mt-6 text-center">
        <div className="space-y-3">
          {/* <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-[0.2rem] shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 md:w-[10rem]"
            onClick={() => {
              handleSubmit();
              console.log("clicked");
            }}
          >
            {postVerification?.isPending
              ? "Verifying..."
              : postVerification.isSuccess
              ? "Verification Successful"
              : "Verify Account"}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Verify;
