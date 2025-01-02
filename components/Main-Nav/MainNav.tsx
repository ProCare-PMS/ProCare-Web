"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropDown from "@/app/(dashboard)/_components/DropDown";
import MainNavRoutes from "./MainNavRoutes";
import { FaChevronDown } from "react-icons/fa";
import AvatarDropDown from "../DropDown/AvatarDropdown";
import { LogOut } from "lucide-react";
import { CircleUser } from "lucide-react";
import { Info } from "lucide-react";
import Link from "next/link";
import EndShiftModal from "../Modals/EndShiftModal";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getUser, setGetUser] = useState<any>({});

  //get personal info data
  const { data: getPersonalData } = useQuery({
    queryKey: ["personalInformation"],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.user}${getUser?.id}/`)
        .then((res) => res?.data),
    enabled: !!getUser?.id,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Set user from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setGetUser(user);
    }
  }, []);

  return (
    <header className="fixed top-0 w-full z-20 left-0 bg-white">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-[5rem] p-3">
          {/* Logo */}
          <div className="">
            <Image
              src="/RxPMSlogo.png"
              width={180}
              height={100}
              className="mt-[-0.8rem]"
              alt="RxPMS"
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
              <h2 className="text-sm font-semibold sev">
                {getPersonalData?.first_name} {getPersonalData?.last_name}
              </h2>
              <span className="text-sm font-medium text-[#858C95]">
                {new Date().toDateString()}
              </span>
            </div>
            <div className="relative">
              <FaChevronDown
                className="cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="bg-white absolute w-[180px] shadow-md transition top-12 hover:shadow-lg right-0 z-20 rounded-[8px]">
                  <ul className="flex flex-col justify-center">
                    <li>
                      <Link
                        href="profile"
                        className="py-3 px-6 text-[#344054] font-normal flex items-center gap-2 text-sm"
                      >
                        <CircleUser />
                        Profile
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        href="/help"
                        className="py-3 px-6 text-[#344054] font-normal flex items-center gap-2 text-sm"
                      >
                        <Info />
                        Help
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <span
                        onClick={handleOpenModal}
                        className="py-3 px-6 text-[#344054] font-normal flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <LogOut />
                        End Shift
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {isModalOpen && (
              <EndShiftModal
                setModal={handleCloseModal} // Pass the selected row data to the modal
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
