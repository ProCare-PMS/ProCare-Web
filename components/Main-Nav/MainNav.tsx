"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, CircleUser, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import MainNavRoutes from "./MainNavRoutes";
import EndShiftModal from "../Modals/EndShiftModal";

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const accountType = typeof window !== "undefined" ? localStorage.getItem("accountType") : null;
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

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <header className="fixed top-0 w-full z-20 left-0 bg-white">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-[5rem] p-3">
          {/* Logo */}
          <Image src="/RxPMSlogo.png" width={180} height={100} className="mt-[-0.8rem]" alt="RxPMS" />

          {/* Navigation Routes */}
          <MainNavRoutes />

          {/* User Avatar and Dropdown */}
          <div className="flex relative items-center gap-[6px]">
            <Image width={30} height={30} src="/icons/Avatar.png" alt="Avatar Icon" />
            <div className="font-inter">
              <h2 className="text-sm font-semibold sev">
                {accountType === "employee"
                  ? getPersonalData?.full_name
                  : `${getPersonalData?.first_name} ${getPersonalData?.last_name}`}
              </h2>
              <span className="text-sm font-medium text-[#858C95]">{new Date().toDateString()}</span>
            </div>
            <div className="relative">
              <ChevronDown className="cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
              {showMenu && (
                <div className="bg-white absolute w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-20 rounded-[8px]">
                  <ul className="flex flex-col justify-center">
                    <li>
                      <Link prefetch={true} href="/settings" className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm">
                        <CircleUser /> Profile
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link prefetch={true} href="/help" className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm">
                        <Info /> Help
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <span onClick={handleOpenModal} className="py-3 px-6 text-[#344054] flex items-center gap-2 text-sm cursor-pointer">
                        <LogOut /> End Shift
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {isModalOpen && <EndShiftModal setModal={handleCloseModal} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
