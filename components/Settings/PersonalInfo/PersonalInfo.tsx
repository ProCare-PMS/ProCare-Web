"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

// Define the Zod schema for validation
const ProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone Number is required"),
  pin: z.string().min(1, "PIN is required"),
  licenseNumber: z.string().min(1, "License Number is required"),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const PersonalInfo = () => {
  const [profileImage, setProfileImage] = useState("/imgPlace.jpeg");

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-start w-full">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="profileimage">Profile Picture</label>
          {/* Profile Picture Section */}
          <div className="relative w-36 h-36">
            <Image
              id="profileimage"
              width={150}
              height={100}
              src={profileImage}
              alt="Profile"
              className="rounded-full w-full h-full border border-[#2648EA] object-cover"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-0 -right-5 cursor-pointer"
            >
              <div className="bg-white rounded-full p-2 border border-[#2648EA]">
                <BorderColorRoundedIcon className="text-[#2648EA]" />
              </div>
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-1 font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className={`border border-gray-300 rounded px-2 py-1 ${
              errors.firstName ? "border-red-500" : ""
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-1 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Other Names */}
        <div className="flex flex-col">
          <label htmlFor="otherNames" className="mb-1 font-semibold">
            Other Name(s)
          </label>
          <input
            type="text"
            id="otherNames"
            {...register("otherNames")}
            className="border border-gray-300 rounded px-4 py-1"
            placeholder="Enter other name(s)"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="Enter Phone Number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* PIN */}
        <div className="flex flex-col">
          <label htmlFor="pin" className="mb-1 font-semibold">
            PIN
          </label>
          <input
            type="text"
            id="pin"
            {...register("pin")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.pin ? "border-red-500" : ""
            }`}
            placeholder="Enter Pin"
          />
          {errors.pin && (
            <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>
          )}
        </div>

        {/* License Number */}
        <div className="col-span-1 flex flex-col">
          <label htmlFor="licenseNumber" className="mb-1 font-semibold">
            License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            {...register("licenseNumber")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.licenseNumber ? "border-red-500" : ""
            }`}
            placeholder="Enter License Number"
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.licenseNumber.message}
            </p>
          )}
        </div>
        <div className="col-span-3 flex justify-end w-full">
          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-[#2648EA] text-white shadow-md hover:bg-blue-600 w-56 rounded-[0.3rem]"
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
