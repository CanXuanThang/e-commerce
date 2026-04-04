import z from "zod";

export const createReviewSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  productId: z.number().int().positive("Product ID must be a positive integer"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string().optional(),
});

export const getReviewsByProductIdSchema = z.object({
  productId: z.number().int().positive("Product ID must be a positive integer"),
});
