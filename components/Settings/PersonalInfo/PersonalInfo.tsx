"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ProfileSchema } from "@/lib/schema/schema";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const PersonalInfo = () => {
  const [profileImage, setProfileImage] = useState("/imgPlace.jpeg");
  //const getUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [getUser, setGetUser] = useState<any>({});
  const queryClient = useQueryClient();

  // Set user from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setGetUser(user);
    }
  }, []);

  const editPersonalInfo = useMutation({
    mutationFn: async (value: any) =>
      await customAxios
        .patch(`${endpoints.user}${getUser?.id}/`, value)
        .then((res) => res),
  });

  //get personal info data
  const { data: getPersonalData } = useQuery({
    queryKey: ["personalInformation"],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.user}${getUser?.id}/`)
        .then((res) => res?.data),
    enabled: !!getUser?.id,
  });

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (data: ProfileFormValues) => {
    //console.log(data);
    editPersonalInfo.mutate(data, {
      onSuccess: () => {
        SwalToaster("Personal Information Updated Successfully!", "success");
        queryClient.invalidateQueries({ queryKey: ["personalInformation"] });
      },
      onError: () => {
        SwalToaster("Failed to update personal information!", "error");
      },
    });
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

  useEffect(() => {
    !!getPersonalData
      ? reset({
          ...getPersonalData,
          license_number: getPersonalData?.pharmacy?.license_number,
        })
      : reset({});
  }, [reset, getPersonalData]);

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
          <label htmlFor="first_name" className="mb-1 font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            {...register("first_name")}
            className={`border border-gray-300 rounded px-2 py-1 ${
              errors.first_name ? "border-red-500" : ""
            }`}
            placeholder="Enter first name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="last_name" className="mb-1 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            {...register("last_name")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.last_name ? "border-red-500" : ""
            }`}
            placeholder="Enter last name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* Other Names */}
        <div className="flex flex-col">
          <label htmlFor="other_name" className="mb-1 font-semibold">
            Other Name(s)
          </label>
          <input
            type="text"
            id="other_name"
            {...register("other_name")}
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
          <label htmlFor="phone_number" className="mb-1 font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            {...register("phone_number")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.phone_number ? "border-red-500" : ""
            }`}
            placeholder="Enter Phone Number"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone_number.message}
            </p>
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
          <label htmlFor="license_number" className="mb-1 font-semibold">
            License Number
          </label>
          <input
            type="text"
            id="license_number"
            {...register("license_number")}
            className={`border border-gray-300 rounded px-4 py-1 ${
              errors.license_number ? "border-red-500" : ""
            }`}
            placeholder="Enter License Number"
            disabled
          />
          {errors.license_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.license_number.message}
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
