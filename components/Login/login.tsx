"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
export default function Login() {
    const [pharmacyId, setPharmacyId] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle form submission logic here, e.g., API calls
      console.log("Pharmacy ID:", pharmacyId);
      console.log("Password:", password);
      // Reset form fields after submission
      setPharmacyId("");
      setPassword("");
    };
  
    useEffect(() => {
      // Clear input fields on component mount to prevent autofill
      setPharmacyId("");
      setPassword("");
    }, []);
  
  return (
    <div className="bg-[#F9F9F9] flex justify-center items-center w-1/2 h-screen">
        <div className="bg-[#FFFFFF] w-[524px] h-[560px] p-8 rounded-lg shadow">
          <form className="m-auto flex flex-col justify-center gap-2" onSubmit={handleSubmit}>
            <h2 className="font-inter text-4xl font-bold leading-14 text-left mb-4">Login</h2>
            <p className="text-gray-600 mb-4">
              Log in to access your account securely
            </p>
            <div className="mb-4">
              <label
                htmlFor="pharmacyId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pharmacy ID
              </label>
              <input
                id="pharmacyId"
                type="text"
                placeholder="Enter Pharmacy ID"
                className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
                autoComplete="off"
                value={pharmacyId}
                onChange={(e) => setPharmacyId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-500">
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Submit
            </button>
            <p className="mt-4 text-gray-600">
            Not a registered member yet?{" "}
            <a href="#" className="text-blue-500">
              Register here
            </a>
          </p>
          </form>
         
        </div>
      </div>
  )
}