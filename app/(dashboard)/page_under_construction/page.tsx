import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoveLeft } from "lucide-react";

function UnderConstruction() {
  return (
    <div>
      <div className="bg-white h-full w-full m-auto">
        <div className="flex flex-col justify-center items-center gap-4 py-20">
          <div className="w-100">
            <Image
              src="/assets/images/rafiki.png"
              alt="In progress"
              width="300"
              height="100"
            />
          </div>

          <div className="grid place-items-center gap-2">
            <h2 className="text-[#1D1D21] font-inter text-2xl font-semibold">
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
    </div>
  );
}

export default UnderConstruction;
