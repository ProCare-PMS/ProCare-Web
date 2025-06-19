import DataTable from "@/components/Tables/data-table";
import React, { useState } from "react";
import Image from "next/image";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import DashboardTable from "@/components/Tables/DashbaordTable";
import { Columns } from "./column";
import ExpenseForm from "./ExpenseForm";

function ExpenseIndex() {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-2">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Phamarcy Expense
        </h2>

        <div className="flex gap-4">
          <div>
            <div className="flex gap-4">
              <SearchFieldInput
                value={searchValues}
                onChange={handleSearchValueChange}
              />
            </div>
          </div>
          <div className="w-48">
            <DatePicker
              name="date"
              placeholder="Select Date"
              control={control}
            />
          </div>

          <button
            className="bg-indigo-600 text-white px-6 py-1 rounded-[1rem]"
            onClick={() => setShowModal(true)}
          >
            <span className="mx-1">
              <AddIcon />
            </span>
            Add Expense
          </button>
          {/* <div className="border border-x-purple-100 w-32 flex justify-center items-center rounded-[0.5rem] gap-2">
            <span>
              <CloudUploadOutlinedIcon />
            </span>
            <span>Export</span>
          </div>
          <Link
            href={"/page_under_construction"}
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link> */}
        </div>
      </div>

      <DashboardTable columns={Columns} data={[]} searchValue={searchValues} />

      {!!showModal && (
        <ExpenseForm
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Add Expense"
        />
      )}
    </div>
  );
}

export default ExpenseIndex;
