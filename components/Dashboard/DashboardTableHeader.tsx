import { useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dateSchema } from "@/lib/schema/schema";
import { DatePicker } from "../CustomDatePicker/DatePicker";

type FormData = z.infer<typeof dateSchema>;

const DashboardTableHeader = () => {
  const { control, setValue } = useForm<FormData>({
    resolver: zodResolver(dateSchema),
  });

  useEffect(() => {
    setValue("date", new Date().toISOString().split("T")[0]); // Set today's date
  }, [setValue]);

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-[#202224]">Recent Transactions</h2>
      <div className="flex items-center gap-4">
        <DatePicker name="date" placeholder="Select Date" control={control} />
        <Link
          href="/dashboard/recent_transaction"
          className="text-[#2648EA] flex items-center gap-1 font-semibold text-sm"
        >
          Open
          <ExternalLink className="text-[#2648EA]" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardTableHeader;
