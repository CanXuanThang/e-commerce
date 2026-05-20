import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        const parsedParams = schema.params.parse(req.params);
        Object.assign(req.params, parsedParams);
      }

      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);
        Object.assign(req.query, parsedQuery);
      }

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
