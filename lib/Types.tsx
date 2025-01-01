export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type WorkingHourField = "start_time" | "end_time";
export type DayAbbreviation =
  | "SUN"
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT";

export interface AddUserTypes {
  username: string;
  email: string;
  address: string;
  contact: string;
  role: string;
  permission: string[];
  working_hours: WorkingHoursTypes[];
}

export interface WorkingHoursTypes {
  day: DayAbbreviation;
  start_time: string;
  end_time: string;
  isWorking: boolean;
}

export interface AttendanceItems {
  id: string;
  employee: string;
  date: string;
  clock_in: string;
  clock_out: string;
  total_hours: string;
  employee_name: string;
  created_at: string;
  modified_at: string;
}
