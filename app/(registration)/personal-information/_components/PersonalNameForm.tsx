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

const PersonalNameForm = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              First Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="John"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Email Address
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-home border rounded-[5px] border-[#E5E5E7] text-[#323539] font-medium text-sm font-inter"
                placeholder="Doe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Password
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
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-sm font-inter text-[#323539]">
              Confirm Password
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

export default PersonalNameForm;
