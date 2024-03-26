// eslint-disable-next-line react-refresh/only-export-components
export * from "zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function schema() {
  return z.object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(1, {
        message: "First name is required",
      }),
    lastName: z.string().trim().min(1, {
      message: "Last name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    road: z.string({
      required_error: "Road is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    state: z
      .string()
      .min(1, {
        message: "State is required",
      })
      .max(2, {
        message: "State is required",
      })
      .refine((value) => {
        return /^[A-Z]{2}$/.test(value);
      }),

    zip: z.coerce
      .number()
      .positive({
        message: "Zip is required",
      })
      .default(0),
    code: z.coerce
      .number()
      .positive({
        message: "Code is required",
      })
      .default(0),
  });
}

type functionSchema = ReturnType<typeof schema>;
export type UserFormSchema = z.infer<functionSchema>;

export function useUserForm() {
  return useForm<UserFormSchema>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(schema()),
    mode: "all",
  });
}
