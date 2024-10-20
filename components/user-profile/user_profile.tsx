import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function User_profile() {
  return (
    <div className="bg-[#F9F9F9] h-screen w-screen flex justify-center items-center">
      <div className="w-1/2 h-3/5 flex flex-col items-center justify-between gap-4">
        <h2 className="text-[#2648EA] font-semibold text-3xl">
          Who’s on Shift?
        </h2>
        <div className="flex flex-col justify-center items-center gap-2">
          <Link href="/user-passcode">
            <div className="w-52 h-52 bg-white flex justify-center items-center rounded-xl">
              <div className="w-[50%] h-[50%]">
                <Image
                  className="w-full h-full"
                  src="/assets/images/profile.jpg"
                  width={50}
                  height={50}
                  alt="profileImage"
                />
              </div>
            </div>
          </Link>
          <div>
            <span className="font-bold">Admin</span>
          </div>
        </div>

        <div>
          <span>Back to</span>{" "}
          <a href="/login" className="text-[#2648EA]">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
