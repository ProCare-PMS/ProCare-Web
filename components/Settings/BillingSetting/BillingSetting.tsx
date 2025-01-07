"use client";
import Image from "next/image";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import CashIcon from '@/public/icons/cash-upgrade.svg'
import { PencilLine } from "lucide-react";

const BillingSetting = () => {
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackage(e.target.value);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl px-8 2xl:px-12 pt-12 pb-20 flex flex-col mt-3 gap-6">
      {/* Grid Container for Select and Package Info */}
      <section className="w-full rounded py-4 px-5 flex items-center gap-6 border bg-[#FFFAF2] border-[#D78100]">
        <Image className="" src={CashIcon} alt="Cash Upgrade" width={24} height={24} />
        <div className="flex 2xl:text-lg items-center gap-2">
          <p className="font-medium">Gain access to more features to increase your productivity of RX PMS.</p>
          <a className="font-semibold underline" href="">Upgrade your subscription</a>
        </div>
      </section>
      <section className="w-full grid grid-cols-8 gap-6">
        <div className="col-span-4 2xl:col-span-3 h-fit rounded-2xl flex flex-col gap-1 border px-5 py-4">
          <p className="text-slate-400 text-sm font-medium">Active Subscription</p>
          <div className="flex justify-between py-2">
            <div className="self-center pt-4">
              <p className="text-base 2xl:text-lg font-semibold">Standard Plan</p>
              <p className="text-sm text-blue-600">GHC 5,000 per year &nbsp; <span className="text-slate-400">| &nbsp;20/10/2024</span></p> 
            </div>
            <button className="px-5 2xl:px-8 py-2 2xl:py-3 h-fit  bg-[#2648EA] text-white text-sm rounded hover:bg-blue-600">
              Change plan
            </button>
          </div>
        </div>
        <div className="col-span-3 2xl:col-span-2 rounded-2xl flex flex-col gap-1 border px-5 py-4">
          <p className="text-slate-400 text-sm font-medium">Next Bill</p>
          <div className="flex justify-between py-2">
            <div className="self-center pt-4">
              <p className="2xl:text-lg font-semibold">Standard Plan</p>
              <p className="text-sm text-blue-600">GHC 5,000 per year</p> 
            </div>
            <button className="px-5 2xl:px-8 py-2 2xl:py-3 h-fit font-medium  text-[#2648EA] border border-[#2648EA] bg-white text-sm rounded ">
              Make Payment
            </button>
          </div>
        </div>
        
      </section>

      {/* Upgrade Button */}
      <section className="w-full border rounded-2xl space-y-3 px-4 py-7">
        <p className="2xl:text-lg font-semibold">Billing Information</p>
        <div className="bg-[#F8F9FC] rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="text-sm">
              <th className="text-left p-3">Card Number</th>
              <th className="text-left p-3">Name On Card</th>
              <th className="text-left p-3">Expiry Date</th>
              <th className="text-left p-3">Billing Address</th>
              <th className="text-left p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="py-1.5 px-3 max-2xl:text-sm  mt-3 flex bg-gray-100 rounded items-center gap-2">
                <span className="text-xs font-medium bg-white px-2 py-1 rounded">VISA</span>
                <span>**** **** **** 4761</span>
              </td>
              <td className="py-1.5 px-3 max-2xl:text-sm mt-3">Samuel Fifi Adjei</td>
              <td className="py-1.5 px-3 max-2xl:text-sm mt-3">09/26</td>
              <td className="py-1.5 px-3 max-2xl:text-sm mt-3">Accra Central, Ghana</td>
              <td className="py-1.5 px-3 max-2xl:text-sm mt-3">
                <button className="flex items-center gap-2 text-[#2648EA]">
                  <PencilLine className="w-4 h-4" />
                  <span className="text-sm font-semibold underline underline-offset-4">Edit payment details</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </section>
    </div>
  );
};

export default BillingSetting;
