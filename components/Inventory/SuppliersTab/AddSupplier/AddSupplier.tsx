import React from "react";
import { MoveLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { z } from "zod";

interface AddSupplierProps {
  onClose: () => void;
}

const SupplierSchema = z.object({
  name: z.string(),
  contact: z.string(),
  email: z.string(),
});

const AddSupplier = ({ onClose }: AddSupplierProps) => {
  //Sending to the api.
  const postSupplier = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventories + "suppliers/", value)
        .then((res) => res);
      return res;
    },
  });

  const handleSubmitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //postSupplier.mutate(values);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-custom w-[60%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
        <div className="flex items-center gap-4 mb-4">
          <MoveLeft onClick={onClose} className="cursor-pointer" />
          <h3 className="font-bold text-2xl font-inter">Add Supplier</h3>
        </div>
        <hr />
        <h3 className="text-[#202224] font-inter font-bold text-base">
          SUPPLIER DETAILS
        </h3>

        <form onSubmit={handleSubmitRequest}>
          <div className="grid grid-cols-3 gap-4">
            {/* Supplier Name */}
            <div className="grid gap-y-2">
              <label
                htmlFor=""
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              />
            </div>
            {/* Phone Number */}
            <div className="grid gap-y-2">
              <label
                htmlFor=""
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Phone Number
              </label>
              <input
                id="contact"
                name="contact"
                type="number"
                placeholder="Enter phone number"
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              />
            </div>
            {/* Email */}
            <div className="grid gap-y-2">
              <label
                htmlFor=""
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              />
            </div>
          </div>
          {/* Quantity Form */}
          <div className="grid gap-y-2 mt-6">
            <label
              htmlFor=""
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="rounded-[4px] w-[33%] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
            />
          </div>

          <div className="mt-8 flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#2648EA] rounded-[4px] py-2 px-8 text-white font-inter font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
