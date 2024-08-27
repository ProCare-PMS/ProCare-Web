"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Forgot_password() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., API calls
    console.log("Email:", email);
    setEmail("");

    //handle reset hook
    setTimeout(() => {
      setResetSent(true);
    }, 1000);
  };
  return (
    <div className="bg-[#F9F9F9] w-1/2 h-screen flex justify-center items-center">
      <div className="bg-[#FFFFFF] w-[524px] h-[527px] p-8 rounded-lg shadow flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-full">
          <div className="flex flex-col justify-center items-center text-center px-2 gap-4 mb-6">
            <h3 className="font-inter text-lg font-semibold leading-6 tracking-tighter text-center">
              Forgot your Password?
            </h3>
            <p className="w-4/5 font-inter text-lg leading-6 tracking-tighter text-center">
              Enter you email below and we’ll send you instructions on how to
              reset your password
            </p>
          </div>
          {!resetSent ? (
            <>
              <form
                className="m-auto my-4 p-2 flex flex-col justify-center gap-3"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="font-inter text-lg font-medium leading-5 tracking-wider text-left mb-3"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="mt-3 appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* button here */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="w-[85%] m-auto bg-blue-500 text-white py-6 px-6 rounded-lg text-center flex gap-[2px]">
              <span className="font-inter text-lg leading-6">
                <Image
                  className="rounded-lg"
                  src={"/assets/images/check-icon.jpg"}
                  width={50}
                  height={50}
                  alt="check-icon"
                />
              </span>
              <p className=" text-white font-inter text-sm font-normal leading-5 text-left">
                {`We’ve sent you an email which you can us to reset your password . 
                Check your spam folder if you haven't received it after a few minutes`}
              </p>
            </div>
          )}
          {!resetSent ? (
            <div className="mt-4 text-gray-600">
              <Link href="/login" className="text-blue-500">
                Back to Login
              </Link>
            </div>
          ) : (
            <div className="w-full text-center text-slate-400 mt-3">
              <Link href={"/login"}>Back to sign in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
