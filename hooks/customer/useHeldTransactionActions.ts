import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

export interface HeldTransactionData {
  discount_type: string;
  discount_value: number;
  payment_methods: string[];
  sale_items: Array<{
    product_id: string;
    product: string;
    quantity: number;
    total_item_price: number;
  }>;
  amount: string;
  employee: {
    full_name: string;
    email: string;
    contact: string;
    address: string;
    license_number: string;
    is_manager: boolean;
    is_pharmacist: boolean;
    is_mca: boolean;
  };
  status: "on_hold" | "completed";
}

export interface ResumeTransactionData {
  transactionId: string;
  updatedItems?: Array<{
    product_id: string;
    product: string;
    quantity: number;
    total_item_price: number;
  }>;
}

export const useCreateHeldTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HeldTransactionData) => {
      const response = await customAxios.post(endpoints.heldTransactions, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch held transactions data
      queryClient.invalidateQueries({ queryKey: ["heldTransactions"] });
    },
  });
};

export const useCompleteHeldTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResumeTransactionData) => {
      const response = await customAxios.patch(
        `${endpoints.heldTransactions}${data.transactionId}/`,
        {
          status: "completed",
          sale_items: data.updatedItems,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate held transactions and sales data
      queryClient.invalidateQueries({ queryKey: ["heldTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["recentTransactionsData"] });
    },
  });
};

export const useDeleteHeldTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string) => {
      const response = await customAxios.delete(
        `${endpoints.heldTransactions}${transactionId}/`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heldTransactions"] });
    },
  });
};

export const useGetHeldTransactionDetails = () => {
  return useMutation({
    mutationFn: async (transactionId: string) => {
      const response = await customAxios.get(
        `${endpoints.heldTransactions}${transactionId}/`
      );
      return response.data;
    },
  });
};
