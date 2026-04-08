import { z } from "zod";

export const sizeSchema = z.object({
  size: z.string().min(1, "Size is required"),
  quantity: z
    .number("Quantity must be a number")
    .int("Quantity must be integer")
    .min(0, "Quantity cannot be negative"),
});

export const imageSchema = z.object({
  imageUrl: z.string().url("Image must be a valid URL"),
  isPrimary: z.boolean().optional(),
});

export const variantSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),

  colorCode: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color hex"),

  sku: z.string().min(1, "SKU is required"),

  sizes: z.array(sizeSchema).min(1, "Variant must have at least one size"),

  images: z.array(imageSchema).optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().optional(),

  price: z.number("Price must be a number").positive("Price must be positive"),

  discount: z.number("Discount must be a number").min(0).max(100).optional(),

  categoryId: z
    .number("Category ID must be a number")
    .int()
    .positive("Category ID must be positive"),

  variants: z
    .array(variantSchema)
    .min(1, "Product must have at least one variant"),
});
