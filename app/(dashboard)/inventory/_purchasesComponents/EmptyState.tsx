import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoveLeft } from "lucide-react";

const productsItems = [];

const EmptyState = () => {
  return (
    <div>
      <div
        className="bg-white shadow-md  
        shadow-offset-x-2 shadow-offset-y-2 
        shadow-spread-x-4 shadow-spread-y-4 mt-8 px-96 py-44 flex flex-col items-center justify-center"
      >
        <Image
          src="/assets/images/rafiki.png"
          alt="In progress"
          width="300"
          height="180"
        />
        <div className="grid place-items-center">
          <h2 className="text-[#1D1D21] mt-12 mb-2 font-inter text-2xl font-semibold">
            Page under construction
          </h2>
          <p className="text-[#848199] mb-7 font-inter font-normal text-sm">
            Kindly try again to access the full functionality
          </p>
          <Link
            href="/dashboard"
            className="text-white font-semibold text-sm 
            bg-[#2648EA] py-2 px-9 relative 
            flex items-center gap-4 rounded-[12px] font-inter "
          >
            <MoveLeft />
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
