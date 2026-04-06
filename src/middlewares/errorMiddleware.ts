import { Request, Response, NextFunction } from "express";
import { response } from "../utils/response";
import { ApiError } from "../utils/apiError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return response.serverError(res, null, "Internal server error");
};
