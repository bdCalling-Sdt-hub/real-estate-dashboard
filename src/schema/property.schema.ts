import { t } from "i18next"; // Assuming you're using i18next for localization
import { z } from "zod";

const propertyInitalScema = z.object({
  host: z
    .string({ required_error: t("Landlord name is required") })
    .min(1, t("Landlord name is required")),
  category: z
    .string({ required_error: t("Category is required") })
    .min(1, t("Category is required")),
  features: z.array(z.string()).min(1, t("At least one feature is required")),
  propertyName: z
    .string({ required_error: t("Property name is required") })
    .min(1, t("Property name is required")),
  squareFeet: z
    .string({ required_error: t("Square feet is required") })
    .min(1, t("Square feet is required")),
  bedrooms: z
    .string({ required_error: t("Bedrooms is required") })
    .min(1, { message: t("Bedrooms is required") })
    .regex(/^[0-9]+$/, { message: t("Bedrooms must be numeric") }),
  bathrooms: z
    .string({ required_error: t("Bathrooms is required") })
    .min(1, { message: t("Bathrooms is required") })
    .regex(/^[0-9]+$/, { message: t("Bathrooms must be numeric") }),
  residenceType: z.enum(["Condominium", "Private"], {
    required_error: t("Residence type is required"),
  }),
  rentType: z.enum(["Short Term", "Long Term"], {
    required_error: t("Rent type is required"),
  }),
  paymentType: z.enum(["Per Night", "Per Month"], {
    required_error: t("Payment type is required"),
  }),
  deposit: z
    .string({ required_error: t("Deposit amount is required") })
    .min(1, { message: t("Deposit amount is required") })
    .regex(/^[0-9]+$/, { message: t("Deposit amount must be numeric") }),
  rent: z
    .string({ required_error: t("Rental price is required") })
    .min(1, { message: t("Rental price is required") })
    .regex(/^[0-9]+$/, { message: t("Rental price must be numeric") }),
});

const proeprtyAddresschema = z.object({
  propertyAbout: z
    .string({
      required_error: t("Description is required"),
    })
    .min(1, t("Description is required")),
  address: z.object({
    governorate: z
      .string({
        required_error: t("Governorate is required"),
      })
      .min(1, t("Governorate is required")),
    area: z
      .string({
        required_error: t("Area is required"),
      })
      .min(1, t("Area is required")),
    house: z
      .string({
        required_error: t("House number is required"),
      })
      .min(1, t("House number is required")),
    apartment: z
      .string({
        required_error: t("Apartment number is required"),
      })
      .min(1, t("Apartment number is required")),
    floor: z
      .string({
        required_error: t("Floor number is required"),
      })
      .min(1, t("Floor number is required")),
    street: z
      .string({
        required_error: t("Street name/number is required"),
      })
      .min(1, t("Street name/number is required")),
    block: z
      .string({
        required_error: t("Block number is required"),
      })
      .min(1, t("Block number is required")),
    avenue: z.string().optional(), // Avenue is optional
    additionalDirections: z
      .string({
        required_error: t("Additional directions are required"),
      })
      .min(1, t("Additional directions are required")),
  }),
});

export const propertyvalidation = {
  propertyInitalScema,
  proeprtyAddresschema,
};
