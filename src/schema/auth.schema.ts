import { t } from "i18next"; // Assuming you're using i18next for localization
import * as z from "zod";

const loginValidationSchema = z.object({
  email: z.string().min(1, { message: t("Email is required") }),
  password: z
    .string()
    .min(6, { message: t("Password must be at least 6 characters long") }),
});

const fogotpasswordSchema = z.object({
  email: z.string({ required_error: t("Email is Required") }),
});

const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: t("Old Password is required") }),
  newPassword: z
    .string({ required_error: t("New Password is required") })
    .min(6, { message: t("New Password must be at least 6 characters long") }),

  confirmPassword: z
    .string({ required_error: t("Confirm Password is required") })
    .min(6, {
      message: t("Confirm Password must be at least 6 characters long"),
    }),
});

const resetPasswordSchema = z.object({
  newPassword: z
    .string({ required_error: t("New Password is required") })
    .min(6, { message: t("New Password must be at least 6 characters long") }),

  confirmPassword: z
    .string({ required_error: t("Confirm Password is required") })
    .min(6, {
      message: t("Confirm Password must be at least 6 characters long"),
    }),
});

const createsubadminSchema = z.object({
  name: z.string({ required_error: t("Worker name is Required") }),
  email: z.string({ required_error: t("Worker email is Required") }),
  designation: z.string({
    required_error: t("Worker designation is Required"),
  }),
  branch: z.string().optional(),
  password: z.string({ required_error: t("Worker password is Required") }),
});

const editSubAdminSchema = z.object({
  name: z
    .string({ required_error: t("Worker name is Required") })
    .min(1, { message: t("Worker name is Required") }),
  designation: z
    .string({ required_error: t("Worker designation is Required") })
    .min(1, { message: t("Worker designation is Required") }),
});

export const authValidationSchema = {
  loginValidationSchema,
  fogotpasswordSchema,
  changePasswordSchema,
  resetPasswordSchema,
  createsubadminSchema,
  editSubAdminSchema,
};
