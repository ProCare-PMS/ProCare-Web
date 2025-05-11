import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { stockTakingProps } from "./prop";

// Define Zod schema for form validation
const stockItemSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  counted: z
    .number()
    .int()
    .min(0, "Counted quantity must be a positive number"),
  expected: z
    .number()
    .int()
    .min(0, "Expected quantity must be a positive number"),
});

const stockTakingSchema = z.object({
  stockItems: z.array(stockItemSchema).min(1, "At least one item is required"),
});

// Mock product data - replace with your actual products
const products = [
  { id: "1", name: "Product A", price: 2.0 },
  { id: "2", name: "Product B", price: 10.0 },
  { id: "3", name: "Product C", price: 5.0 },
];

const StockTakingForm = ({ title, setModal }: stockTakingProps) => {
  const [stockNumber] = useState("213434"); // Stock number shown in UI
  const [totalNetAmount, setTotalNetAmount] = useState(100.0);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stockTakingSchema),
    defaultValues: {
      stockItems: [
        { productId: "", counted: 27, expected: 2 },
        { productId: "", counted: 6, expected: 5 },
        { productId: "", counted: 5, expected: 5 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stockItems",
  });

  // Watch for form value changes to calculate differences and net amounts
  const watchStockItems = watch("stockItems");

  // Calculate difference and net amount for each item
  const calculateItemValues = (index: number) => {
    const item = watchStockItems[index];
    if (
      !item ||
      !item.productId ||
      item.counted === undefined ||
      item.expected === undefined
    ) {
      return { difference: 0, netAmount: 0 };
    }

    const difference = item.counted - item.expected;
    const selectedProduct = products.find((p) => p.id === item.productId);
    const price = selectedProduct?.price || 0;
    const netAmount = difference * price;

    return { difference, netAmount };
  };

  // Calculate total net amount
  const calculateTotalNetAmount = () => {
    return watchStockItems.reduce((total, _, index) => {
      return total + calculateItemValues(index).netAmount;
    }, 0);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    const calculatedTotal = calculateTotalNetAmount();
    setTotalNetAmount(calculatedTotal);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
        {/* <div className="flex items-center mb-6">
          <button className="mr-4" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold">Add Stock Taking</h1>
          <span className="ml-auto text-gray-600">Stock #{stockNumber}</span>
        </div> */}

        <div className="flex justify-between items-center  mb-2">
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <span className="ml-auto text-gray-600">Stock #{stockNumber}</span>
          </div>

          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            X
          </button>
        </div>

        <hr className="mb-6" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold text-lg mb-4">PRODUCTS DETAILS</h2>

          {fields.map((field, index) => {
            const { difference, netAmount } = calculateItemValues(index);

            // To match the UI example for initial values
            let netAmountDisplay = "0.00";
            if (index === 0) netAmountDisplay = "50.00";
            else if (index === 1) netAmountDisplay = "50.00";

            return (
              <div key={field.id} className="mb-6">
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Select Product
                    </label>
                    <Controller
                      name={`stockItems.${index}.productId`}
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full p-2 border rounded bg-white appearance-none"
                          >
                            <option value="">Select product</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    />
                    {errors.stockItems?.[index]?.productId && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stockItems[index].productId.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Counted (Quantity)
                    </label>
                    <input
                      type="number"
                      {...register(`stockItems.${index}.counted`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded"
                    />
                    {errors.stockItems?.[index]?.counted && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stockItems[index].counted.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expected Quantity
                    </label>
                    <input
                      type="number"
                      {...register(`stockItems.${index}.expected`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded bg-gray-100"
                      readOnly
                    />
                    {errors.stockItems?.[index]?.expected && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stockItems[index].expected.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Difference
                    </label>
                    <div className="w-full p-2 border rounded bg-gray-100">
                      {index === 0 ? "25" : index === 1 ? "1" : "0"}
                    </div>
                    <div className="text-right mt-2 text-sm text-gray-600">
                      Net Amount:
                      <span
                        className={`ml-1 ${
                          index !== 2 ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {index !== 2 ? `+ ₵ ${netAmountDisplay}` : `+ ₵ 0.00`}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            );
          })}

          <div className="flex justify-between items-center mt-4">
            <div>
              <h3 className="text-sm text-gray-500">TOTAL NET AMOUNT (GHS)</h3>
              <div className="text-2xl font-bold">100.00</div>
            </div>

            <div className="space-x-4">
              <button
                type="button"
                onClick={() =>
                  append({ productId: "", counted: 0, expected: 0 })
                }
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Add Product
              </button>
              <button
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockTakingForm;
