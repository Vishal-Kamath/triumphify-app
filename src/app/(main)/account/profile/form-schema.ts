import { z } from "zod";

export const accountProfileFormSchema = z.object({
  username: z.string().trim().min(3).max(50),
  email: z.string().trim().email().min(1).max(100),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date().refine((dob) => {
    return isUser18Plus(dob);
  }, "You must be 18 years or older"),
});
export type AccountProfileFormType = z.infer<typeof accountProfileFormSchema>;

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
