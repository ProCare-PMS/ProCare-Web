import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Columns } from "./Columns";
import { Data } from "./Data";
import ActivityLog from "../ActivityLog";
import FilterDropdown from "../Filter/Filter";

function UserActivityTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [toggleShow, setToggleShow] = useState<number>(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const handleFilterIconClick = () => {
    setShowFilterDropdown((prev) => !prev); // Toggle the filter dropdown
  };

  const closeFilterDropdown = () => {
    setShowFilterDropdown(false);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px]">
      <div className="flex justify-between items-center my-3">
        <div className="bg-gray-100 flex gap-3 p-2 rounded-xl">
          <span
            className={`block cursor-pointer py-1 px-3 rounded-xl ${
              toggleShow === 1
                ? "bg-white border border-gray-300 shadow"
                : "hover:bg-gray-200 text-gray-400"
            }`}
            onClick={() => setToggleShow(1)}
          >
            Transaction History
          </span>
          <span
            className={`block cursor-pointer py-1 px-3 rounded-xl ${
              toggleShow === 2
                ? "bg-white border border-gray-300 shadow"
                : "hover:bg-gray-200 text-gray-400"
            }`}
            onClick={() => setToggleShow(2)}
          >
            Activity Log
          </span>
        </div>

        <div className="flex gap-4">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
            placeholder="Search..."
          />

          <span
            className="iconHolder w-10 h-10"
            onClick={handleFilterIconClick}
          >
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
          {showFilterDropdown && (
            <FilterDropdown onClose={closeFilterDropdown} />
          )}
        </div>
      </div>
      <div>
        {toggleShow === 1 && (
          <DataTable columns={Columns} data={Data} searchValue={searchValues} />
        )}
        {toggleShow === 2 && <ActivityLog />}
      </div>
    </div>
  );
}

export default UserActivityTable;
