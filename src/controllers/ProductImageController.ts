import { NextFunction, Request, Response } from "express";
import { productImageService } from "../services/ProductImageService";
import { response } from "../utils/response";

const getImagesByVariantId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productImageService.getImagesByVariantId(
      parseInt(req.params.variantId as string),
    );
    return response.ok(res, products, "Get all products successfully");
  } catch (error) {
    next(error);
  }
};

const createProductImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.files) {
      throw new Error("Images required");
    }

    const files = req.files as Express.Multer.File[];

    const data = files.map((file) => ({
      variantId: req.body.variantId,
      imageUrl: file.path,
    }));

    const productImages = await productImageService.createMany(data);

    return response.ok(res, productImages, "Images uploaded successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProductImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    await productImageService.deleteProductImage(id);
    return response.ok(res, null, "Image deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const productImageController = {
  getImagesByVariantId,
  createProductImages,
  deleteProductImage,
};
