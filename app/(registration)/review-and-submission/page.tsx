"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { PiNumberCircleThree, PiNumberCircleTwo } from "react-icons/pi";
import { TbSquareRoundedNumber2, TbSquareRoundedNumber3 } from "react-icons/tb";

const ReviewAndSubmission = () => {
  return (
    <div className="min-h-screen py-8 mx-auto px-8 bg-home">
      <div className="flex gap-4 items-center ml-6">
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
        <h1 className="text-2xl md:text-5xl text-center font-inter font-bold mb-4">
          Review And Submission
        </h1>
        <p className="mb-8 font-roboto">Review overall details</p>
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
            Review and submit
          </span>
        </div>

        <div className="mt-8">
          <div className="flex flex-col md:flex-row w-full bg-white px-11 py-9 text-left gap-8">
            <div>
              <h2 className="text-2xl mb-8 font-inter">
                Summary of Account Information:
              </h2>
              <p className="font-inter font-normal text-[#1A1A1A]">
                Facility Name:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  Procare Pharma{" "}
                </span>{" "}
              </p>
              <p className="font-inter font-normal my-2 text-[#1A1A1A]">
                Facility Number:{" "}
                <span className="text-[#686868] font-normal"> 04333388 </span>
              </p>
              <p className="font-inter font-normal text-[#1A1A1A]">
                Facility Email:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  hfhfhfh@gmail.com{" "}
                </span>
              </p>
              <p className="font-inter my-2 font-normal text-[#1A1A1A]">
                Address:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  No 45 Backlog Street{" "}
                </span>
              </p>
              <p className="font-inter font-normal text-[#1A1A1A]">
                City:{" "}
                <span className="text-[#686868] font-normal"> Accra </span>
              </p>
              <p className="font-inter my-2 font-normal text-[#1A1A1A]">
                Region:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  Greater Accra{" "}
                </span>
              </p>
              <p className="font-inter font-normal text-[#1A1A1A]">
                Facility Licenese Number:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  4563-847939-322{" "}
                </span>
              </p>
              <p className="font-inter font-normal my-2 text-[#1A1A1A]">
                Ghana Post Address:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  GA-354-233-211{" "}
                </span>
              </p>
            </div>
            <div className="mt-16">
              <p className="font-inter  font-normal text-[#1A1A1A]">
                First Name:{" "}
                <span className="text-[#686868] font-normal"> John </span>
              </p>
              <p className="font-inter my-2 font-normal text-[#1A1A1A]">
                Last Name:{" "}
                <span className="text-[#686868] font-normal"> Doe </span>
              </p>
              <p className="font-inter font-normal text-[#1A1A1A]">
                Email:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  johndoe@gmail.com{" "}
                </span>
              </p>
              <p className="font-inter my-2 font-normal text-[#1A1A1A]">
                Ghana Card:{" "}
                <span className="text-[#686868] font-normal">
                  {" "}
                  GHA-12345566789{" "}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row items-center justify-between mt-4">
            <Link
              href="/"
              className="text-main font-inter rounded-[5px] border-main text-center w-[140px] border-2  px-5 py-2 font-semibold text-sm"
            >
              Previous
            </Link>

            <Button
              type="submit"
              className="text-white rounded-[5px] font-inter w-[140px]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmission;
