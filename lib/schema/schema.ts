//Put all schema here
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export { userRegistrationSchema };
