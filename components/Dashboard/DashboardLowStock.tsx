import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dashboardSubTables } from "@/type";

interface TableProps {
  title: string;
  data: dashboardSubTables[];
  isLoading?: boolean;
}

const DashboardLowStockAlert = ({ title, data, isLoading }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      const year = String(date.getFullYear()).slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${month}/${day}/${year}`;
    } catch {
      return "Invalid Date";
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data?.slice(startIndex, startIndex + itemsPerPage);
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-[380px] md:w-[450px] h-[498px] flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-[#202224]">{title}</h2>
        {/* 
        <Link
          href="/page_under_construction"
          className="text-[#2648EA] flex items-center gap-1 font-semibold text-sm"
        >
          Open <ExternalLink className="text-[#2648EA]" />
        </Link>
        */}
      </div>

      <div className="overflow-x-auto">
        <Table className="bg-white rounded-xl">
          <TableHeader className="p-4 border-none">
            <TableRow className="bg-[#F1F4F9] p-1 w-full rounded-lg">
              <TableHead className="w-[180px] font-bold text-[#202224]">
                Product Name
              </TableHead>
              <TableHead className="font-bold text-[#202224]">
                No. Remaining
              </TableHead>
              <TableHead className="w-[150px] font-bold text-[#202224]">
                Expiry Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(3)].map((_, i) => (
                      <TableCell key={i}>
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.length
              ? getCurrentPageItems()?.map((item) => (
                  <TableRow key={item?.name}>
                    <TableCell className="font-semibold text-sm text-[#242525]">
                      {item?.name}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[#202224]">
                      <span className="rounded-3xl text-sm font-normal text-[#D34053] bg-[#D3405314] px-6 py-2">
                        {item?.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-sm text-[#202224]">
                      {formatDate(item?.expiry_date)}
                    </TableCell>
                  </TableRow>
                ))
              : [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(3)].map((_, i) => (
                      <TableCell
                        key={i}
                        className="text-center font-medium text-[#202224]"
                      >
                        -
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-auto flex justify-between items-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-center text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardLowStockAlert;
