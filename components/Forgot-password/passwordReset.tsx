"use client"
import React, {useEffect, useState} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import customAxios from "@/api/CustomAxios";
import { useRouter } from "next/navigation";
import { endpoints } from "@/api/Endpoints";
import { Eye, EyeOff } from "lucide-react";

const createAccountSchema = z.object({
  code: z.string().min(6, { message: "OTP must be 6 digits" }).regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

interface PasswordResetModalProps {
  token: string;
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({token}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [resetToken, setResetToken] = useState(token || "")
  const [passwordType, setPasswordType] = useState('password')
  const [confPasswordType, setConfPasswordType] = useState('password')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: ""
    },
  });

  useEffect(() => {
    setResetToken(token)
  }, [token])

  const toggleVisibility = (inputField : string) => {

    if (inputField === "password"){
      if(passwordType === "password"){
        setPasswordType("text")
      }else{
        setPasswordType("password")
      }
    }else{
      if(confPasswordType === "password"){
        setConfPasswordType("text")
      }else{
        setConfPasswordType("password")
      }
    }
  }


  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      const res = await customAxios.post(endpoints.resetPassword, {
        code: data.code,
        token: resetToken,
        password: data.password
      });
      toast.success("Password successfully reset!", {description: "Log in with new password"});
      reset();
      router.push('/login')
      return res.data;
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setSubmitError(error.response.data.message || "Invalid OTP or password");
      } else if (error?.response?.status === 401) {
        setSubmitError("OTP has expired. Please request a new one.");
      } else {
        setSubmitError("An error occurred. Please try again later.");
      }
      console.error("Password reset error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return ( 
    <>
      <section className={`z-50 w-screen px-6 h-screen flex items-center justify-center absolute inset-0 bg-black/80`}>
        <div className="w-full max-w-[600px] p-6 rounded-xl bg-white">
            <form className="space-y-4 font-inter" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-xl mb-8 font-bold text-center">Reset Your Password</h2>
              
              {submitError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}
              
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter 6-digit OTP
                </label>
                <input 
                  id="code"
                  className="appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 placeholder:text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB]" 
                  type="text" 
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  disabled={isSubmitting}
                  {...register("code")}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="flex w-full gap-2 items-center px-3 border bg-[#F8F9FB]">
                  <input 
                    id="password"
                    className="appearance-none flex-grow  rounded h-12 py-2 text-gray-700 placeholder:text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-[inherit]"  
                    type={passwordType}
                    placeholder="Enter new password" 
                    disabled={isSubmitting}
                    {...register("password")}
                  />
{
                    passwordType === "password" ?
                    <button type="button" onClick={() => toggleVisibility("password")}>
                      <Eye  className="text-red-500 transition-all duration-150"/>
                    </button>
                    :
                    <button type="button" onClick={() => toggleVisibility("password")}>
                      <EyeOff className="text-green-600 transition-all duration-150"/>
                    </button>
                  }

                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="flex w-full gap-2 items-center px-3 border bg-[#F8F9FB]">
                  <input 
                    id="confirmPassword"
                    className="appearance-none flex-grow  rounded h-12 py-2 text-gray-700 placeholder:text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-[inherit]" 
                    type={confPasswordType}
                    placeholder="Confirm password"
                    disabled={isSubmitting}
                    {...register("confirmPassword")}
                  />
                  {
                    confPasswordType === "password" ?
                    <button type="button" onClick={() => toggleVisibility("confPassword")}>
                      <Eye  className="text-red-500 transition-all duration-150"/>
                    </button>
                    :
                    <button type="button" onClick={() => toggleVisibility("confPassword")}>
                      <EyeOff className="text-green-600 transition-all duration-150"/>
                    </button>
                  }
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="w-full flex justify-end">
                <button 
                  className="bg-blue-600 px-4 py-2 rounded-[10px] text-white flex items-center" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : "Reset Password"}
                </button>
              </div>
            </form>
        </div>
      </section>
    </>
  );
}
 
export default PasswordResetModal;