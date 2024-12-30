//Put all schema here
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Value } from "@radix-ui/react-select";

const userRegistrationSchema = z.object({
  first_name: z
    .string({
      required_error: "First Name is required",
    })
    .default(""),
  email: z
    .string({
      required_error: "Email Address is required",
    })
    .default(""),
  last_name: z
    .string({
      required_error: "Last Name is required",
    })
    .default(""),
  phone_number: z
    .string({
      required_error: "Number is required",
    })
    .default(""),
  password: z
    .string({
      required_error: "Password is required",
    })
    .default(""),
  password2: z
    .string({
      required_error: "Password should match",
    })
    .default(""),
  ghana_card: z
    .string({
      required_error: "Region is required",
    })
    .default(""),
});

const workingHoursSchema = z.object({
  day: z
    .string()
    .regex(/^(MON|TUE|WED|THU|FRI|SAT|SUN)$/, "Invalid day format"),
  start_time: z.string(),
  end_time: z.string(),
});

const AddUserSchema = z.object({
  username: z.string(),
  email: z.string().email("Invalid email format"),
  contact: z.string(),
  address: z.string(),
  //license_number: z.string().min(1, "License number is required"),
  role: z.string(),
  working_hours: z.array(workingHoursSchema),
  //.nonempty("Working hours are required"),
});

const stepOneSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(1, "Contact is required"),
  address: z.string().min(1, "Address is required"),
});

const stepTwoSchema = z.object({
  role: z.string(),
  permission: z.array(z.string()),
});

const stepThreeSchema = z.object({
  working_hours: z.array(
    z.object({
      day: z.string(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
    })
  ),
});

const ProfileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  other_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone_number: z.string(),
  pin: z.string(),
  license_number: z.string(),
});

const CompanySchema = z.object({
  facility_name: z.string(),
  ghana_post_address: z.string(),
  facility_email: z.string().email("Invalid email address"),
  facility_number: z.string(),
  license_number: z.string(),
});

const AddProductSchema = z.object({
  name: z.string({
    required_error: "Required",
  }),
  strength: z.string(),
  unit: z.string({
    required_error: "Required",
  }),
  quantity: z.number(),
  expiry_date: z.string({
    required_error: "Required",
  }),
  reorder_level: z.coerce.number({
    required_error: "Required",
  }),
  cost_price: z.string({
    required_error: "Required",
  }),
  markup_percentage: z.string({
    required_error: "Required",
  }),
  selling_price: z.string({
    required_error: "Required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  supplier: z.string({
    required_error: "Supplier is required",
  }),
  brand: z.string(),
});

export {
  userRegistrationSchema,
  AddUserSchema,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  ProfileSchema,
  CompanySchema,
  AddProductSchema,
};
