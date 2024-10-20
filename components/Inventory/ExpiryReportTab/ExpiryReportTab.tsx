import ExpiryReportStats from "./ExpiryReportStats";
import ExpiryTableHeader from "./ExpiryTableHeader";
import DataTable from "@/components/Tables/data-table";
import { expiryTabColumns } from "@/components/Tables/expiry-tab-columns";
import { expiryReportTable } from "@/type";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Plus, SlidersVertical } from "lucide-react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";

const ExpiryReportTab = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="">
      <ExpiryReportStats />
      <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#202224] font-semibold text-2xl font-inter">
            Expiry Report
          </h2>

          <div className="flex items-center gap-3">
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
              placeholder="Search for purchase"
            />

            <div className="border p-2  cursor-pointer border-main rounded-[12px]">
              <SlidersVertical className="text-main" />
            </div>
          </div>
        </div>
        <DataTable
          columns={expiryTabColumns}
          data={expiryReportTable}
          searchValue={searchValues}
        />
      </div>
    </div>
  );
};

export default ExpiryReportTab;
