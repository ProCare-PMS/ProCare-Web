"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import OtpInput from "./otp-input";
import { useRouter } from "next/navigation";

const UserPasscode = () => {
  const router = useRouter();

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
              <OtpInput />
            </div>
            <Link
              href="/forgot-password"
              className="text-center mb-4 text-[#181C32] font-medium text-xl"
            >
              Forgot Passcode?
            </Link>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-[#2648EA] w-full text-white py-3 rounded-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-4 text-[#2648EA]">
            <span>Back to </span>{" "}
            <a href="/profile" className="text-[#2648EA]">
              User Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPasscode;
