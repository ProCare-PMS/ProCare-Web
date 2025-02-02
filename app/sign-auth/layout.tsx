import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full relative">
      {/* Optimized logo image */}
      <nav className="absolute top-0 left-0 w-40">
        <Image
          src="/RxPMSlogo.png"
          width={160}
          height={40}
          quality={75}
          alt="RxPMS Logo"
          priority // Only needed for the logo
        />
      </nav>

      <div className="flex flex-col md:flex-row justify-center items-center h-full">
        {children}

        {/* Side content only visible on larger screens */}
        <div className="hidden md:flex w-1/2 h-full bg-white flex-col justify-center items-center gap-4">
          <div className="w-[80%] text-center md:text-left">
            <h1 className="text-3xl font-semibold leading-tight">
              Simplifying{" "}
              <span className="text-[#2648EA]">Pharmacy Management</span>, one click at a time.
            </h1>
            <p className="my-4 text-gray-700">
              Streamline your pharmacy with RxPMS – All-in-one system for sales, inventory, analysis & more!
            </p>
          </div>

          {/* Optimized Image - Lazy loading */}
          <div className="w-full flex justify-center">
            <Image
              src="/assets/images/rafikisvg.svg"
              width={400}
              height={300}
              alt="Illustration"
              loading="lazy" // Defers loading for better performance
              quality={80} // Reduce quality to improve performance
            />
          </div>

          {/* Optimized links */}
          <div className="w-3/4 flex justify-around items-center text-gray-700">
            <Link href="https://prohealium.com/about" target="_blank" rel="noopener noreferrer">
              About Us
            </Link>
            <Link href="https://prohealium.com/contact" target="_blank" rel="noopener noreferrer">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
