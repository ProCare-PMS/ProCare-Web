"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., API calls
    console.log("rmail:", email);
    console.log("Password:", password);
    console.log("confirmpassword:", confirmpassword);
    // Reset form fields after submission
    setemail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-[#F9F9F9] flex justify-center items-center w-1/2">
      <div className="bg-[#FFFFFF] w-[524px] h-[627px] p-8 rounded-lg shadow">
        <form
          className="m-auto p-2 flex flex-col justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter text-5xl font-bold leading-14 text-left mb-4">
            Reset Password
          </h2>
          {/* <p className="text-gray-600 mb-4">
              Log in to access your account securely
            </p> */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter email"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
             Enter new Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new Password"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-gray-600">
          <Link href={"/login"} className="">
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
