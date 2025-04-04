import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { AddCustomerSchema } from "@/lib/schema/schema";
import { z } from "zod";
import { toast } from "react-toastify";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

type CustomerSchema = z.infer<typeof AddCustomerSchema>;

// Fetch inventory products
export const useInventoryProducts = () => {
  return useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () => {
      const response = await customAxios.get(endpoints.inventoryProduct);
      return response.data?.results || [];
    },
  });
};

// Customer mutation hook
export const useAddCustomer = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerData: CustomerSchema) => {
      const result = AddCustomerSchema.safeParse(customerData);

      if (!result.success) {
        const errors = result.error.format();
        const errorMessages = Object.entries(errors)
          .filter(([key]) => key !== "success")
          .map(([key, value]) =>
            Array.isArray(value) && value.length
              ? `${key}: ${value.join(", ")}`
              : ""
          )
          .filter(Boolean);

        throw new Error(errorMessages.join("\n"));
      }

      return customAxios.post(endpoints.posCustomers, customerData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      SwalToaster("Customer added successfully!", "success");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Customer could not be added!"
      );
    },
  });
};
