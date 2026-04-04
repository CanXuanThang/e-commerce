import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);

      if (schema.params) req.params = schema.params.parse(req.params) as any; // 👈 FIX

      if (schema.query) req.query = schema.query.parse(req.query) as any; // 👈 FIX

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }

      next(error);
    }
  };
