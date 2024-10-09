import React from "react";
import DashboardTableHeader from "@/components/Dashboard/DashboardTableHeader";
import { dashboardTransactionColumns } from "@/components/Tables/columns";
import DataTable from "@/components/Tables/data-table";
import { dashboardTransactions } from "@/type";
import BackButton from "@/components/BackButtton/BackButton";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

function RecentTransactionsPage() {
  return (
    <div className="mt-[3rem] px-8">
      <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex justify-between items-center gap-3">
            <span className="block">
              <BackButton />
            </span>
            <h2 className="text-2xl font-nunito_sans font-bold text-[#202224]">
              Recent Transactions
            </h2>
          </div>

          <div className="flex items-center justify-between  gap-4">
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

            <Link
              href="/dashboard/recent_transaction"
              className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
            >
              Open
              <ExternalLink className="text-[#2648EA]" />
            </Link>
          </div>
        </div>
        <DataTable
          columns={dashboardTransactionColumns}
          data={dashboardTransactions}
        />
      </div>
    </div>
  );
}

export default RecentTransactionsPage;
