"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [accountInfo, setAccountInfo] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccounts = localStorage.getItem("accounts");
      if (storedAccounts) {
        setAccountInfo(JSON.parse(storedAccounts));
      }
    }
  }, []);

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-6 flex flex-col items-center justify-between gap-4">
        <h2 className="text-[#2648EA] font-semibold text-3xl">
          Who’s on Shift?
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {accountInfo.length > 0 ? (
            accountInfo.map((detail, index) => (
              <div key={index} className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("accountId", detail.id);
                    router.push("/user-passcode");
                  }}
                >
                  <div className="w-52 h-52 bg-white flex justify-center items-center rounded-xl shadow-md transition hover:scale-105">
                    <Image
                      src="/profile.jpg"
                      width={120}
                      height={120}
                      priority
                      alt="Profile Image"
                      className="rounded-full"
                    />
                  </div>
                </button>
                <div className="mt-2 font-bold">{detail.name}</div>
              </div>
            ))
          ) : (
            <span>No accounts available</span>
          )}
        </div>

        <div>
          <span>Back to </span>
          <a href="/login" className="text-[#2648EA] underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
