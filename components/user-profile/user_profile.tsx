"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const [accountInfo, setAccountInfo] = useState<any[]>([]);

  useEffect(() => {
    // Only access localStorage on the client side
    const storedAccounts = localStorage.getItem("accounts");
    if (!!storedAccounts) {
      setAccountInfo(JSON.parse(storedAccounts));
    }
  }, []);
  //"/user-passcode"
  return (
    <div className="bg-[#F9F9F9] h-screen w-screen flex justify-center items-center">
      <div className="w-1/2 h-3/5 flex flex-col items-center justify-between gap-4">
        <h2 className="text-[#2648EA] font-semibold text-3xl">
          Who’s on Shift?
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {accountInfo?.length > 0 ? (
            accountInfo.map((detail: any, index: number) => (
              <div key={index} className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("accountId", detail.id);
                    window.location.href = "/user-passcode";
                  }}
                >
                  <div className="w-52 h-52 bg-white flex justify-center items-center rounded-xl">
                    <div className="w-[50%] h-[50%]">
                      <Image
                        className="w-full h-full"
                        src="/profile.jpg"
                        width={50}
                        height={50}
                        alt="profileImage"
                      />
                    </div>
                  </div>
                </button>
                <div>
                  <span className="font-bold mt-2">{detail.name}</span>
                </div>
              </div>
            ))
          ) : (
            <span>No accounts available</span>
          )}
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
