"use client";
import React, { useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DashboardNote = () => {
  const [showDiv, setShowDiv] = useState(true);
  const handleSaveBtn = () => {
    setShowDiv(false);
  };
  return (
    <>
      {showDiv && (
        <div className="border border-[#2648EA] mt-8 bg-[#EFF0FE] font-inter rounded-xl p-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* <Home color="blue" /> */}
            <Image
              className=""
              src="/house.png"
              width={20}
              height={50}
              quality={75}
              alt="home"
            />
            <div>
              <h2 className="text-[#323539] text-center md:text-left text-sm font-semibold">
                Welcome to Procare Pharmacy management, John Doe
              </h2>
              <span className="font-medium  text-[#858C95] text-sm mx-auto">
                Your pharmacy number is{" "}
                <span className="font-bold text-[#2648EA]">88888</span>. For a
                seamless Procare exprience save your pharmacy number now. This
                will allow you to quickly access you to pharmacy information and
                features across the app
              </span>
            </div>
          </div>

          <div>
            <Button
              className="bg-[#2648EA] text-white font-semibold text-sm rounded-[0.3rem]"
              onClick={handleSaveBtn}
            >
              Save Number
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNote;
