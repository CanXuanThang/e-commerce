import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { CreateOrderPayload, orderService } from "../services/OrderService";

const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return response.badRequest(res, null, "Invalid user ID");
    }
    const orders = await orderService.getOrdersByUserId(userId);
    return response.ok(res, orders, "Get orders successfully");
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { address, phone, orderItems }: CreateOrderPayload = req.body;
    if (!userId) {
      return response.badRequest(res, null, "Invalid user ID");
    }
    const orderPayload: CreateOrderPayload = {
      userId,
      address,
      phone,
      orderItems,
    };
    await orderService.createOrder(orderPayload);
    return response.ok(res, null, "Order created successfully");
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await orderService.getAllOrders();
    return response.ok(res, orders, "Get all orders successfully");
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  getOrdersByUserId,
  createOrder,
  getAllOrders,
};
