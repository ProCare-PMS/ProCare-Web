"use client";
import React, { useState } from "react";
import { MoveLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { z } from "zod";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface AddSupplierProps {
  onClose: () => void;
}

const SupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  contact: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const AddSupplier = ({ onClose }: AddSupplierProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    quantity: ""
  });
  const queryClient = useQueryClient();

  const postSupplier = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventories + "suppliers/", value.formData)
        .then((res) => res);
      return res;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const result = SupplierSchema.safeParse(formData);
    
    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    postSupplier.mutate(
      { formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["inventorySupplier"] });
          queryClient.invalidateQueries({ queryKey: ["inventorySupplier"] });
          SwalToaster("Supplier Created Successfully", "success");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          SwalToaster("Supplier could not be created", "error");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-custom w-[70%] md:w-[60%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-2xl font-inter">Add Supplier</h3>
          <CloseOutlinedIcon onClick={onClose} className="cursor-pointer" />
        </div>

        <hr />
        <h3 className="text-[#202224] font-inter font-bold text-base">
          SUPPLIER DETAILS
        </h3>

        <form onSubmit={handleSubmitRequest}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Supplier Name */}
            <div className="grid gap-y-2">
              <label
                htmlFor="name"
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Supplier Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Product Name"
                className={`rounded-[4px] py-3 px-2 border ${
                  errors.name ? 'border-red-500' : 'border-[#E5E5E7]'
                } text-[#858C95] text-sm font-normal`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name}</span>
              )}
            </div>
            {/* Phone Number */}
            <div className="grid gap-y-2">
              <label
                htmlFor="contact"
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Phone Number
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`rounded-[4px] py-3 px-2 border ${
                  errors.contact ? 'border-red-500' : 'border-[#E5E5E7]'
                } text-[#858C95] text-sm font-normal`}
              />
              {errors.contact && (
                <span className="text-red-500 text-xs mt-1">{errors.contact}</span>
              )}
            </div>
            {/* Email */}
            <div className="grid gap-y-2">
              <label
                htmlFor="email"
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={`rounded-[4px] py-3 px-2 border ${
                  errors.email ? 'border-red-500' : 'border-[#E5E5E7]'
                } text-[#858C95] text-sm font-normal`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
              )}
            </div>
          </div>
          {/* Quantity Form */}
          <div className=" hidden">
            <label
              htmlFor="quantity"
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
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