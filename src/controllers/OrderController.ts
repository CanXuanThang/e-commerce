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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pageNumber = Number(req.query.pageNumber as string);
    const pageSize = Number(req.query.pageSize as string);

    const orders = await orderService.getAllOrders(pageNumber, pageSize);
    return response.ok(res, orders, "Get all orders successfully");
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    await orderService.deleteOrder(id);
    return response.ok(res, null, "Order deleted successfully !");
  } catch (error) {
    next(error);
  }
};

const updateStatusOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    const status = req.body.status;
    await orderService.updateStattusOrder(id, status);
    return response.ok(res, null, "Order updated successfully");
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  getOrdersByUserId,
  createOrder,
  getAllOrders,
  deleteOrder,
  updateStatusOrder,
};
