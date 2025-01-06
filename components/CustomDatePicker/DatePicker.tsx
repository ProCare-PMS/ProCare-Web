"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useController, Control } from "react-hook-form";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  type?: "single" | "multiple" | "range";
  className?: string;
}

export function DatePicker({
  name,
  control,
  placeholder = "Pick a date",
  type = "single",
  className,
}: DatePickerProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [popoverOpen, setPopoverOpen] = React.useState(false);

  // const handleDateSelect = (selection: Date | DateRange | undefined) => {
  //   if (selection instanceof Date && type === "single") {
  //     // Single date selected
  //     onChange(selection.toISOString());
  //   } else if (selection && "from" in selection && selection.from) {
  //     // Range selected - use the `from` date (adjust as needed)
  //     onChange(selection.from.toISOString());
  //   } else {
  //     // No valid date selected
  //     onChange(undefined);
  //   }
  //   setPopoverOpen(false);
  // };

  const handleDateSelect = (
    selection: Date | Date[] | DateRange | undefined
  ) => {
    if (type === "single" && selection instanceof Date) {
      // Single date
      onChange(selection.toISOString());
    } else if (type === "multiple" && Array.isArray(selection)) {
      // Multiple dates
      const isoDates = selection.map((date) => date.toISOString());
      onChange(isoDates);
    } else if (
      type === "range" &&
      selection &&
      "from" in selection &&
      selection.from
    ) {
      // Date range
      const fromIso = selection.from.toISOString();
      const toIso = selection.to ? selection.to.toISOString() : undefined;
      onChange({ from: fromIso, to: toIso });
    } else {
      onChange(undefined);
    }
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal rounded-[0.2rem] text-sm border-gray-400",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(new Date(value), "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="flex justify-start h-4 w-4 ms-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={handleDateSelect}
          initialFocus
          className={className}
        />
      </PopoverContent>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </Popover>
  );
}
