"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropDown from "@/app/(dashboard)/_components/DropDown";
import MainNavRoutes from "./MainNavRoutes";
import { FaChevronDown } from "react-icons/fa";
import AvatarDropDown from "../DropDown/AvatarDropdown";
import Link from "next/link";

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-20 left-0 bg-white">
      <div className="container mx-auto px-16 ">
        <div className=" flex items-center  justify-between h-[5rem]">
          {/* Logo */}
          <div>
            <Image
              src="/Procare-Logo.png"
              width={155}
              height={66}
              className="mt-[-0.8rem]"
              alt="Procare Logo"
            />
          </div>

          {/* Navigation Routes */}

          <MainNavRoutes />

          {/* User Avatar and dropdown */}
          <div className="flex relative items-center gap-[6px]">
            <Image
              width={30}
              height={30}
              src="/icons/Avatar.png"
              alt="Avatar Icon"
            />
            <div className="font-inter">
              <h2 className="text-sm font-semibold sev">John Doe</h2>
              <span className="text-sm font-medium text-[#858C95]">
                24/05/2024
              </span>
            </div>
            <div className="relative">
              <FaChevronDown
                className="cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="bg-white absolute w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-20 rounded-[8px]">
                  <ul className="flex flex-col">
                    <Link
                      href="profile"
                      className="py-3 px-4 text-[#344054] font-normal text-sm"
                    >
                      Profile
                    </Link>
                    <hr />
                    <Link
                      href="/help"
                      className="py-3 px-6 text-[#344054] font-normal text-sm"
                    >
                      Help
                    </Link>
                    <hr />
                    <span className="py-3 px-6 text-[#344054] font-normal text-sm">
                      <Link href={"/login"}>`Log Out`</Link>
                    </span>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
