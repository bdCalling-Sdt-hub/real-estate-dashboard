import { t } from "i18next"; // Assuming you're using i18next for localization
import { z } from "zod";

const createLandlord = z.object({
  username: z
    .string({ required_error: t("Username is required") })
    .min(1, { message: t("Username is required") }),
  name: z
    .string({ required_error: t("Full name is required") })
    .min(1, { message: t("Full name is required") }),
  email: z
    .string({ required_error: t("Email is required") })
    .email({ message: t("Invalid email address") }),
  phoneNumber: z
    .string({ required_error: t("Phone number is required") })
    .min(1, { message: t("Phone number is required") })
    .regex(/^[0-9]+$/, { message: t("Phone number must be numeric") }),
  gender: z.enum(["Male", "Female"], {
    required_error: t("Gender is required"),
  }),
  password: z
    .string({ required_error: t("Password is required") })
    .min(6, { message: t("Password must be at least 6 characters long") }),
  monthlyIncome: z.enum(
    [
      t("Under 800 KD"),
      t("Between 800 - 1499 KD"),
      t("Between 1500 - 3000 KD"),
      t("Over 3000 KD"),
    ],
    { required_error: t("Monthly income is required") }
  ),
});

export const landlordSchema = {
  createLandlord,
};
