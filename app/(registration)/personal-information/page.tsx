"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Building2,
  Hash,
  Mail,
  AlertCircle,
  User,
  CreditCard,
  Lock
} from "lucide-react";



// Implementing Zod validation schema
const personalInfoSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  password2: z.string().min(1, { message: "Confirm password is required" }),
  ghana_card: z.string().min(1, { message: "Ghana card is required" }),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;


// Input Field Component with Login styling
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
  rightIcon,
  ...props
}: {
  label: string;
  name: keyof PersonalInfoFormData;
  type?: string;
  placeholder: string;
  icon: any;
  register: any;
  error?: string;
  rightIcon?: React.ReactNode;
  // ...other props
} & any) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#323539]"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          {...register(name)}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`
            block w-full pl-10 pr-3 py-3 border rounded-[8px] text-[#323539] placeholder-gray-500
            focus:outline-none focus:ring-1 focus:border-transparent bg-[#F8F9FB]
            transition-colors duration-200 min-h-[44px]
            ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 focus:border-[#2648EA] focus:ring-[#2648EA]"
            }
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
         {/* Eye Icon Area */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
            {rightIcon}
          </div>
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





//type FacilityFormData = z.infer<typeof userRegistrationSchema>;

const RegistrationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit: rhfHandleSubmit } = useForm();
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
     setIsSubmitting(true); // Set submitting state to true

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
            Personal Information
          </h1>
          <p className="text-gray-600">Admin Details</p>
        </div>
        {/* Advance Stepper */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 px-4">
          <span className="text-main text-sm hidden md:flex gap-2 font-inter items-center font-semibold">
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
        </div>
      {/* Main Content section */}
    <div className="max-w-4xl mx-auto">
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Form Field Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* First Name input field */}
              <div>
                <div >
                 <InputField
                    label="First Name"
                    name="first_name"
                    placeholder="Enter first name"
                    icon={User}
                    register={register}
                    error={errors.first_name? errors.first_name : undefined}
                    />
                </div>           
              </div>

              {/* Last Name input field*/}
              <div>
                <InputField
                    label="Last Name"
                    name="last_name"
                    placeholder="Enter last name"
                    icon={User}
                    register={register}
                    error={errors.last_name? errors.last_name : undefined}
                    />          
              </div>

              {/* Email input field */}
              <div>
                <InputField
                    label="Email"
                    name="email"
                    placeholder="example23@gmail.com"
                    icon={Mail}
                    register={register}
                    error={errors.email? errors.email : undefined}
                    />                       
              </div>

              {/* Phone Number input field */}
              <div>
                <InputField
                label="Phone Number"
                name="phone_number"
                placeholder="+233 000 000 000"
                icon={Hash}
                register={register}
                error={errors.phone_number? errors.phone_number : undefined}
                />
              </div>

              {/* Password */}
              <div>
                <div>
                  <InputField
                    label="Password"
                    name="password"
                    placeholder="password"
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    error={errors.password? errors.password : undefined}
                    register={register}
                    rightIcon={
                   
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  }
                    
                 />
                    
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <div>
                  <InputField
                    label="Confirm Password"
                    name="password2"
                    placeholder="confirm password"
                    icon={Lock}
                    type={showConfirmPassword ? "text" : "password"}
                    error={errors.password2? errors.password2 : undefined}
                    register={register}
                    rightIcon={
                      
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  }
                  />

                </div>
                  
              </div>

              {/* Ghana Card */}
              <div>
                <InputField
                  label="Ghana Card"
                  name="ghana_card"
                  icon={CreditCard}
                  placeholder="GHA-000000000-0"
                  register={register}
                  error={errors.ghana_card? errors.ghana_card : undefined}
                />
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
              className=" w-full md:w-[140px] bg-blue-600 text-white rounded-[5px] px-5 py-2 font-semibold text-sm"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div> 
      </div>
    </div>
  );
};

export default RegistrationPage;
