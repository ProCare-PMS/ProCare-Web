import React from "react";
import Image from "next/image";

export default function SignAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full relative">
      <nav className="bg-transparent w-40 absolute -top-5 left-0">
        <Image
          className="w-full h-full"
          src="/RxPMSlogo.png"
          width={500}
          height={500}
          quality={75}
          alt="logo"
        />
      </nav>
      <div className="flex flex-col md:flex-row justify-center items-center">
        {children}
        <div className="hidden w-1/2 h-screen bg-white md:flex justify-center items-center flex-col gap-4">
          <div className=" w-[557.09px] h-[550.1px] flex justify-center items-center flex-col gap-4">
            <div className="w-[80%] gap-4">
              <h1 className="w-full font-inter text-4xl font-semibold leading-10 text-left tracking-wide">
                Simplifying{" "}
                <span className="text-[#2648EA] text-4xl">
                  Pharmacy Management
                </span>
                , one click at a time.
              </h1>
              <p className="my-4">
                Streamline your pharmacy with Procare - All-in-one system for
                sales, inventory, analysis & more!
              </p>
            </div>

            <div className="w-full h-1/2">
              <Image
                className="w-full h-full"
                src="/assets/images/rafikisvg.svg"
                width={50}
                height={50}
                alt="rafikis"
                priority
                quality={100}
              />
            </div>
            <div className="w-3/4 flex justify-around items-center text-[#323539]">
              <span>
                <a href="#">Privacy & Terms</a>
              </span>
              <span>
                <a href="#">Contact Us</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
