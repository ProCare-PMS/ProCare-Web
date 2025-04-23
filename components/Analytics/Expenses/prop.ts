import { z } from "zod";

export interface pharmacyExpenseType {
  name: string;
  date: string;
  time: string;
  amount: string;
  aditionalInfo: string;
}

export interface expenseFormType {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

export const expenseSchema = z.object({
  name: z.string(),
  amount: z.string(),
  additionalInfo: z.string(),
});
