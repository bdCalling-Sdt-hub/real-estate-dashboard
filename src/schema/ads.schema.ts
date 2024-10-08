import { t } from "i18next"; // Assuming you're using i18next for localization
import { z } from "zod";

const insertAds = z.object({
  category: z
    .string({ required_error: t("Category is required") })
    .min(1, { message: t("Category is required") }),
  contactLink: z
    .string({ required_error: t("Url is required") })
    .min(1, { message: t("Url is required") }),
  expireDate: z
    .string({ required_error: t("Duration is required") })
    .min(1, { message: t("Duration is required") }),
});

const editschema = z.object({
  category: z.any(),
  contactLink: z
    .string({ required_error: t("Url is required") })
    .min(1, { message: t("Url is required") }),
  expireDate: z.string().optional(),
});

export const adsValidation = {
  insertAds,
  editschema,
};
