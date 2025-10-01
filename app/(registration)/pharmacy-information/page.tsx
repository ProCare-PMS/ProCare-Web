"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { endpoints } from "@/api/Endpoints";
import customAxios from "@/api/CustomAxios";
import { setFacilityId } from "@/redux/facilitySlice";
import type { AppDispatch } from "@/redux/store";
import {
  Building2,
  Hash,
  Mail,
  MapPin,
  Map,
  Globe,
  FileText,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  User,
  CreditCard,
} from "lucide-react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";

// Zod validation schema
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

type FacilityFormData = z.infer<typeof facilitySchema>;

//Regions of Ghana for dropdown
const regions = [
  "Ahafo Region",
  "Ashanti Region",
  "Bono Region",
  "Bono East Region",
  "Central Region",
  "Eastern Region",
  "Greater Accra Region",
  "North East Region",
  "Northern Region",
  "Oti Region",
  "Savannah Region",
  "Upper East Region",
  "Upper West Region",
  "Volta Region",
  "Western Region",
  "Western North Region",
]

// Progress Step Component
const ProgressStep = ({
  step,
  currentStep,
  title,
  icon: Icon,
  isCompleted = false,
}: {
  step: number;
  currentStep: number;
  title: string;
  icon: any;
  isCompleted?: boolean;
}) => {
  const isActive = step === currentStep;
  const isPast = step < currentStep || isCompleted;

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold
            transition-all duration-300 border-2
            ${
              isPast || isCompleted
                ? "bg-[#2648EA] border-[#2648EA] text-white"
                : isActive
                ? "bg-white border-[#2648EA] text-[#2648EA] ring-4 ring-[#2648EA]/20"
                : "bg-gray-100 border-gray-300 text-gray-500"
            }
          `}
        >
          {isPast || isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <span
          className={`
            mt-3 text-sm font-medium text-center max-w-24
            ${
              isActive
                ? "text-[#2648EA]"
                : isPast
                ? "text-[#323539]"
                : "text-gray-500"
            }
          `}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

// Input Field Component with Login styling
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
  options = [],
  ...props
}: {
  label: string;
  name: keyof FacilityFormData;
  type?: string;
  placeholder?: string;
  icon: any;
  register: any;
  error?: string;
  options?: string[];
} & any) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-[#323539]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        {/* Render select if type is 'select', else input */}
        {type === "select" ? (
          <select
            {...register(name)}
            id={name}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-[8px] text-[#323539] bg-[#F8F9FB]
              focus:outline-none focus:ring-1 focus:border-transparent transition-colors duration-200 min-h-[44px]
              ${error ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-[#2648EA] focus:ring-[#2648EA]"}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            defaultValue=""
            {...props}
          >
            <option value="" disabled>
              -- Choose a Region --
            </option>
            {options.map((region: string) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...register(name)}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-[8px] text-[#323539] placeholder-gray-500
              focus:outline-none focus:ring-1 focus:border-transparent bg-[#F8F9FB]
              transition-colors duration-200 min-h-[44px]
              ${error ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-[#2648EA] focus:ring-[#2648EA]"}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            {...props}
          />
        )}
      </div>
      {error && (
        <div
          id={`${name}-error`}
          className="flex items-center gap-2 text-sm text-red-600"
          role="alert"
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default function RegistrationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FacilityFormData>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facility_name: "",
      facility_number: "",
      facility_email: "",
      address: "",
      city: "",
      region: "",
      ghana_post_address: "",
      license_number: "",
    },
  });

  // API mutation
  const postPharmacyInformation = useMutation({
    mutationFn: async (formData: FacilityFormData) => {
      try {
        const res = await customAxios.post(endpoints.pharmacy, formData);
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  const onSubmit = async (data: FacilityFormData) => {
    postPharmacyInformation.mutate(data, {
      onSuccess: (response: any) => {
        if (response.status === 201) {
          const pharmacyId = response?.data?.id;
          dispatch(setFacilityId(pharmacyId));
          toast.success("Pharmacy information created successfully!");
          queryClient.invalidateQueries({
            queryKey: ["PharmacyInformation"],
          });
          router.push("/personal-information");
        }
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-inter">
      {/* Header */}
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#323539] mb-2">
            Pharmacy Information
          </h1>
          <p className="text-gray-600">Details about your pharmacy</p>
        </div>
        {/* Progress Stepper */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 px-4">
            <span className="text-main text-sm hidden md:flex gap-2 font-inter items-center font-semibold">
              <TbSquareRoundedNumber1 className="text-main text-4xl" />
              Pharmacy Details
              <MdLinearScale className="text-main hidden md:block text-xl" />
            </span>
            <span className="text-sm flex gap-2 font-inter items-center font-semibold">
              <TbSquareRoundedNumber2 className="text-3xl text-slate-400" />
              Personal Inforamtion
              <MdLinearScale className="hidden md:block" />
            </span>
            <span className="text-sm hidden md:flex gap-2 items-center font-inter font-semibold">
              <TbSquareRoundedNumber3 className="text-3xl text-slate-400" />
              Make Payment
            </span>

          </div>
        </div>
        

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Facility Name"
                  name="facility_name"
                  placeholder="Enter facility name"
                  icon={Building2}
                  register={register}
                  error={errors.facility_name?.message}
                />

                <InputField
                  label="Facility Number"
                  name="facility_number"
                  placeholder="Enter facility number"
                  icon={Hash}
                  register={register}
                  error={errors.facility_number?.message}
                />

                <InputField
                  label="Facility Email"
                  name="facility_email"
                  type="email"
                  placeholder="facility@example.com"
                  icon={Mail}
                  register={register}
                  error={errors.facility_email?.message}
                />

                <InputField
                  label="Address"
                  name="address"
                  placeholder="Enter street address"
                  icon={MapPin}
                  register={register}
                  error={errors.address?.message}
                />

                <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  icon={Map}
                  register={register}
                  error={errors.city?.message}
                />

                <InputField
                  label="Region"
                  name="region"
                  type="select"
                  options={regions}
                  placeholder="--choose a region--"
                  icon={Globe}
                  register={register}
                  error={errors.region?.message}
                />

                <InputField
                  label="Ghana Post Address"
                  name="ghana_post_address"
                  placeholder="Enter Ghana Post address"
                  icon={MapPin}
                  register={register}
                  error={errors.ghana_post_address?.message}
                />

                <InputField
                  label="License Number"
                  name="license_number"
                  placeholder="PC/XX/XX/0000X"
                  icon={FileText}
                  register={register}
                  error={errors.license_number?.message}
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <p className="text-sm text-gray-600 mb-2">
                    Already have an account?
                  </p>
                  <Link
                    href="/login"
                    className="text-[#2648EA] hover:text-[#1a3bc7] font-medium focus:outline-none focus:ring-offset-2 rounded px-1 py-1 transition-colors duration-200"
                  >
                    Login Here
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || postPharmacyInformation.isPending}
                  className="
                    w-full md:w-auto flex justify-center items-center py-3 px-6 border border-transparent rounded-[8px]
                    text-sm font-medium text-white bg-[#2648EA] hover:bg-[#1a3bc7]
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2648EA]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors duration-200 min-h-[44px] min-w-[140px]
                  "
                >
                  {isSubmitting || postPharmacyInformation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
