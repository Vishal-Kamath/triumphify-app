import { z } from "zod";

export const accountProfileFormSchema = z.object({
  username: z.string().trim().min(3).max(50),
  email: z.string().trim().email().min(1).max(100),
  tel: z
    .string()
    .max(100)
    // .refine((val) => val.toString().length > 9, "Incorrect phone number")
    .refine((val) => !Number.isNaN(Number(val)), "Invalid input"),
  gender: z.enum(["Male", "Female", "Other"]).nullable(),
  dateOfBirth: z
    .date()
    .refine((dob) => {
      return isUser18Plus(dob);
    }, "You must be 18 years or older")
    .nullish(),
});
export type AccountProfileFormType = z.infer<
  typeof accountProfileFormSchema
> & { tel: E164Number };

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
