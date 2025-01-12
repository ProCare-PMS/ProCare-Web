"use client";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";
import { endpoints } from "@/api/Endpoints";
import customAxios from "@/api/CustomAxios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch, UseDispatch } from "react-redux";
import { setFacilityId } from "@/redux/facilitySlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";

const facilitySchema = z.object({
  facility_name: z.string().min(1, { message: "Facility name is required" }),
  facility_number: z
    .string()
    .min(1, { message: "Facility number is required" }),
  facility_email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  ghana_post_address: z
    .string()
    .min(1, { message: "Ghana post address is required" }),
  license_number: z.string().min(1, { message: "License number is required" }),
});

const RegistrationPage = () => {
  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation function
  const postPharmacyInformation = useMutation({
    mutationFn: async (value: any) => {
      //console.log("Sending data to API:", value.formData); // Debugging log
      try {
        const res = await customAxios.post(endpoints.pharmacy, value.formData);
        //console.log("API Response:", res); // Log the entire response
        return res;
      } catch (error) {
        console.error("API Error:", error); // Log the entire error
        throw error; // Re-throw to trigger onError
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataFormat = new FormData(event.currentTarget);

    const formData = {
      facility_name: dataFormat.get("facility_name"),
      facility_number: dataFormat.get("facility_number"),
      facility_email: dataFormat.get("facility_email"),
      address: dataFormat.get("address"),
      city: dataFormat.get("city"),
      region: dataFormat.get("region"),
      ghana_post_address: dataFormat.get("ghana_post_address"),
      license_number: dataFormat.get("license_number"),
    };

    const result = facilitySchema.safeParse(formData);
    if (!result.success) {
      // Create an object to hold error messages
      const newErrors: { [key: string]: string } = {};
      const formattedErrors = result.error.format();

      for (const [key, value] of Object.entries(formattedErrors)) {
        if (typeof value === "object" && value !== null && "_errors" in value) {
          if (Array.isArray(value._errors) && value._errors.length > 0) {
            newErrors[key] = value._errors.join(", ");
          }
        } else if (Array.isArray(value) && value.length > 0) {
          newErrors[key] = value.join(", ");
        }
      }

      setErrors(newErrors);
      toast.error("Please correct the validation errors.");
      return;
    }

    setErrors({});

    postPharmacyInformation.mutate(
      {
        formData: formData,
        method: "POST",
      },
      {
        onSuccess: (data: any) => {
          if (data.status === 201) {
            const pharmacyId = data?.data?.id; // get the pharmacy id from the response data
            dispatch(setFacilityId(pharmacyId));
            toast.success("Pharmacy Information created");
            queryClient.invalidateQueries({
              queryKey: ["PharmacyInformation"],
            });
            router.push("/personal-information");
          } else if (data.status === 400) {
            toast.error("Error creating pharmacy information");
            toast.error("Error creating pharmacy information");
          } else {
            console.log("Registration failed:", data?.message);
            toast.error(data?.message);
          }
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen py-6 mx-auto px-8 bg-home">
      <div className="flex gap-4 items-center md:ml-6">
        <Image
          src="/RxPMSlogo.png"
          width={150}
          height={100}
          alt="Procare Logo"
          className="mt-[-0.8rem]"
        />
        <span className="font-bold text-2xl font-inter">Registration</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-inter md:text-3xl text-center font-bold mb-2">
          Pharmacy Information
        </h1>
        {/* <p className="font-roboto">Details about your pharmacy</p> */}
        <div className="flex items-center gap-2 px-4 mb-1">
          <span className="text-main text-sm flex gap-2 font-inter items-center font-semibold">
            <IoIosCheckmarkCircle className="text-main text-4xl" />
            Pharmacy Details
            <MdLinearScale className="text-main text-xl" />
          </span>
          <span className="text-sm flex gap-2 font-inter items-center font-semibold">
            <TbSquareRoundedNumber2 className="text-3xl text-slate-400" />
            Personal Inforamtion
            <MdLinearScale />
          </span>
          <span className="text-sm flex gap-2 font-inter items-center font-semibold">
            <TbSquareRoundedNumber3 className="text-3xl text-slate-400" />
            Make Payment
          </span>
        </div>

        <div>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col md:w-[55.5rem] md:flex-row bg-white px-[1.62rem] py-6 rounded-xl">
              <div className="grid grid-cols-2 w-full gap-4 my-0 p-0">
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="facility_name"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Facility Name
                    </label>
                    {errors.facility_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.facility_name}
                      </p>
                    )}
                  </div>

                  <input
                    id="facility_name"
                    name="facility_name"
                    placeholder="Facility Name"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="facility_number"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Facility Number
                    </label>
                    {errors.facility_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.facility_number}
                      </p>
                    )}
                  </div>

                  <input
                    id="facility_number"
                    name="facility_number"
                    placeholder="Facility Number"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="facility_email"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Facility Email
                    </label>
                    {errors.facility_email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.facility_email}
                      </p>
                    )}
                  </div>

                  <input
                    id="facility_email"
                    name="facility_email"
                    placeholder="Facility Email"
                    type="email"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="address"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Address
                    </label>
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <input
                    id="address"
                    name="address"
                    placeholder="Address"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="city"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      City
                    </label>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <input
                    id="city"
                    name="city"
                    placeholder="City"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="region"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Region
                    </label>
                    {errors.region && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.region}
                      </p>
                    )}
                  </div>

                  <input
                    id="region"
                    name="region"
                    placeholder="Region"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="ghana_post_address"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      Ghana Post Address
                    </label>
                    {errors.ghana_post_address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ghana_post_address}
                      </p>
                    )}
                  </div>

                  <input
                    id="ghana_post_address"
                    name="ghana_post_address"
                    placeholder="Ghana Post Address"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="license_number"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      License Number
                    </label>
                    {errors.license_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.license_number}
                      </p>
                    )}
                  </div>

                  <input
                    id="license_number"
                    name="license_number"
                    placeholder="License Number"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between my-5">
              <p className="text-center font-inter md:text-justify">
                Already have an account? <br />
                <Link
                  href="/login"
                  className="text-main font-inter font-semibold text-sm"
                >
                  Login Here
                </Link>
              </p>

              <button
                type="submit"
                className="w-[140px] bg-blue-600 text-white rounded-[5px] px-5 py-2 font-semibold text-sm"
                disabled={postPharmacyInformation.isPending}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
