"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BackendPaginationData {
  count: number;
  links: { next: string | null; previous: string | null };
  results: any[];
  total_pages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: BackendPaginationData;
  searchValue?: string;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");

  // Reset current page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Update global filter when search value changes
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < data.total_pages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const totalPages = data.total_pages;
    const currentPageNum = currentPage;
    const pageNumbers = [];

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More complex pagination logic
      if (currentPageNum <= 3) {
        // First few pages
        pageNumbers.push(1, 2, 3, 4, totalPages);
      } else if (currentPageNum >= totalPages - 2) {
        // Last few pages
        pageNumbers.push(1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle pages
        pageNumbers.push(1, currentPageNum - 1, currentPageNum, currentPageNum + 1, totalPages);
      }
    }

    return [...new Set(pageNumbers)].sort((a, b) => a - b);
  };

  return (
    <div className="rounded-md w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 hover:bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold text-sm text-gray-900 cursor-pointer whitespace-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "desc" ? " 🔽" : header.column.getIsSorted() ? " 🔼" : ""}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={`loading-${index}`} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <TableCell key={`loading-cell-${index}-${colIndex}`}>
                      <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data?.results?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && (
        <div className="flex flex-wrap items-center justify-between sm:justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 py-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              className="border border-gray-300 py-2 px-4 rounded-md text-gray-700 font-medium text-sm disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page number buttons */}
            {generatePageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  onPageChange?.(pageNum);
                }}
                className={`border border-gray-300 py-2 px-4 rounded-md text-sm 
                  ${currentPage === pageNum 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
              >
                {pageNum}
              </button>
            ))}

            <button
              className="border border-gray-300 py-2 px-4 rounded-md text-gray-700 font-medium text-sm disabled:opacity-50"
              onClick={handleNextPage}
              disabled={currentPage === data.total_pages}
            >
              Next
            </button>
          </div>
          <p className="text-gray-700 text-sm w-full sm:w-auto text-center sm:text-right">
            {data.total_pages > 0 ? `Page ${currentPage} of ${data.total_pages}` : "No results"}
          </p>
        </div>
      )}
    </div>
  );
}

export default DataTable;