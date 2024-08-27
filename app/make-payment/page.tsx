import React from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";
import CardSection from "./CardSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PackageInput from "./PackageInput";
import { DivideCircle } from "lucide-react";

const MakePaymentPage = () => {
  return (
    <div className="min-h-screen py-8 mx-auto px-8 bg-home">
      <div className="flex gap-4 items-center ml-6">
        <Image
          src="/assets/images/RxPmsLogo.svg"
          width={85}
          height={66}
          className="mt-[-0.8rem]"
          alt="Procare Logo"
        />
        <span className="font-bold text-3xl font-inter">Registration</span>
      </div>

      <div className="flex flex-col items-center mt-24 justify-center">
        <h1 className="text-2xl md:text-5xl text-center font-inter font-bold mb-4">
          Make Payment
        </h1>
        <p className="mb-8 font-roboto">Select package and pay.</p>
        <div className="flex items-center gap-2">
          <span className="text-main text-sm font-inter flex gap-2 items-center font-semibold">
            <IoIosCheckmarkCircle className="text-main text-4xl" />
            Pharmacy Details
            <MdLinearScale className="text-main text-xl" />
          </span>
          <span className="text-sm flex gap-2 font-inter text-main items-center font-semibold">
            <TbSquareRoundedNumber2 className="text-main text-3xl" />
            Personal Inforamtion
            <MdLinearScale />
          </span>
          <span className="text-sm flex gap-2 font-inter items-center font-semibold text-main">
            <TbSquareRoundedNumber3 className="text-3xl text-main" />
            Make Payment
          </span>
        </div>

        <div className="mt-8">
          <div className="flex">
            {/* Left Side */}
            <PackageInput />

            {/* Right Side */}
            <div>
              <CardSection />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row items-center justify-between mt-6">
            <Link
              href="/"
              className="text-main font-inter rounded-[5px] border-main text-center w-[140px] border-2  px-5 py-2 font-semibold text-sm"
            >
              Previous
            </Link>

            <Button
              type="submit"
              className="text-white rounded-[5px] font-inter w-[140px]"
              variant="secondary"
            >
              Make Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentPage;
