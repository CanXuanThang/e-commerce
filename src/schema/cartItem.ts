import z from "zod";

export const cartItemSchema = z.object({
  cartId: z.number().int().positive("Cart ID must be a positive integer"),
  productId: z.number().int().positive("Product ID must be a positive integer"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});
