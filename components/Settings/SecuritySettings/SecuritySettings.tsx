"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

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
  const [enableEdit, setEnableEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password Data:", data);
    // Handle password update logic here
    setEnableEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 bg-white shadow-lg rounded-xl mt-3 px-8 2xl:px-12 pt-12 pb-20 gap-7"
      style={{ gridTemplateRows: "auto auto auto" }}
    >
      {/* Old Password (full row) */}
      <div className="grid grid-cols-2 max-w-3xl gap-8">
        <div className="relative col-span-1">
          <label
            htmlFor="oldPassword"
            className="block font-medium mb-1 max-2xl:text-sm"
          >
            Old Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Enter old password"
            {...register("oldPassword")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } border border-gray-300 placeholder:text-sm placeholder:font-light rounded px-4 pr-[10%] py-3 w-full ${
              errors.oldPassword ? "border-red-500" : ""
            }`}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
          <span
            className="absolute right-3 top-11 cursor-pointer"
            onClick={() => setShowOldPassword((prev) => !prev)}
          >
            {showOldPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      {/* New Password and Confirm Password (one row, two columns) */}
      <div className="grid grid-cols-2 max-w-3xl gap-8">
        {/* New Password */}
        <div className="relative">
          <label
            htmlFor="newPassword"
            className="block font-medium mb-1 max-2xl:text-sm"
          >
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter new password"
            {...register("newPassword")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } border border-gray-300 placeholder:text-sm placeholder:font-light rounded px-4 pr-[10%] py-3 w-full ${
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
            className="absolute right-3 top-11 cursor-pointer"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            {showNewPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block font-medium mb-1 max-2xl:text-sm"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } border border-gray-300 placeholder:text-sm placeholder:font-light rounded px-4 pr-[10%] py-3 w-full ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1"></p>
          )}
          {/* Eye icon for toggling password visibility */}
          <span
            className="absolute right-3 top-11 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      {/* Update Password Button */}
      <div className="mt-6 flex max-w-3xl justify-end gap-3">
        {enableEdit === true && (
          <button
            type="button"
            className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] bg-[#ea9526] hover:bg-orange-600`}
            onClick={() => reset()}
          >
            Discard
          </button>
        )}
        {enableEdit === false && (
          <button
            type="button"
            onClick={() => setEnableEdit(true)}
            className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] bg-[#2648EA] hover:bg-blue-600`}
          >
            Edit
          </button>
        )}

        {enableEdit === true && (
          <button
            type="submit"
            className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] ${
              enableEdit && isDirty
                ? "bg-[#2648EA] hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={isDirty === false}
          >
            Update Password
          </button>
        )}
      </div>
    </form>
  );
};

export default SecuritySettings;
