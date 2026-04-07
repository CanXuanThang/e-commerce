import z from "zod";

export const bannerSchema = z.object({
  order: z.number("Order is numberic"),
});
