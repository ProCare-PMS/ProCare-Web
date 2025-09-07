"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, CircleUser, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import MainNavRoutes from "./MainNavRoutes";
import EndShiftModal from "../Modals/EndShiftModal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileState, setMobileState] = useState(false);

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const accountType =
    typeof window !== "undefined" ? localStorage.getItem("accountType") : null;
  const [getUser] = useState<any>(storedUser);

  // Memoize API Call
  const getPersonalData = useQuery({
    queryKey: ["personalInformation"],
    queryFn: async () =>
      customAxios
        .get(
          accountType === "employee"
            ? `${endpoints.managements}employees/${getUser?.id}/`
            : `${endpoints.user}${getUser?.id}/`
        )
        .then((res) => res?.data),
    enabled: !!getUser?.id,
  }).data;

  const iconName =
    accountType === "employee"
      ? getPersonalData?.full_name.split(" ")[0][0] +
        getPersonalData?.full_name.split(" ")[1][0]
      : getPersonalData?.first_name[0] + getPersonalData?.last_name[0];

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const toggleMobileNav = () => {
    setMobileState(!mobileState);
  };

  // Close mobile nav when screen becomes desktop-sized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileState(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-20 left-0 bg-white">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-[5rem] p-3">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/RxPMSlogo.png"
                width={180}
                height={100}
                className="mt-[-0.8rem]"
                alt="RxPMS"
              />
            </Link>

            {/* Navigation Routes */}
            <div className="hidden md:flex">
              <MainNavRoutes toggleMobileNav={toggleMobileNav} />
            </div>

            {/* User Avatar and Dropdown */}
            <div className="flex relative items-center gap-[6px]">
              <span className="text-[#f1f0ef] bg-rose-700 rounded-full p-1 border-2">
                {typeof iconName === "string" ? iconName : ""}
              </span>
              <div className="font-inter">
                <h2 className="text-sm font-semibold sev">
                  {accountType === "employee"
                    ? getPersonalData?.full_name ?? ""
                    : `${getPersonalData?.first_name ?? ""} ${
                        getPersonalData?.last_name ?? ""
                      }`}
                </h2>
                <span className="text-sm font-medium text-[#858C95]">
                  {new Date().toDateString()}
                </span>
              </div>
              <div className="relative">
                <ChevronDown
                  className="cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="bg-white absolute w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-20 rounded-[8px]">
                    <ul className="flex flex-col justify-center">
                      <li>
                        <Link
                          prefetch={true}
                          href="/settings"
                          className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm"
                        >
                          <CircleUser />
                          Profile
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <Link
                          prefetch={true}
                          href="/help"
                          className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm"
                        >
                          <Info /> Help
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <span
                          onClick={handleOpenModal}
                          className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <LogOut /> End Shift
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={toggleMobileNav} className="block md:hidden">
                <RxHamburgerMenu className="h-6 w-6 text-black" />
              </button>
              {isModalOpen && <EndShiftModal setModal={handleCloseModal} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Routes */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg 
          transition-transform transform duration-300 z-50 ${
            mobileState ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileNav}>
            <IoIosClose className="h-10 w-10 " size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex md:hidden">
            <MainNavRoutes toggleMobileNav={toggleMobileNav} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
