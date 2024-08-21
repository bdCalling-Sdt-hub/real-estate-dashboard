import { z } from "zod";

const createLandlord = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  name: z
    .string({ required_error: "Full name is required" })
    .min(1, { message: "Full name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number is required" })
    .regex(/^[0-9]+$/, { message: "Phone number must be numeric" }),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "Password is required" }),
  monthlyIncome: z.enum(
    [
      "Under 800 KD",
      "Between 800 - 1499 KD",
      "Between 1500 - 3000 KD",
      "Over 3000 KD",
    ],
    { required_error: "MonthlyIncome is required" }
  ),
});

export const landlordSchema = {
  createLandlord,
};
