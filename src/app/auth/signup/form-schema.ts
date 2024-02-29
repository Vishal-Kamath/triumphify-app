import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z.string().trim().min(3).max(50),
    email: z.string().trim().email().min(1).max(100),
    gender: z.enum(["Male", "Female", "Other"]),
    dateOfBirth: z.date().refine((dob) => {
      return isUser18Plus(dob);
    }, "You must be 18 years or older"),
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
