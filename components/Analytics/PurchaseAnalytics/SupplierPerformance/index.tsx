// export default SupplierPerformanceTable;
import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import { Columns } from "./Column";
import { Data } from "./Data";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function SupplierPerformanceTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <div>
          <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
            Supplier Performance
          </h2>
          <div>
            <span className="text-slate-300">Total Number of Purchase:</span>{" "}
            <span className="text-sky-500 bold">28,360</span>
          </div>
        </div>

        <div className="flex gap-4">
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

          {/* <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          /> */}

          {/* <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span> */}
          <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
            <span>
              <CloudUploadOutlinedIcon />
            </span>
            <span>Export</span>
          </div>
          <Link
            href={"/empty"}
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
      </div>

      <DataTable columns={Columns} data={Data} searchValue={searchValues} />
    </div>
  );
}

export default SupplierPerformanceTable;
