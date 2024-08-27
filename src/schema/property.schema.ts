import { z } from "zod";

const propertyInitalScema = z.object({
  host: z
    .string({ required_error: "Landlord name is required" })
    .min(1, "Landlord name is required"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  propertyName: z
    .string({ required_error: "Property name is required" })
    .min(1, "Property name is required"),
  squareFeet: z
    .string({ required_error: "Square feet is required" })
    .min(1, "Square feet is required"),
  bedrooms: z
    .string({ required_error: "Bedrooms  is required" })
    .min(1, { message: "Bedrooms is required" })
    .regex(/^[0-9]+$/, { message: "Bedrooms is required" }),
  bathrooms: z
    .string({ required_error: "Bathrooms  is required" })
    .min(1, { message: "Bathrooms is required" })
    .regex(/^[0-9]+$/, { message: "Bathrooms is required" }),
  residenceType: z.enum(["Condominium", "Private"], {
    required_error: "Residence type is required",
  }),
  rentType: z.enum(["Short Term", "Long Term"], {
    required_error: "Rent type is required",
  }),
  paymentType: z.enum(["Per Night", "Per Month"], {
    required_error: "Payment type is required",
  }),
  deposit: z
    .string({ required_error: "deposit amount is required" })
    .min(1, { message: "Deposit amount is required" })
    .regex(/^[0-9]+$/, { message: "Deposit amount must be numeric" }),
  rent: z
    .string({ required_error: "Rental price is required" })
    .min(1, { message: "Rental price is required" })
    .regex(/^[0-9]+$/, { message: "Rental price is required" }),
});

const proeprtyAddresschema = z.object({
  propertyAbout: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
  address: z.object({
    governorate: z
      .string({
        required_error: "Governorate is required",
      })
      .min(1, "Governorate is required"),
    area: z
      .string({
        required_error: "Area is required",
      })
      .min(1, "Area is required"),
    // building: z
    //   .string({
    //     required_error: "Building number is required",
    //   })
    //   .min(1, "Building number is required"),
    house: z
      .string({
        required_error: "House no is required",
      })
      .min(1, "House no is required"),
    apartment: z
      .string({
        required_error: "Apartment number is required",
      })
      .min(1, "Apartment number is required"),
    floor: z
      .string({
        required_error: "Floor number is required",
      })
      .min(1, "Floor number is required"),
    street: z
      .string({
        required_error: "Street name/number is required",
      })
      .min(1, "Street name/number is required"),
    block: z
      .string({
        required_error: "Block number is required",
      })
      .min(1, "Block number is required"),
    avenue: z.string().optional(), // Avenue is optional
    additionalDirections: z
      .string({
        required_error: "Additional directions are required",
      })
      .min(1, "Additional directions are required"),
  }),
});

export const propertyvalidation = {
  propertyInitalScema,
  proeprtyAddresschema,
};
