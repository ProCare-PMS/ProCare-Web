"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Define Zod schema for validation
const PasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Old Password must be at least 6 characters long"),
  newPassword: z
    .string()
    .min(6, "New Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
  // .refine((value, context) => value === context.parent.newPassword, {
  //   message: "Passwords must match",
  // }),
});

type PasswordFormValues = z.infer<typeof PasswordSchema>;

const SecuritySettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password Data:", data);
    // Handle password update logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 p-6 max-w-4xl"
      style={{ gridTemplateRows: "auto auto auto" }}
    >
      {/* Old Password (full row) */}
      <div className="grid grid-cols-2 gap-8">
        <div className="relative col-span-1">
          <label htmlFor="oldPassword" className="block font-semibold mb-1">
            Old Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            {...register("oldPassword")}
            className={`border border-gray-300 rounded px-4 py-1 w-full ${
              errors.oldPassword ? "border-red-500" : ""
            }`}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowOldPassword((prev) => !prev)}
          >
            {showOldPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      {/* New Password and Confirm Password (one row, two columns) */}
      <div className="grid grid-cols-2 gap-8">
        {/* New Password */}
        <div className="relative">
          <label htmlFor="newPassword" className="block font-semibold mb-1">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            {...register("newPassword")}
            className={`border border-gray-300 rounded px-4 py-1 w-full ${
              errors.newPassword ? "border-red-500" : ""
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
          {/* Eye icon for toggling password visibility */}
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`border border-gray-300 rounded px-4 py-1 w-full ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1"></p>
          )}
          {/* Eye icon for toggling password visibility */}
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      {/* Update Password Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-[#2648EA] text-white rounded-[0.3rem] shadow-md hover:bg-blue-600"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default SecuritySettings;
