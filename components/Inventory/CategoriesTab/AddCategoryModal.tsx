"use client";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { z } from "zod";

interface AddCategoryModalProps {
  onClose: () => void;
}

const categoryFormSchema = z.object({
  name: z.string({
    required_error: "Required",
  }),
});

const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const postCategoryMutation = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventoryCategory, value.formData)
        .then((res) => res);
      return res;
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name") as string,
    };

    // Validate input data using Zod
    const result = categoryFormSchema.safeParse(data);

    if (result?.data?.name === "") {
      setErrors({ name: "Required" });
      return;
    }

    setErrors({});

    postCategoryMutation.mutate(
      { formData: data },
      {
        onSuccess: () => {
          SwalToaster("Category Created Successfully", "success");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          SwalToaster("Category could not be created", "error");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold  font-inter">Add Category</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-2 mt-3">
            <div className="flex justify-between">
              <label
                htmlFor="name"
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Category Name
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter category name"
              className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-[140px]"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
