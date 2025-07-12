import { FilterState } from "@/types/filter";
import { ProductsType } from "@/types/product";
import { SortOption } from "@/types/sortOption";
import { useMemo } from "react";

export const useProductFilters = (
  products: ProductsType[] | undefined,
  searchValue: string,
  filters: FilterState,
  sortOption: SortOption
) => {
  return useMemo(() => {
    if (!products) return [];

    let results = [...products];

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.slug.toLowerCase().includes(searchLower) ||
          (product.brand && product.brand.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "unit":
          results = results.filter((product) => product.unit === value);
          break;
        case "category":
          results = results.filter((product) => product.category === value);
          break;
        case "reorderLevel":
          results = results.filter(
            (product) => product.reorder_level === parseInt(value)
          );
          break;
        case "expiryDate":
          results = results.filter((product) => {
            const productDate = new Date(product.expiry_date).toISOString().split("T")[0];
            const filterDate = new Date(value).toISOString().split("T")[0];
            return productDate === filterDate;
          });
          break;
        case "status":
          results = results.filter((product) => product.product_status === value);
          break;
      }
    });

    // Apply sorting
    switch (sortOption) {
      case "alphabetical":
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return results.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return results.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return results;
    }
  }, [products, searchValue, filters, sortOption]);
};