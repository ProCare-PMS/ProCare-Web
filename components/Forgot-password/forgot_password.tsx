"use client"
import React, {useState} from 'react'

export default function Forgot_password () {
    const [email, setEmail] = useState("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here, e.g., API calls
        console.log("Email:", email);
        setEmail("");
      };
  return (
    <div className="bg-[#F9F9F9] w-1/2 flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-[524px] h-[627px] p-8 rounded-lg shadow flex justify-center items-center">
        <div className="bg-[#FFFFFF]">
            <div className='flex flex-col justify-center items-center text-center px-2 gap-4'>
                <h3 className='font-inter text-lg font-semibold leading-6 tracking-tighter text-center'>
                    Forgot your Password?
                </h3>
                <p className='font-inter text-lg leading-6 tracking-tighter text-center px-4'>
                    Enter you email below and we’ll send you instructions on how to reset your password
                </p>
            </div>
          <form className="m-auto p-2 flex flex-col justify-center gap-3" onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
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
          <div className="mt-4 text-gray-600">
            <a href="#" className="text-blue-500">
                Back to Login
            </a>
          </div>
        </div>
        </div>
        
      </div>
  )
}