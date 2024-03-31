import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z.string().trim().min(3).max(50),
    email: z.string().trim().email().min(1).max(100),
    tel: z
      .string()
      .max(100)
      // .refine((val) => val.toString().length > 9, "Field is required")
      .refine((val) => !Number.isNaN(Number(val)), "Invalid input"),
    password: z.string().trim().min(3).max(50),
    confirmPassword: z.string().trim().min(3).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupFormType = z.infer<typeof SignupFormSchema>;

function isUser18Plus(birthdate: Date) {
  const userBirthdate = new Date(birthdate);
  const currentDate = new Date();
  const ageDifference = currentDate.getFullYear() - userBirthdate.getFullYear();
  if (ageDifference > 18) {
    return true;
  } else if (ageDifference === 18) {
    if (currentDate.getMonth() > userBirthdate.getMonth()) {
      return true;
    } else if (currentDate.getMonth() === userBirthdate.getMonth()) {
      if (currentDate.getDate() >= userBirthdate.getDate()) {
        return true;
      }
    }
  }
  return false;
}
