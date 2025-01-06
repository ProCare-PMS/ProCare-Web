"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { DatePicker } from "../CustomDatePicker/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dateSchema } from "@/lib/schema/schema";

type FormData = z.infer<typeof dateSchema>;

const DashboardTableHeader = () => {
  const { handleSubmit, control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  // Set today's date when the component mounts
  useEffect(() => {
    const today = new Date().toISOString();
    setValue("date", today);
  }, [setValue]);

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-nunito_sans font-bold text-[#202224]">
        Recent Transactions
      </h2>

      <div className="flex items-center justify-between  gap-4">
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
