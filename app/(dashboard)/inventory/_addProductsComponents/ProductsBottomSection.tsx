import React, { useContext } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsBottomSection = () => {
  const { control } = useFormContext();
  return (
    <div className="flex items-center gap-14">
      {/* Category */}
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Category
            </FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="border-[#E5E5E7] border text-[#858C95] font-normal text-sm font-inter">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Supplier */}
      <FormField
        control={control}
        name="supplier"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Supplier
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter supplier name"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Brand  */}

      <FormField
        control={control}
        name="brandName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Brand
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter brand name"
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

export default ProductsBottomSection;
