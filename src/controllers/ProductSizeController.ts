import { NextFunction, Request, Response } from "express";
import {
  CreateSize,
  productSizeService,
  SizeInput,
} from "../services/ProductSizeService";
import { response } from "../utils/response";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateSize[] = req.body;
    await productSizeService.createProductSize(data);

    return response.ok(res, null, "Create size success");
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { price, quantity, size }: SizeInput = req.body;
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Id product is required");
    }

    await productSizeService.updateProductSize(id, { price, quantity, size });

    return response.ok(res, null, "Update successfuly !");
  } catch (err) {
    next(err);
  }
};

const deleteSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return response.badRequest(res, null, "Id product is required");
    }

    await productSizeService.deleteSize(id);

    return response.ok(res, null, "Delete successfuly !");
  } catch (err) {
    next(err);
  }
};

export const productSizeController = { create, update, deleteSize };
