"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySchema } from "@/lib/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { PencilLine } from "lucide-react";

type ProfileFormValues = z.infer<typeof CompanySchema>;

const CompanyInfoSettings = () => {
  const [profileImage, setProfileImage] = useState("/RxPMSlogo.png");
  const queryClient = useQueryClient();
  const [enableEdit, setEnableEdit] = useState(false);

  const getPharmacy = JSON.parse(
    localStorage.getItem("user") || "{}"
  )?.pharmacy;

  const editPharmacy = useMutation({
    mutationFn: async (value: any) =>
      await customAxios
        .patch(`${endpoints.pharmacy}${getPharmacy?.id}/`, value)
        .then((res) => res),
  });

  const { data: getPharmacyDetails } = useQuery({
    queryKey: ["companyInformation"],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.pharmacy}${getPharmacy?.id}/`)
        .then((res) => res?.data),
  });

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(CompanySchema),
  });

  const onSubmit = (data: ProfileFormValues) => {
    const payload = {
      ...data,
      address: getPharmacyDetails?.address,
      city: getPharmacyDetails?.city,
      region: getPharmacyDetails?.region,
    };
    console.log(data, { payload });
    editPharmacy.mutate(payload, {
      onSuccess: () => {
        SwalToaster("Company Information Updated successfully!", "success");
        queryClient.invalidateQueries({ queryKey: ["companyInformation"] });
      },
      onError: () => {
        SwalToaster("Error updating company information!", "error");
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
    !!getPharmacyDetails && reset(getPharmacyDetails);
  }, [reset, getPharmacyDetails]);

  return (
    <form
      className="bg-white shadow-lg rounded-xl px-8 2xl:px-12 pt-12 pb-20 flex mt-3 flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-start w-full">
        <div className="flex flex-col items-center gap-3">
          <label
            className="text-start w-full max-2xl:text-sm font-medium"
            htmlFor="profileimage"
          >
            Company Logo
          </label>
          {/* Profile Picture Section */}
          <div className="relative size-40">
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
              className="absolute bottom-0 -right-2.5 cursor-pointer"
            >
              <div className="bg-white rounded-full p-2 border border-[#2648EA]">
                <PencilLine className="text-[#2648EA]" />
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
      <div className="grid grid-cols-3 justify-between gap-8 2xl:gap-x-12 gap-y-7 w-full">
        {/* First Name */}
        <div className="flex flex-col">
          <label
            htmlFor="facility_name"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Company Name
          </label>
          <input
            type="text"
            id="facility_name"
            {...register("facility_name")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            }
               placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
                 errors.facility_name ? "border-red-500" : ""
               }`}
            placeholder="Enter company name"
            disabled={enableEdit === false}
          />
          {errors.facility_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.facility_name.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Location
          </label>
          <input
            type="text"
            id="ghana_post_address"
            {...register("ghana_post_address")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.ghana_post_address ? "border-red-500" : ""
            }`}
            placeholder="Enter location"
            disabled={enableEdit === false}
          />
          {errors.ghana_post_address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ghana_post_address.message}
            </p>
          )}
        </div>

        {/* Other Names */}
        <div className="flex flex-col">
          <label
            htmlFor="license_number"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Phamarcy ID
          </label>
          <input
            type="text"
            id="otherNames"
            {...register("license_number")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3`}
            placeholder="Enter pharmacy ID"
            disabled
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium max-2xl:text-sm">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("facility_email")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.facility_email ? "border-red-500" : ""
            }`}
            placeholder="Enter email address"
            disabled={enableEdit === false}
          />
          {errors.facility_email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.facility_email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium max-2xl:text-sm">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register("facility_number")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.facility_number ? "border-red-500" : ""
            }`}
            placeholder="Enter Phone Number"
            disabled={enableEdit === false}
          />
          {errors.facility_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.facility_number.message}
            </p>
          )}
        </div>

        <div className="col-span-3 mt-6 flex justify-end w-full gap-3">
          {/* Submit Button */}

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
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CompanyInfoSettings;
