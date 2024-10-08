"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import PersonalContactForm from "./_components/PersonalContactForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";
import PersonalNameForm from "./_components/PersonalNameForm";

const formSchema = z.object({
  firstName: z.string({
    required_error: "First Name is required",
  }),
  emailAddress: z.string({
    required_error: "Email Address is required",
  }),
  lastName: z.string({
    required_error: "Last Name is required",
  }),
  number: z.string({
    required_error: "Number is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
  confirmPassword: z.string({
    required_error: "Facility Address is required",
  }),
  ghanaCardNumber: z.string({
    required_error: "Region is required",
  }),
});

type FacilityFormData = z.infer<typeof formSchema>;

const RegistrationPage = () => {
  const form = useForm<FacilityFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="min-h-screen mx-auto py-8 px-8 bg-home">
      <div className="flex gap-4 items-center  md:ml-[2.25rem]">
        <Image
          src="/RxPMSlogo.png"
          width={150}
          height={100}
          className="mt-[-0.8rem]"
          alt="Procare Logo"
        />
        <span className="font-bold text-3xl font-inter">Registration</span>
      </div>

      <div className="flex flex-col items-center mt-24 justify-center">
        <h1 className="text-2xl md:text-5xl font-inter text-center font-bold mb-2">
          Personal Information
        </h1>
        <p className="mb-8 font-roboto">Admin Details</p>
        <div className="flex items-center gap-2 px-4">
          <span className="text-main text-sm flex gap-2 font-inter items-center font-semibold">
            <IoIosCheckmarkCircle className="text-main text-4xl" />
            Pharmacy Details
            <MdLinearScale className="text-main text-xl" />
          </span>
          <span className="text-sm flex gap-2 text-main font-inter items-center font-semibold">
            <TbSquareRoundedNumber2 className="text-main text-3xl" />
            Personal Inforamtion
            <MdLinearScale />
          </span>
          <span className="text-sm flex gap-2 items-center font-inter font-semibold">
            <TbSquareRoundedNumber3 className="text-3xl text-slate-400" />
           Make Payment
          </span>
        </div>

        <Form {...form}>
          <form action="" className="mt-8 mb-[5rem]">
            <div className="flex flex-col md:w-[55.5rem] md:h-[27rem] md:gap-4 md:flex-row bg-white px-[4.62rem] py-[2.12rem] rounded-2xl">
              <PersonalNameForm />
              <PersonalContactForm />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-[2.81rem]">
              <Link
                href="/"
                className="text-main border-main font-inter text-center w-[140px] border-2 rounded-[5px] px-5 py-2 font-semibold text-sm"
              >
                Previous
              </Link>

              <Button asChild
                type="submit"
                className="text-white w-[140px] font-inter"
                variant="secondary"
              >
                <Link href="/make-payment">Next</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
