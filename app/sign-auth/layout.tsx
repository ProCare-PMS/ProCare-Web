import React from "react";
import Image from "next/image";

export default function SignAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      {children}
      <div className="w-1/2 bg-white flex justify-center items-center flex-col gap-4">
        <div className=" w-[557.09px] h-[626.1px] flex justify-center items-center flex-col gap-4">
          <div className="w-[80%] gap-4">
            <h1 className="font-inter text-4xl font-semibold leading-10 text-left tracking-wide">
            Simplifying <span className="text-[#2648EA] text-4xl">Pharmacy Management</span>, one click at a time.
          </h1>
          <p className="my-4">Streamline your pharmacy with Procare - All-in-one system for sales, inventory, analysis & more!</p>
          </div>
          
          <div className="w-full">
            <Image className="w-full h-full" src="/assets/images/rafiki.jpg" width={50}  height={50} alt="rafiki" priority quality={100}/>
          </div>
        </div>
      </div>
    </div>
  );
}
