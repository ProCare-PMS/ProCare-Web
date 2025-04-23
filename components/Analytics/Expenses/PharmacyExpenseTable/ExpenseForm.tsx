import React from "react";
import { expenseFormType, expenseSchema } from "../prop";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ExpenseFormValues = z.infer<typeof expenseSchema>;
function ExpenseForm({ isOpen, onClose, title }: expenseFormType) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: ExpenseFormValues) => {
    console.log({ data });
    reset();
    onClose;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[80%] md:w-[80%] max-w-[900px] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-evenly">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter expense name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter expense amount"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Information
              </label>
              <input
                type="text"
                id="additionalInfo"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.additionalInfo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter any additional information"
                {...register("additionalInfo")}
              />
              {errors.additionalInfo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalInfo.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl w-[10rem]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
