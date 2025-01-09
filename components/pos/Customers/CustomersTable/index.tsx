"use client";

import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import { customersTabColumns } from "./Columns";
import { customersData } from "./Data";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { Plus } from "lucide-react";
import AddCustomerModal from "../AddCustomerModal/AddCustomerModal";

function CustomersTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");

  const [showCustomer, setShowCustomer] = useState(false);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div>
      <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
        <div className="flex justify-end items-center my-3">
          <div className="flex gap-4 self-end">
            <div className="bg-[#0A77FF] my-auto cursor-pointer py-2 px-1">
              <Plus
                onClick={() => setShowCustomer(true)}
                color="white"
                size={25}
              />
            </div>
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
            />

            <span className="iconHolder w-10 h-10">
              <Image
                src="/assets/images/filterFrame.svg"
                alt="filter icon"
                width={100}
                height={100}
              />
            </span>
          </div>
        </div>

        
        {/* Check the columns for the dropdown actions for the table */}
        <DataTable
          columns={customersTabColumns}
          data={customersData}
          searchValue={searchValues}
        />
      </div>

      {showCustomer && (
        <AddCustomerModal closeModal={() => setShowCustomer(false)} />
      )}
    </div>
  );
}

export default CustomersTable;
