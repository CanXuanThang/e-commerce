import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  parentId: z
    .number()
    .int()
    .positive("Parent ID must be a positive integer")
    .optional(),
});
