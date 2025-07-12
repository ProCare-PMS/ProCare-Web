import { useQuery } from "@tanstack/react-query";
//import { ProductsType } from "@/types/products";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ProductsType } from "@/types/product";

const fetchAllProducts = async (endpoint: string): Promise<ProductsType[]> => {
  let allResults: ProductsType[] = [];
  let nextUrl = endpoint;

  while (nextUrl) {
    const response = await customAxios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.links.next;

    if (nextUrl?.includes("https://")) {
      const url = new URL(nextUrl);
      let pathname = url.pathname;
      
      if (pathname.includes("/api/")) {
        pathname = pathname.replace("/api/", "");
      }
      
      nextUrl = pathname + url.search;
    }
  }

  return allResults;
};

export const useInventoryProducts = () => {
  return useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: () => fetchAllProducts(endpoints.inventoryProduct),
    staleTime: 5 * 60 * 1000,
  });
};

export const useInventoryProductsStock = () => {
  return useQuery({
    queryKey: ["inventoryProductsStock"],
    queryFn: () => fetchAllProducts(`${endpoints.inventories}stocks-taken/`),
    staleTime: 5 * 60 * 1000,
  });
};