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
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation function
  const postPharmacyInformation = useMutation({
    mutationFn: async (value: any) => {
      console.log("Sending data to API:", value.formData); // Debugging log
      try {
        const res = await customAxios.post(
          endpoints.pharmacySignup,
          value.formData
        );
        console.log("API Response:", res); // Log the entire response
        return res;
      } catch (error) {
        console.error("API Error:", error); // Log the entire error
        throw error; // Re-throw to trigger onError
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Retrieve form values
    const formData = {
      facility_name: (
        event.currentTarget.elements.namedItem(
          "facility_name"
        ) as HTMLInputElement
      ).value,
      facility_number: (
        event.currentTarget.elements.namedItem(
          "facility_number"
        ) as HTMLInputElement
      ).value,
      facility_email: (
        event.currentTarget.elements.namedItem(
          "facility_email"
        ) as HTMLInputElement
      ).value,
      address: (
        event.currentTarget.elements.namedItem("address") as HTMLInputElement
      ).value,
      city: (event.currentTarget.elements.namedItem("city") as HTMLInputElement)
        .value,
      region: (
        event.currentTarget.elements.namedItem("region") as HTMLInputElement
      ).value,
      ghana_post_address: (
        event.currentTarget.elements.namedItem(
          "ghana_post_address"
        ) as HTMLInputElement
      ).value,
      license_number: (
        event.currentTarget.elements.namedItem(
          "license_number"
        ) as HTMLInputElement
      ).value,
    };

    console.log("Form data prepared:", formData); // Debugging log

    postPharmacyInformation.mutate(
      {
        formData: formData,
        method: "POST",
      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            const pharmacyId = data?.data?.id; // get the pharmacy id from the response data
            dispatch(setFacilityId(pharmacyId));
            toast.success("Personal Information created");
            queryClient.invalidateQueries({
              queryKey: ["personalInformation"],
            });
            router.push("/personal-information");
          } else {
            console.log("Registration failed:", data.data.message);
            toast.error("Personal Information Not Created");
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
                  <label
                    htmlFor="facility_name"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Facility Name
                  </label>
                  <input
                    id="facility_name"
                    name="facility_name"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="facility_number"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Facility Number
                  </label>
                  <input
                    id="facility_number"
                    name="facility_number"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="facility_email"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Facility Email
                  </label>
                  <input
                    id="facility_email"
                    name="facility_email"
                    type="email"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Region
                  </label>
                  <input
                    id="region"
                    name="region"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ghana_post_address"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Ghana Post Address
                  </label>
                  <input
                    id="ghana_post_address"
                    name="ghana_post_address"
                    type="text"
                    className="appearance-none border rounded w-full h-10 p-2 bg-[#F8F9FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="license_number"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    License Number
                  </label>
                  <input
                    id="license_number"
                    name="license_number"
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
                  href="/"
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
