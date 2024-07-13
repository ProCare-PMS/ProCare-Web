"use client";
import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const DashboardTableHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-nunito_sans font-bold text-[#202224]">
        Recent Transactions
      </h2>

      <div className="flex items-center gap-6">
        <span className="text-xs font-inter text-[#2B303466] border border-[#D4D4D4] px-2 py-1 font-medium">
          October
        </span>

        <Link
          href="/"
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
