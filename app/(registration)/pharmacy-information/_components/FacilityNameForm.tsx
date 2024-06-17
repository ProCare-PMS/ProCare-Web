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

const FacilityNameForm = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormField
        control={control}
        name="facilityName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-[#323539] text-sm"> 
              Facility Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="Procare Pharma"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityEmailAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-sm text-[#323539]">
              Facility Email Address
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="procare@gmail.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityCity"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              City
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="Accra"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="facilityLicenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Facility License Number
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder=""
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FacilityNameForm;
