import React from "react";
import DataTable from "@/components/Tables/data-table";
import { productsTabColumns } from "@/components/Tables/products-tab-columns";
import { ProductsType } from "@/types/product";
import { PaginationState } from "@/types/pagination";
//import { ProductsType, PaginationState } from "@/types/products";

interface ProductsTableProps {
  data: ProductsType[];
  searchValue: string;
  isLoading: boolean;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  data,
  searchValue,
  isLoading,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  // Calculate paginated data
  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pagination.pageSize);

  return (
    <DataTable
      columns={productsTabColumns}
      data={paginatedData}
      searchValue={searchValue}
      isLoading={isLoading}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pagination.pageSize}
    />
  );
};

export default ProductsTable;