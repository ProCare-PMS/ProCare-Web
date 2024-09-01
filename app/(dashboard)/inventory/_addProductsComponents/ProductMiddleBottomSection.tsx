import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ProductMiddleBottomSection = () => {
  const { control } = useFormContext();
  return (
    <div className="flex items-center gap-14">
      {/* Cost Price */}
      <FormField
        control={control}
        name="costPrice"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Cost Price (GHS)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                placeholder="Enter cost price"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Mark Up */}
      <FormField
        control={control}
        name="markUp"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Mark Up (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                placeholder="Enter mark up %"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Selling Price */}
      <FormField
        control={control}
        name="sellingPrice"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Selling Price
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                placeholder="Enter selling price"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductMiddleBottomSection;
