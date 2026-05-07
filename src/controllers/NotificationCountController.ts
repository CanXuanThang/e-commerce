import { NextFunction, Request, Response } from "express";
import { notificationCount } from "../services/NotificationCount";
import { response } from "../utils/response";

const resetCount = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const notiCount = await notificationCount.resetCount();

    return response.ok(res, { count: notiCount?.count }, "Success!");
  } catch (error) {
    next(error);
  }
};

const getCount = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await notificationCount.getCount();

    return response.ok(res, { count: count }, "Success!");
  } catch (error) {
    next(error);
  }
};

export const notiController = { getCount, resetCount };
