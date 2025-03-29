"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { userRegistrationSchema } from "@/lib/schema/schema";
import { endpoints } from "@/api/Endpoints";
import customAxios from "@/api/CustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setPersonalInfoResponse } from "@/redux/personalInformationResponse";

//type FacilityFormData = z.infer<typeof userRegistrationSchema>;

const RegistrationPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const pharmacyId = useSelector((state: RootState) => state.pharmacyId?.id);

  // Mutation function
  const postPersonalInformation = useMutation({
    mutationFn: async (value: any) => {
      try {
        const res = await customAxios.post(endpoints.signup, value.formData);

        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      password: formData.get("password"),
      password2: formData.get("password2"),
      ghana_card: formData.get("ghana_card"),
      pharmacy: pharmacyId,
    };

    const result = userRegistrationSchema.safeParse(data);

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

      setErrors(newErrors); // Set the error state
      toast.error("Please correct the validation errors.");
      return;
    }

    setErrors({});

    postPersonalInformation.mutate(
      {
        formData: data,
        method: "POST",
      },
      {
        onSuccess: (data) => {
          console.log("Mutation success, response data:", data); // Log success data
          if (data.status === 201) {
            const personalResponse = data?.data;
            dispatch(setPersonalInfoResponse(personalResponse));
            toast.success("Personal Information created");
            toast.info("Please check your email");
            queryClient.invalidateQueries({
              queryKey: ["personalInformation"],
            });
            toast.info("Your are being redirected to verify your account");
            router.push("/login");
          } else {
            console.log("Registration failed:", data.data.message);
            toast.error("Personal Information Not Created");
          }
        },
        onError: (error: any) => {
          console.error(
            "Request failed with error:",
            error.toJSON ? error.toJSON() : error
          ); // Log detailed error info
        },
      }
    );
  };

  return (
    <div className="w-full h-screen mx-auto py-6 px-8 bg-home">
      <div className="flex flex-col md:flex-row md:gap-4 items-center md:ml-6 mb-6">
              <Image
                src="/RxPMSlogo.png"
                width={150}
                height={100}
                alt="Procare Logo"
                className="md:mt-[-0.8rem]"
              />
              <span className="font-bold text-2xl font-inter">Registration</span>
            </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-inter text-center font-bold mb-2">
          Personal Information
        </h1>
        <p className="font-roboto text-xl mb-6">Admin Details</p>
        <div className="flex items-center gap-2 px-4">
          <span className="text-main text-sm  hidden md:flex gap-2 font-inter items-center font-semibold">
            <IoIosCheckmarkCircle className="text-main text-4xl" />
            Pharmacy Details
            <MdLinearScale className="text-main hidden md:block text-xl" />
          </span>
          <span className="text-sm flex gap-2 text-main font-inter items-center font-semibold">
            <TbSquareRoundedNumber2 className="text-main  text-3xl" />
            Personal Inforamtion
            <MdLinearScale className="hidden md:block" />
          </span>
          <span className="text-sm hidden md:flex gap-2 items-center font-inter font-semibold">
            <TbSquareRoundedNumber3 className="text-3xl text-slate-400" />
            Make Payment
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col  w-[23rem] md:w-[55.5rem]  md:gap-4 md:flex-row bg-white px-[1.62rem] py-[2.62rem] rounded-2xl my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 my-0 p-0">
              {/* First Name */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="first_name" className="font-semibold text-base text-[#323539]">
                    First Name
                  </label>
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoFocus
                  className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                  placeholder="First Name"
                />
              </div>
              {/* Last Name */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="last_name" className="font-semibold text-base text-[#323539]">
                    Last Name
                  </label>
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>

                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  className="bg-home rounded-[5px] w-full border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                  placeholder="Last Name"
                />
              </div>

              {/* Email */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="email"className="font-semibold text-base text-[#323539]">
                    Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                  placeholder="Email Address"
                />
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="phone_number" className="font-semibold text-base text-[#323539]">
                    Phone Number
                  </label>
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_number}
                    </p>
                  )}
                </div>

                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                  placeholder="Phone Number"
                />
              </div>

              {/* Pasword */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="font-semibold text-base text-[#323539]">
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password2" className="font-semibold text-base text-[#323539]">
                    Confirm Password
                  </label>
                  {errors.password2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password2}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="password2"
                    name="password2"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Ghana Card */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="ghana_card" className="font-semibold text-base text-[#323539]">
                    Ghana Card
                  </label>
                  {errors.ghana_card && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ghana_card}
                    </p>
                  )}
                </div>

                <Input
                  id="ghana_card"
                  name="ghana_card"
                  type="text"
                  className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                  placeholder="GHA-000000000-0"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 px-[1.62rem] md:px-0 items-center justify-between">
            <Link
              href="/pharmacy-information"
              className="text-main border-main font-inter text-center w-full md:w-[140px] border-2 rounded-[5px] px-5 py-2 font-semibold text-sm"
            >
              Previous
            </Link>

            <button
              type="submit"
              className=" w-full hidden md:w-[140px] bg-blue-600 text-white rounded-[5px] px-5 py-2 font-semibold text-sm"
            >
              Next
            </button>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default RegistrationPage;
