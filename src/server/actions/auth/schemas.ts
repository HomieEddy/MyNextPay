import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(200, "That password is too long.");

export const createPasswordSchema = z
  .object({ password: passwordSchema, confirm: z.string() })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match.",
    path: ["confirm"],
  });

export const logInSchema = z.object({
  password: z.string().min(1, "Enter your password."),
});
