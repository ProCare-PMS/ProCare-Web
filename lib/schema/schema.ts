//Put all schema here
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Value } from "@radix-ui/react-select";

const userRegistrationSchema = z
  .object({
    first_name: z.string().min(4, { message: "First Name is required" }),
    last_name: z.string().min(4, { message: "First Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone_number: z.string().min(4, { message: "Phone Number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password2: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    ghana_card: z.string().min(4, { message: "Ghana Card is required" }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ["password2"], // Attach error to password2 field
  });

const workingHoursSchema = z.object({
  day: z
    .string()
    .regex(/^(MON|TUE|WED|THU|FRI|SAT|SUN)$/, "Invalid day format"),
  start_time: z.string(),
  end_time: z.string(),
});

const AddUserSchema = z.object({
  full_name: z.string(),
  email: z.string().email("Invalid email format"),
  contact: z.string(),
  address: z.string(),
  //license_number: z.string().min(1, "License number is required"),
  role: z.string(),
  working_hours: z.array(workingHoursSchema),
  //.nonempty("Working hours are required"),
});

const stepOneSchema = z.object({
  full_name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(1, "Contact is required"),
  address: z.string().min(1, "Address is required"),
});

const stepTwoSchema = z.object({
  role: z.string(),
  //permission: z.array(z.string()),
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

const dateSchema = z.object({
  date: z.string(),
});

const AddCustomerSchema = z.object({
  full_name: z.string({
    required_error: "Full name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  phone_number: z.string({
    required_error: "Phone Number is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  gender: z.string({
    required_error: "Gender is required",
  }),
  birth_date: z.string({
    required_error: "Birth Date is required",
  }),
  height: z.string({
    required_error: "Height is required",
  }),
  weight: z.string({
    required_error: "Weight is required",
  }),
  blood_type: z.string({
    required_error: "Blood Type is required",
  }),
  blood_pressure: z.string({
    required_error: "Blood Pressure is required",
  }),
  allergies: z.string({
    required_error: "Allergies is required",
  }),
  chronic_conditions: z.string({
    required_error: "Chronic Conditions is required",
  }),
  med_info_product: z.string({
    required_error: "Medical Information Product is required",
  }),
  dosage: z.string({
    required_error: "Dosage is required",
  }),
  frequency: z.string({
    required_error: "Frequency is required",
  }),
  start_date: z.string({
    required_error: "Start Date is required",
  }),
  end_date: z.string({
    required_error: "End Date is required",
  }),
  additional_info: z.string({
    required_error: "Additional Information name is required",
  }),
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
  dateSchema,
  AddCustomerSchema,
};
