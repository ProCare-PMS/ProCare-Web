"use client";

import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import { heldTransactionsColumns } from "./Columns";
import { heldTransactions } from "./Data";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { SlidersVertical } from "lucide-react";

const HeldTransactions = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");


  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold  text-[#202224]">Held Transactions</h2>

        <div className="flex items-center gap-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
            placeholder="Search for Customer"
          />

          <div className="relative">
            <div className="border p-2 cursor-pointer border-[#494A50] rounded-[12px]">
              <SlidersVertical className="text-[#494A50]" />
            </div>
          </div>
        </div>
      </div>

      {/* 
      <DataTable
        columns={heldTransactionsColumns}
        data={heldTransactions  || { results: [], count: 0, links: { next: null, previous: null }, total_pages: 0 }}
        searchValue={searchValues}
      />
      */}
    </div>
  );
};

export default HeldTransactions;
