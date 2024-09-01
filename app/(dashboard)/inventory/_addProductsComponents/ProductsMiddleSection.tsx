"use client";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProductsMiddleSection = () => {
  const { control } = useFormContext();

  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex items-center gap-14">
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Quantity
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                className="bg-white border text-[#858C95] font-normal text-sm font-inter border-[#E5E5E7] rounded"
                placeholder="Enter quantity"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Date Picker */}
      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Date
            </FormLabel>
            <FormControl className="bg-white border-4 rounded">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full flex items-center justify-between border border-[#E5E5E7] font-normal",
                      !date && "text-sm  font-inter font-normal text-[#858C95]"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Select date</span>}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* */}
      <FormField
        control={control}
        name="reOrderLevel"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-sm font-medium font-inter">
              Re-order level
            </FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-full border border-[#E5E5E7] text-[#858C95] font-normal text-sm font-inter">
                  <SelectValue placeholder="Select re-order level " />
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

export default ProductsMiddleSection;
