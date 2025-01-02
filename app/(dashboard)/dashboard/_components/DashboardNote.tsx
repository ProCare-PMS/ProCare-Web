"use client";
import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const DashboardNote = () => {
  const [showDiv, setShowDiv] = useState(true);
  const [getUser, setGetUser] = useState<any>({});
  const queryClient = useQueryClient();

  //get personal info data
  const { data: getPersonalData } = useQuery({
    queryKey: ["personalInformation"],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.user}${getUser?.id}/`)
        .then((res) => res?.data),
    enabled: !!getUser?.id,
  });

  const handleSaveBtn = () => {
    setShowDiv(false);
  };

  // Set user from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setGetUser(user);
    }
  }, []);

  return (
    <div>
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
                Welcome to ProHealium RxPMS management,{" "}
                {getPersonalData?.first_name} {getPersonalData?.last_name}
              </h2>
              <span className="font-medium  text-[#858C95] text-sm mx-auto">
                Your pharmacy number is{" "}
                <span className="font-bold text-[#2648EA]">
                  {getPersonalData?.custom_pharmacy_id}
                </span>
                . For a seamless ProHealium exprience save your pharmacy number
                now. This will allow you to quickly access you to pharmacy
                information and features across the app
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
    </div>
  );
};

export default DashboardNote;
