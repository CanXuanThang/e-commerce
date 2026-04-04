import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  size: z.string().min(1, "Size is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
});
