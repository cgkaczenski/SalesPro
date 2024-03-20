import { z } from "zod";

export type TLeadForm = z.infer<typeof leadFormSchema>;

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100),
  email: z
    .string()
    .trim()
    .email()
    .min(1, { message: "Email is required" })
    .max(100),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .transform((value) => {
      if (value === undefined || value === null || value === "")
        return undefined;
      const parsed = z.string().regex(phoneRegex).safeParse(value);
      return parsed.success ? parsed.data : undefined;
    }),
  amount: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Amount is required" })
    .max(100000000),
  title: z.string().trim().min(1, { message: "Title is required" }).max(100),
  company: z
    .string()
    .trim()
    .min(1, { message: "Company is required" })
    .max(100),
});
