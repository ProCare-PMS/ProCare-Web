"use client";
import React, { useState } from "react";
import Image from "next/image";
import DataTable from "@/components/Tables/data-table";
import { Data } from "./Data";
import { Column } from "./Column";
import BackButton from "@/components/BackButtton/BackButton";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";

function DailySales() {
  const [searchValues, setSetSearchValues] = useState<string>("");

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };
  return (
    <div className="mt-[3rem]">
      <div className="container-fluid bg-white rounded-xl mx-4 p-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-5">
            <span className="block">
              <BackButton />
            </span>
            <h3 className="font-bold text-lg font-inter">Daily Sales</h3>
          </div>
          {/* 
              <div>
                <div className="flex gap-4">
                <SearchFieldInput value={searchValues} onChange={handleSearchValueChange}/>
    
                  <span className="iconHolder w-10 h-10">
                    <Image src="/assets/images/filterFrame.svg" alt="filter icon" width={100} height={100} />
                  </span>
                </div>
              </div>
              */}
          <div className="flex items-center justify-between border border-[#D0D5DD] rounded-[6px] gap-3 py-1 px-1.5">
            <div>
              <Image
                src="/assets/images/calenderz.svg"
                width={13}
                height={13}
                alt="arrow-down"
              />
            </div>
            <span className="text-[#5C5D65] font-medium text-sm">
              12 October, 2024
            </span>
          </div>
        </div>

        {/* table content */}
        <div className="mt-5">
          <DataTable data={Data} columns={Column} searchValue={searchValues} />
        </div>
        {/* table content end */}
      </div>
    </div>
  );
}

export default DailySales;
