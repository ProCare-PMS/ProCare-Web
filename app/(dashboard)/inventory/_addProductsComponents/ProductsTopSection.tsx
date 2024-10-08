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

const ProductsTopSection = () => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center gap-14">
      <FormField
        control={control}
        name="productName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Product Name
            </FormLabel>
            <FormControl>
              <Input
              type="text"
                {...field}
                placeholder="Enter product name"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="productName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Product Strength
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Enter product strength"
                className="bg-white border border-[#E5E5E7] rounded text-[#858C95] font-normal text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="unit"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Unit
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
    </div>
  );
};

export default ProductsTopSection;
