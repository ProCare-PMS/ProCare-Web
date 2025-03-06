"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

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
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageTransitioning, setPageTransitioning] = useState(false);
  
  // Available page sizes
  const pageSizeOptions = [5, 10, 20, 50, 100];

  // Update global filter when search value changes
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  // Reset to page 1 when search value changes
  useEffect(() => {
    if (searchValue !== globalFilter) {
      setCurrentPage(1);
    }
  }, [searchValue, globalFilter]);

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

  // Improved page number generation with better spacing
  const pageNumbers = useMemo(() => {
    const totalPages = data.total_pages || 0;
    const current = currentPage;
    
    if (totalPages <= 0) return [];
    if (totalPages <= 7) {
      // If fewer than 7 pages, show all page numbers
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // More complex pagination with ellipses
    let pages = [1]; // Always include first page
    
    if (current > 3) {
      pages.push(-1); // Add ellipsis
    }
    
    // Add pages around current page
    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(totalPages - 1, current + 1);
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    if (current < totalPages - 2) {
      pages.push(-2); // Add ellipsis
    }
    
    pages.push(totalPages); // Always include last page
    
    return pages;
  }, [currentPage, data.total_pages]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= data.total_pages && page !== currentPage) {
      setPageTransitioning(true);
      setCurrentPage(page);
      
      if (onPageChange) {
        onPageChange(page);
      }
      
      // Simulate network delay if necessary
      setTimeout(() => {
        setPageTransitioning(false);
      }, 300);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    if (onPageSizeChange) {
      setPageTransitioning(true);
      setCurrentPage(1);
      onPageSizeChange(newSize);
      
      // Simulate network delay if necessary
      setTimeout(() => {
        setPageTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="rounded-md w-full">
      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 hover:bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold text-sm text-gray-900 cursor-pointer whitespace-nowrap p-3"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="inline-block w-4">
                          {header.column.getIsSorted() === "desc" ? " 🔽" : header.column.getIsSorted() ? " 🔼" : ""}
                        </span>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading || pageTransitioning ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-96">
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.results?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm text-gray-700 p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && data.total_pages > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between py-4 px-2">
          <div className="flex items-center gap-2">
            <label htmlFor="page-size-select" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="p-1 border rounded-md text-sm bg-white"
              disabled={isLoading || pageTransitioning}
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* First Page Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || isLoading || pageTransitioning}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading || pageTransitioning}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center">
              {pageNumbers.map((pageNum, index) => {
                if (pageNum < 0) {
                  // It's an ellipsis
                  return <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>;
                }
                
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={isLoading || pageTransitioning}
                    className={`px-3 py-1 mx-0.5 border rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.total_pages || isLoading || pageTransitioning}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => handlePageChange(data.total_pages)}
              disabled={currentPage === data.total_pages || isLoading || pageTransitioning}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {data.total_pages} 
            <span className="ml-2 text-gray-500">
              ({data.count} total items)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;