import z from "zod";

export const orderItemSchema = z.object({
  productVariantId: z.number(),
  productSizeId: z.number(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const createOrderSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  orderItems: z
    .array(orderItemSchema)
    .min(1, "Order must have at least one item"),
});
