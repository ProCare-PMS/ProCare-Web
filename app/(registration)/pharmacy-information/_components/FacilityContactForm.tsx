import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const FacilityContactForm = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormField
        control={control}
        name="facilityContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Facility Contact
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="0203459389"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Address
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="No 45 Backing Street"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityRegion"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter">
              Region
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="Greater Accra"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityPostalAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm text-[#323539] font-inter">
              Ghana Postal Address
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="GA-183-8184"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FacilityContactForm;
