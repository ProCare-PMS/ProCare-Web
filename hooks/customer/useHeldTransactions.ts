import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { HeldTransactionApiResponse } from "@/type";

export interface HeldTransactionsQueryParams {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export const useHeldTransactions = (params: HeldTransactionsQueryParams = {}) => {
  return useQuery({
    queryKey: ["heldTransactions", params],
    queryFn: async (): Promise<HeldTransactionApiResponse> => {
      const response = await customAxios.get(endpoints.heldTransactions, { params });
      return response.data;
    },
  });
}; 