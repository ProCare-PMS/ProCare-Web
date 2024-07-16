import BackButton from "@/components/BackButtton/BackButton";
import React from "react";
import Image from "next/image";
import DataTable from "@/components/Tables/data-table";
import { Data } from "./Data";
import { Column } from "./Column";

function ProfitMade() {
  return (
    <div className="container-fluid px-5 py-3">
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-between items-center gap-5">
          <span className="block">
            <BackButton />
          </span>
          <h3 className="font-bold text-lg">Profit Made</h3>
        </div>
        <div>
          <div className="flex items-center justify-between gap-4 bg-[#FCFDFD] border border-stone-200 p-2 rounded-xl">
            <div>
              <Image
                src="/assets/images/calenderz.svg"
                width={20}
                height={20}
                alt="arrow-down"
              />
            </div>
            <span>12 Octorber, 2024</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[25vh] bg-sky-600">
        <div className="flex flex-col justify-center items-center h-full w-full text-white">
          <h1 className="text-4xl font-bold">Profit Made Graph</h1>
        </div>
      </div>

      {/* table section */}
      <div className="mt-5 p-2 bg-white">
        <div className="flex justify-between items-center my-2">
            <h3 className="font-bold text-lg">Profit List</h3>
            <div className="flex items-center justify-between gap-4 bg-[#FCFDFD] border border-stone-200 p-2 rounded-xl">
            <div>
              <Image
                src="/assets/images/calenderz.svg"
                width={20}
                height={20}
                alt="arrow-down"
              />
            </div>
            <span>12 Octorber, 2024</span>
          </div>
        </div>
        <DataTable data={Data} columns={Column} />
      </div>
    </div>
  );
}

export default ProfitMade;
