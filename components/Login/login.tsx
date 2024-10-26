// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { z } from "zod";
// import { useMutation } from "@tanstack/react-query";
// export default function Login() {
//   const router = useRouter();

//   // Define Zod schema for validation
//   const loginSchema = z.object({
//     custom_pharmacy_id: z.string(),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//   });

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Handle form submission logic here, e.g., API calls
//     router.push("/profile");
//   };

//   return (
//     <div className="bg-[#F9F9F9] flex justify-center items-center w-1/2 h-screen">
//       <div className="bg-[#FFFFFF] w-[524px] h-[500px] p-8 rounded-lg shadow">
//         <form
//           className="m-auto flex flex-col justify-center gap-2"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="font-inter text-4xl font-bold leading-14 text-left mb-4">
//             Login
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Log in to access your account securely
//           </p>
//           <div className="mb-4">
//             <label
//               htmlFor="pharmacy_Id"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Pharmacy ID
//             </label>
//             <input
//               id="pharmacy_Id"
//               name="pharmacy_id_input"
//               type="text"
//               placeholder="Enter Pharmacy ID"
//               className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
//               autoComplete="off"
//               value={"kk"}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="data_psInput"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Password
//             </label>
//             <input
//               id="data_psInput"
//               type="password"
//               placeholder="Enter Password"
//               className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
//               autoComplete="off"
//               value={"ll"}
//             />
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               <span className="text-sm text-gray-600">Remember me</span>
//             </div>
//             <Link href="/forgot-password" className="text-sm text-blue-500">
//               Forgot Password
//             </Link>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded w-full"
//           >
//             Submit
//           </button>
//           <p className="mt-4 text-gray-600">
//             Not a registered member yet?{" "}
//             <Link
//               href="/personal-information"
//               className="text-sm text-blue-500"
//             >
//               Register here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

/**************************************************************************** */

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/redux/authSlice";
import { endpoints } from "@/api/Endpoints";
import { _baseUrl } from "@/api/CustomAxios";

// Define Zod schema for validation
const loginSchema = z.object({
  custom_pharmacy_id: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
    const formData = {
      custom_pharmacy_id: (
        event.currentTarget.elements.namedItem(
          "pharmacy_id_input"
        ) as HTMLInputElement
      ).value,
      password: (
        event.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    // Validate input data using Zod
    const result = loginSchema.safeParse(formData);
    console.log({ result });
    if (!result.success) {
      // Show validation errors (console.log here, but can be replaced with a proper UI display)
      console.log("Validation Errors:", result.error.format());
      return;
    }

    axios
      .post(`${_baseUrl + endpoints.login}`, formData)
      .then((res) => {
        if (res.data) {
          console.log("check response", res.data);
          dispatch(loginSuccess({ token: res.data.token, user: res.data }));
          localStorage.setItem("authToken", res.data.token);
          return router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error, error?.message);
        dispatch(loginFailure("An unexpected error occurred"));
      });

    //console.log({ formData });
  };

  return (
    <div className="bg-[#F9F9F9] flex justify-center items-center w-1/2 h-screen">
      <div className="bg-[#FFFFFF] w-[524px] h-[500px] p-8 rounded-lg shadow">
        <form
          className="m-auto flex flex-col justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter text-4xl font-bold leading-14 text-left mb-4">
            Login
          </h2>
          <p className="text-gray-600 mb-4">
            Log in to access your account securely
          </p>
          <div className="mb-4">
            <label
              htmlFor="pharmacy_Id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pharmacy ID
            </label>
            <input
              id="pharmacy_Id"
              name="pharmacy_id_input"
              type="text"
              placeholder="Enter Pharmacy ID"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="data_psInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="data_psInput"
              name="password"
              type="password"
              placeholder="Enter Password"
              className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]"
              autoComplete="off"
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
            <Link
              href="/personal-information"
              className="text-sm text-blue-500"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
