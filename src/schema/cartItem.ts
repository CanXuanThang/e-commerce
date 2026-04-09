import z from "zod";

export const cartItemSchema = z.object({
  productId: z.number().int().positive("Product ID must be a positive integer"),
  quantity: z
    .number()
    .int()
    .min(1, "Quantyti than more 1")
    .positive("Quantity must be a positive integer"),
  variantId: z.number().int().positive("VariantId must be a positive integer"),
  sizeId: z.number().int().positive("SizeId must be a positive integer"),
  price: z
    .number()
    .int()
    .min(1, "Price isn't correct")
    .positive("Price must be a positive integer"),
});
