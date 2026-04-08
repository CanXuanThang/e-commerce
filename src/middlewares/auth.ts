import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/response";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.unauthorization(res);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return response.unauthorization(res);
  }
};

export const checkRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      return response.forbidden(res);
    }

    next();
  };
