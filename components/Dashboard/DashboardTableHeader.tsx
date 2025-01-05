"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { DatePicker } from "../CustomDatePicker/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  date: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const DashboardTableHeader = () => {
  const { handleSubmit, control, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Set today's date when the component mounts
  useEffect(() => {
    const today = new Date().toISOString(); // Get today's date in ISO format
    setValue("date", today); // Set the 'date' field in the form
  }, [setValue]);

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-nunito_sans font-bold text-[#202224]">
        Recent Transactions
      </h2>

      <div className="flex items-center justify-between  gap-4">
        {/* <div className="flex items-center justify-between border border-[#D0D5DD] rounded-[6px] gap-3 py-1 px-1.5">
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
        </div> */}

        <DatePicker name="date" placeholder="Select Date" control={control} />

        <Link
          href="/dashboard/recent_transaction"
          className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
        >
          Open
          <ExternalLink className="text-[#2648EA]" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardTableHeader;
