"use client";

import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import { heldTransactionsColumns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { SlidersVertical } from "lucide-react";
import { useHeldTransactions } from "@/hooks/customer/useHeldTransactions";

const HeldTransactions = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState<string>("");
  const pageSize = 10;

  const { data, isLoading } = useHeldTransactions({
    search: searchValues,
    ordering,
    page,
    page_size: pageSize,
  });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
    setPage(1); // Reset to first page on search
  };

  // Helper for DataTable pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Helper to adapt API response to DataTable expected shape
  const adaptDataForTable = (data: any) => {
    if (!data) {
      return { results: [], count: 0, links: { next: null, previous: null }, total_pages: 0 };
    }
    return {
      ...data,
      links: { next: data.next, previous: data.previous },
      total_pages: Math.ceil((data.count || 0) / pageSize),
    };
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

      <DataTable
        columns={heldTransactionsColumns}
        data={adaptDataForTable(data)}
        searchValue={searchValues}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </div>
  );
};

export default HeldTransactions;
