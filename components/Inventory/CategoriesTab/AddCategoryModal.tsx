"use client";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

interface AddCategoryModalProps {
  onClose: () => void;
}

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
});

const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  const postCategoryMutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventories + "categories/", value.formData)
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate input data using Zod
    const result = categoryFormSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});

    postCategoryMutation.mutate(
      { formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["inventoryCategories"] });
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
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-[500px]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold font-inter">Add Category</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-2 mt-3">
            <label
              htmlFor="name"
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Category Name
            </label>

            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className={`rounded-[4px] w-full py-3 px-2 border ${
                  errors.name ? 'border-red-500' : 'border-[#E5E5E7]'
                } text-[#858C95] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500`}
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-red-500 font-bold text-xs mt-1 absolute -bottom-5">
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={postCategoryMutation.isPending}
              className={`bg-[#2648EA] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[140px] 
                ${postCategoryMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {postCategoryMutation.isPending ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;