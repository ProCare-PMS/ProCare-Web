import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardSubTables } from "@/type";

interface TableProps {
  title: string;
  data: dashboardSubTables[];
  isLoading?: boolean;
}

export function DashboardSubTables({ title, data, isLoading }: TableProps) {

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }


  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium font-nunito_sans text-[#202224]">
            {title}
          </h2>
          <Link
            href="/inventory?tab=4"
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Open
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
        <Table className="bg-white rounded-xl">
          <TableHeader className="p-4 border-none">
            <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
              <TableHead className="w-[180px] font-nunito_sans text-[#202224] font-bold">
                Product Name
              </TableHead>
              <TableHead className="text-[#202224] font-nunito_sans font-bold">
                No. Remaining
              </TableHead>
              <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">
                Expiry Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl w-[450px] h-[428px] flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium font-nunito_sans text-[#202224]">
          {title}
        </h2>

        <Link
          href="/inventory?tab=4"
          className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
        >
          Open
          <ExternalLink className="text-[#2648EA]" />
        </Link>
      </div>
      <Table className="bg-white rounded-xl">
        <TableHeader className="p-4 border-none">
          <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
            <TableHead className="w-[180px] font-nunito_sans text-[#202224] font-bold">
              Product Name
            </TableHead>
            <TableHead className="text-[#202224] font-nunito_sans font-bold">
              No. Remaining
            </TableHead>
            <TableHead className="w-[150px] text-[#202224] font-nunito_sans font-bold">
              Expiry Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data.map((invoice) => (
              <TableRow key={invoice.name}>
                <TableCell className="font-semibold text-sm font-inter text-[#242525]">
                  {invoice.name}
                </TableCell>
                <TableCell className="text-sm font-medium font-nunito_sans text-[#202224]">
                  {invoice.quantity}
                </TableCell>
                <TableCell className="font-semibold text-sm font-nunito_sans text-[#202224]">
                {formatDate(invoice.expiry_date)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                  <TableCell className="text-center font-medium text-[#202224]">
                    -
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}