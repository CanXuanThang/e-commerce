import { z } from "zod";

export const sizeSchema = z.object({
  size: z.string().min(1, "Size is required"),
  quantity: z
    .number("Quantity must be a number")
    .int("Quantity must be integer")
    .min(0, "Quantity cannot be negative"),
  price: z.number("Price must be a number").min(0, "Price is required"),
});

export const imageSchema = z.object({
  imageUrl: z.string().url("Image must be a valid URL"),
  isPrimary: z.boolean().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().optional(),

  discount: z.number("Discount must be a number").min(0).max(100).optional(),

  categoryId: z
    .number("Category ID must be a number")
    .int()
    .positive("Category ID must be positive"),
});

export const imageMetadataSchema = z.object({
  fileIndex: z.number("fileIndex is required"),

  sortOrder: z.number().optional(),

  isPrimary: z.boolean().optional(),
});

export const variantSchema = z.object({
  colorName: z.string().min(1, "colorName is required"),

  colorCode: z.string().min(1, "colorCode is required"),

  sku: z.string().min(1, "sku is required"),

  isDefault: z.boolean().optional(),

  images: z.array(imageMetadataSchema).optional(),

  sizes: z.array(sizeSchema).min(1, "Variant must have at least one size"),
});

// schemas/product.schema.ts

export const createProductDetailsBodySchema = z.object({
  variants: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    },
    z.array(variantSchema).min(1, "variants must have at least one item"),
  ),
});
