import z from "zod";

export const checkIdSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

export const paginationSchema = z.object({
  pageNumber: z.coerce
    .number()
    .int()
    .positive("pageNumber must be a positive integer")
    .default(1),
  pageSize: z.coerce
    .number()
    .int()
    .positive("pageSize must be a positive integer")
    .default(10),
});
