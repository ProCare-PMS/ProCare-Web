import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { WorkingHoursTypes } from "./Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "",
];

export const initialWorkingHours = daysOfWeek.map((day) => ({
  day: day.toUpperCase().slice(0, 3),
  start_time: "",
  end_time: "",
  isWorking: false,
}));

export const defaultWorkingHours: WorkingHoursTypes[] = [
  { day: "SUN", start_time: "", end_time: "", isWorking: false },
  { day: "MON", start_time: "", end_time: "", isWorking: false },
  { day: "TUE", start_time: "", end_time: "", isWorking: false },
  { day: "WED", start_time: "", end_time: "", isWorking: false },
  { day: "THU", start_time: "", end_time: "", isWorking: false },
  { day: "FRI", start_time: "", end_time: "", isWorking: false },
  { day: "SAT", start_time: "", end_time: "", isWorking: false },
];
