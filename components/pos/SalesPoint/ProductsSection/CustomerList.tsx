import React from "react";
import { UserPlus, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

// Define types for better type safety
export type Customer = {
  id: string;
  full_name: string;
};

interface CustomerListProps {
  onClose: () => void;
}

const CustomerList = ({ onClose }: CustomerListProps) => {
  const { data: customersData } = useQuery({
    queryKey: ["posCustomers"],
    queryFn: async () =>
      await customAxios.get(endpoints.posCustomers).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const handleCustomerSelect = (customer: Customer) => {
    // Save selected customer to localStorage
    localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    // Close modal after selection
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h3 className="text-base font-semibold text-[#1E1E1E] font-inter">
            Customer List
          </h3>
        </div>
        <hr className="my-4" />
        
        <div className="grid gap-y-4">
          {customersData?.map((customer: Customer) => (
            <div 
              className="flex gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" 
              key={customer.id}
              onClick={() => handleCustomerSelect(customer)}
            >
              <UserPlus className="text-blue-600" />
              <div className="grid">
                <span className="text-base font-normal text-[#1E1E1E] font-inter">
                  {customer?.full_name}
                </span>
                <span className="text-[#757575] text-sm font-normal">
                  {customer?.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;