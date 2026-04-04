import z from "zod";

export const checkIdSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});
