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

const PersonalContactForm = () => {
  const { control } = useFormContext(); 

  return (
    <div className="space-y-4 w-full">
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Last Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home rounded-[5px] w-full border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
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
              Number
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
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
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              ID(Ghana Card Requirement)
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home w-full rounded-[5px] border border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalContactForm;
