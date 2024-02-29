import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1).max(100),
  password: z.string().min(3).max(50),
});
export type LoginFormType = z.infer<typeof loginFormSchema>;
