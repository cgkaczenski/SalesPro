import { z } from "zod";

export type TLeadForm = z.infer<typeof leadFormSchema>;

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const leadIdSchema = z.string().uuid();

export const leadStageSchema = z.object({
  stage: z.enum(["New", "Nurturing", "Proposal", "Closed Won", "Closed Lost"]),
});

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
    .refine(
      (value) => {
        if (value === undefined || value === null || value === "") return true;
        return phoneRegex.test(value);
      },
      {
        message: "Invalid phone number format",
      }
    ),
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
