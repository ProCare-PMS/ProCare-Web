"use client"
import React, { useState } from "react";
import Image from 'next/image'
import DataTable from "@/components/Tables/data-table";
import { Data } from "./Data";
import { Column } from "./Column";
import { useRouter } from 'next/navigation' 
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";

function Page() {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSetSearchValues(event.target.value);
  };
    const router = useRouter()
  return (
    <>
      <div className="container-fluid bg-white rounded-xl mx-4 p-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-5">
            <span className="block">
                <button type="button" className="bg-none border-none outline-0 flex justify-between items-center" onClick={() => router.back()}>
                    <Image src="/assets/images/backArrow.svg" alt="back arrow" width={20} height={10}/>
                </button>
            </span>
             <h3 className="font-bold text-lg">Low Stock List</h3>
          </div>
          <div>
            <div className="flex gap-4">
                <SearchFieldInput value={searchValues} onChange={handleSearchValueChange}/>

              <span className="iconHolder w-10 h-10">
                <Image src="/assets/images/filterFrame.svg" alt="filter icon" width={100} height={100} />
              </span>
            </div>
          </div>
        </div>

        {/* table content */}
            <div className="mt-5">
              <DataTable
              data={Data}
              columns={Column}
              />
            </div>
        {/* table content end */}
      </div>
    </>
  );
}

export default Page;
