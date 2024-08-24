import { z } from "zod";
const insertAds = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category is required" }),
  contactLink: z
    .string({ required_error: "Url is required" })
    .min(1, { message: "Url is required" }),
});
const editschema = z.object({
  category: z.any(),

  contactLink: z
    .string({ required_error: "Url is required" })
    .min(1, { message: "Url is required" }),
});

export const adsVelidation = {
  insertAds,
  editschema,
};
