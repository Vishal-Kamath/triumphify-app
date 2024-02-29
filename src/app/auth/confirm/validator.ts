import z from "zod";

export const otpValidator = z.string().length(7);
