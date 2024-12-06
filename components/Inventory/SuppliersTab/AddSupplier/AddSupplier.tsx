"use client";
import React, { useState } from "react";
import { MoveLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { z } from "zod";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface AddSupplierProps {
  onClose: () => void;
}

const SupplierSchema = z.object({
  name: z.string({
    required_error: "Required",
  }),
  contact: z.string({
    required_error: "Required",
  }),
  email: z.string({
    required_error: "Required",
  }),
});

const AddSupplier = ({ onClose }: AddSupplierProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  //Sending to the api.
  const postSupplier = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventories + "suppliers/", value.formData)
        .then((res) => res);
      return res;
    },
  });

  const handleSubmitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //postSupplier.mutate(values);

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      email: formData.get("email") as string,
    };
    const result = SupplierSchema.safeParse(data);

    if (result?.data?.name === "") {
      setErrors({ name: "Required" });
      return;
    }

    postSupplier.mutate(
      { formData: data },
      {
        onSuccess: () => {
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
      <div className="bg-white shadow-custom w-[60%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-2xl font-inter">Add Supplier</h3>
          <CloseOutlinedIcon onClick={onClose} className="cursor-pointer" />
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
                htmlFor="name"
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Supplier Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Product Name"
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              />
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
                placeholder="Enter phone number"
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              />
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
