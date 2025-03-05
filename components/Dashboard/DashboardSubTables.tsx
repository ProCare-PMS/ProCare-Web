import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dashboardSubTables } from "@/type";

interface TableProps {
  title: string;
  data: dashboardSubTables[];
  isLoading?: boolean;
}

const DashboardSubTables = ({ title, data, isLoading }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" }).format(new Date(dateString));

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
    <div className="bg-white p-6 rounded-xl w-[450px] h-[498px] flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium font-nunito_sans text-gray-900">{title}</h2>
        <Link href="/inventory?tab=4" className="text-blue-600 font-inter flex items-center gap-1 font-semibold text-sm">
          Open <ExternalLink className="text-blue-600" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 rounded-lg">
            <TableHead className="w-[180px] font-nunito_sans text-gray-900 font-bold">Product Name</TableHead>
            <TableHead className="text-gray-900 font-nunito_sans font-bold">No. Remaining</TableHead>
            <TableHead className="w-[150px] text-gray-900 font-nunito_sans font-bold">Expiry Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {[32, 16, 24].map((width, i) => (
                  <TableCell key={i}>
                    <div className={`h-4 bg-gray-200 rounded w-${width} animate-pulse`} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data?.length ? (
            getCurrentPageItems()?.map((invoice) => (
              <TableRow key={invoice?.name}>
                <TableCell className="font-semibold text-sm font-inter text-gray-900">{invoice?.name}</TableCell>
                <TableCell className="text-sm font-medium font-nunito_sans text-gray-900">{invoice?.quantity}</TableCell>
                <TableCell className="font-semibold text-sm font-nunito_sans text-gray-900">{formatDate(invoice?.expiry_date)}</TableCell>
              </TableRow>
            ))
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center font-medium text-gray-900">-</TableCell>
                <TableCell className="text-center font-medium text-gray-900">-</TableCell>
                <TableCell className="text-center font-medium text-gray-900">-</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
        <span className="text-sm text-gray-500">
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

export default DashboardSubTables;