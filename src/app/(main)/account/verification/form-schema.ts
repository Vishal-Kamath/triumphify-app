import { z } from "zod";

export const AccountEmailVerificationSchema = z.object({
  code: z.string().min(7).max(7),
});
export type AccountEmailVerificationType = z.infer<
  typeof AccountEmailVerificationSchema
>;
