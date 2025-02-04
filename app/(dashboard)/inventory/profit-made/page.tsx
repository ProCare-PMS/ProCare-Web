"use client"
import BackButton from "@/components/BackButtton/BackButton";
import React, { useEffect } from "react";
import Image from "next/image";
import DataTable from "@/components/Tables/data-table";
import { Data } from "./Data";
import { Column } from "./Column";
import { ProfitMadeGraph } from "./ProfitMadeGraph";
import DashboardTable from "@/components/Tables/DashbaordTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateSchema } from "@/lib/schema/schema";
import { z } from "zod";
import { DatePicker } from "@/components/CustomDatePicker/DatePicker";

type FormData = z.infer<typeof dateSchema>;

function ProfitMade() {

  const { handleSubmit, control, setValue } = useForm<FormData>({
      resolver: zodResolver(dateSchema),
    });

   useEffect(() => {
      const today = new Date().toISOString();
      setValue("date", today);
    }, [setValue]);


  return (
    <div className="mt-[3rem]">
      <div className="container-fluid px-5 py-3">
        <div className="bg-white p-5 rounded-[6px]">
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
                 <DatePicker name="date" placeholder="Select Date" control={control} />
              </div>
            </div>
          </div>
          <ProfitMadeGraph />
        </div>

        {/* table section */}
        <div className="mt-5 p-2 bg-white">
          <div className="flex justify-between items-center my-2">
            <h3 className="font-bold text-lg">Profit List</h3>
            <div className="flex items-center justify-between gap-3 bg-[#FCFDFD] border border-stone-200 p-2 rounded-xl">
              <div>
                <Image
                  src="/assets/images/calenderz.svg"
                  width={20}
                  height={20}
                  alt="arrow-down"
                />
              </div>
              <DatePicker name="date" placeholder="Select Date" control={control} />
            </div>
          </div>
          <DashboardTable data={Data} columns={Column} />
        </div>
      </div>
    </div>
  );
}

export default ProfitMade;
